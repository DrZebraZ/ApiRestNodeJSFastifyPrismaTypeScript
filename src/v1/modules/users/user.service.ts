import { hashPassword, verifyPassword } from '../../../utils/hash';
import prisma from "../../../utils/prisma";
import { generateToken, generateStudentID, generateTeacherID } from '../../../utils/generate';
import { CreateTeacherInput, CreateStudentInput, CreateUserLoginInput} from "./user.schema";
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
        student:{
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

export async function createTeacher(input: CreateTeacherInput):Promise<any>{
  const { password, email, cpf, name } = input;
  const {hash, salt} = hashPassword(password)
  const id = generateTeacherID()
  const token = generateToken()
  try{
    const user:any = await prisma.user.create({
      data : {
        email,
        cpf,
        password:hash,
        salt,
        teacher:{
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

export async function getAllUsers():Promise<any>{
  const users = await prisma.user.findMany({
    orderBy:{
      email:"asc"
    },
    select:{
      email: true,
      student:{
        select:{
          id: true,
          name: true,
        }
      },
      teacher:{
        select:{
          id: true,
          name: true,
        }
      }
    }
  })
  return ({"data": users})
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
      const correctPassword = verifyPassword({candidatePassword: password, salt: student.user.salt, hash: student.user.password})
      if (correctPassword){
        const tokenFormatter = {
          email: student.user.email,
          id: student.id,
          token: student.token,
          cpf: student.user.cpf,
        }
        console.log("Student logged in successfully!")
        return {token: server.jwt.sign(tokenFormatter)}
      }else{
        console.log("Invalid Password")
        return ({data:{ "error": "Invalid Password"}})
      }
    }
  }catch{
    try{
      const teacher = await prisma.teacher.findFirstOrThrow({
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
      if (teacher){
        const correctPassword = verifyPassword({candidatePassword: password, salt: teacher.user.salt, hash: teacher.user.password})
        if (correctPassword){
          const tokenFormatter = {
            email: teacher.user.email,
            id: teacher.id,
            token: teacher.token,
            cpf: teacher.user.cpf,
          }
          console.log("Teacher logged in successfully!")
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

export async function changePassword(input: ChangePasswordInput, header:any):Promise<any>{
  const authorized: any = await jwtDecode(header)
  const email = authorized.email.toString()
  const { password, newPassword } = input;
  const oldPass = password
  const newPass = newPassword
  try{
    const person = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      }
    })
    console.log(person.email)
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
          email: person.email
        }
      })
      return true
    }else return false
  }catch(e){
    return e
  }
}

