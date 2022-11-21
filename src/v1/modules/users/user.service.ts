import { hashPassword, verifyPassword } from '../../../utils/hash';
import prisma from "../../../utils/prisma"
import { generateUserID, generateToken } from "../../../utils/generate"
import { CreateUserInput, CreateUserLoginInput} from "./user.schema"
import { server } from '../../../main';
import { ChangePasswordInput } from '../users/user.schema';
import jwtDecode from 'jwt-decode';


export async function createUser(input: CreateUserInput):Promise<any>{
  const { password, classId, ...rest} = input;
  const {hash, salt} = hashPassword(password)
  const id = generateUserID()
  const token = generateToken()
  try{
    await prisma.class.findFirstOrThrow({where:{id:{equals:classId}}})
  }catch(e){
    console.log("failed to find class with the given id: " + classId)
    return (e + "failed to find class")
  }
  try{
    const user:any = await prisma.user.create({
      data : {
        ...rest,
        id,
        classId,
        salt,
        password: hash,
        token            
      }
    })
    return (true)
  }catch(e){
    return (e)
  }
}

export async function getAllUsers():Promise<any>{
  return await prisma.user.findMany({
    orderBy:{
      name: "asc"
    },
    select:{
      name: true,
      personalDescription: true,
      classId: true,
      datenasc: true
    }
  })
}

export async function userLogin(input: CreateUserLoginInput):Promise<any>{
  console.log(input)
  const { email, password } = input;
  try{
    const user = await prisma.user.findFirst({
      where:{
        email : email,
      }
    })
    if (user){
      const correctPassword = verifyPassword({candidatePassword: password, salt: user.salt, hash: user.password})
      if (correctPassword){
        const { password, salt, ...rest} = user
        return { token: server.jwt.sign(rest) }
      }else{
        console.log("Invalid Password")
        return (false)
      }
    }else{
      return (false)
    }
  }catch(e){
    return (e)
  }
}

export async function changePassword(input: ChangePasswordInput, header:any):Promise<any>{
  const authorized: any = await jwtDecode(header)
  const token = authorized.token.toString()
  const { password, newPassword } = input;
  const oldPass = password
  const newPass = newPassword
  try{
    const person = await prisma.user.findFirstOrThrow({
      where: {
        token : token 
      }
    })
    console.log(person.name)
    const verify = verifyPassword({candidatePassword: oldPass, salt: person.salt, hash: person.password})
    if (verify === true){
      const {hash, salt} = hashPassword(newPass)
      const newPassword = hash
      const newSalt = salt
      await prisma.user.update({
        data:{
          password: newPassword,
          salt: newSalt,
        }, where:{
          token: token
        }
      })
      return true
    }else return false
  }catch(e){
    return e
  }
}
