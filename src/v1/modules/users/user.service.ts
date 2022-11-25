import { hashPassword, verifyPassword } from '../../../utils/hash';
import prisma from "../../../utils/prisma";
import { generateToken, generateProfessorID, generateStudentID } from '../../../utils/generate';
import { CreateProfessorInput, CreateStudentInput, CreateUserLoginInput} from "./user.schema";
import { server } from '../../../main';
import { ChangePasswordInput } from '../users/user.schema';
import jwtDecode from 'jwt-decode';


export async function createStudent(input: CreateStudentInput):Promise<any>{
  const { password, classId, email, cpf, name } = input;
  const {hash, salt} = hashPassword(password)
  const id = generateStudentID()
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
        email,
        cpf,
        password:hash,
        salt,
        Student:{
          create:{
            id,
            name,
            token,
            classId,
          }
        }  
      }
    })
    return (true)
  }catch(e){
    return (e)
  }
}

export async function getAllUsers():Promise<any>{
  const users = await prisma.user.findMany({
    orderBy:{
      email:"asc"
    }
  })
  return ({"data": users})
}

export async function createProfessor(input: CreateProfessorInput):Promise<any>{
  const { password, email, cpf, name } = input;
  const {hash, salt} = hashPassword(password)
  const id = generateProfessorID()
  const token = generateToken()
  try{
    const user:any = await prisma.user.create({
      data : {
        email,
        cpf,
        password:hash,
        salt,
        Professor:{
          create:{
            name,
            id,
            token,
          }
        }
      }
    })
    return (true)
  }catch(e){
    return (e)
  }
}

export async function userLogin(input: CreateUserLoginInput):Promise<any>{
  console.log(input.email)
  const { email, password } = input;
  try{
    const student = await prisma.student.findFirstOrThrow({
      where:{
        user:{
          email:email,
        }
      },
      select: {
        user:{
          select:{
            password:true,
            salt:true,
            email:true,
            cpf: true
          }
        },
        id: true,
        token: true,
      }
    })
    if (student){
      console.log(student)
      const correctPassword = verifyPassword({candidatePassword: password, salt: student.user.salt, hash: student.user.password})
      if (correctPassword){
        console.log(correctPassword)
        const tokenFormatter = {
          email: student.user.email,
          id: student.id,
          token: student.token,
          cpf: student.user.cpf,
        }
        return {token: server.jwt.sign(tokenFormatter)}
      }else{
        console.log("Invalid Password")
        return ({data:{ "error": "Invalid Password"}})
      }
    }
  }catch{
    try{
      const professor = await prisma.professor.findFirstOrThrow({
        where:{
          user:{
            email: email
          }
        },
        select: {
          user:{
            select:{
              password:true,
              salt:true,
              email:true,
              cpf: true
            }
          },
          id: true,
          token: true,
        }
      })
      if (professor){
        const correctPassword = verifyPassword({candidatePassword: password, salt: professor.user.salt, hash: professor.user.password})
        if (correctPassword){
          const tokenFormatter = {
            email: professor.user.email,
            id: professor.id,
            token: professor.token,
            cpf: professor.user.cpf,
          }
          return {token: server.jwt.sign(tokenFormatter)}
        }else{
          console.log("invalid password")
          return ({ data: {"error": "invalid password"}})
        }
      }
    }catch{
      return { data: {"error":"Email not found!"}}
    }
  }
}
/*export async function changePassword(input: ChangePasswordInput, header:any):Promise<any>{
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
}*/
