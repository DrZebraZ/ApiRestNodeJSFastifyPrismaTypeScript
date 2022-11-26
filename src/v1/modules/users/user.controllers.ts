import { FastifyReply, FastifyRequest } from "fastify";
import { ChangePasswordInput, CreateProfessorInput, CreateStudentInput } from "./user.schema";
import { changePassword, createProfessor, createStudent, getAllUsers, userLogin } from "./user.service";
import { CreateUserLoginInput } from '../users/user.schema';
import replyHandler from '../../../utils/replyHandler';
import { RequireAdmin } from "../../../main";

export async function registerUserHandler(request: FastifyRequest<{ Body: CreateStudentInput }>, reply: FastifyReply){

  console.log("Creating User...")

  const body = request.body
  const user = await createStudent(body);

  return replyHandler(user, "Create User", 201, reply)

}

export async function registerProfessorHandler(request: FastifyRequest<{ Body: CreateProfessorInput}>,reply:FastifyReply){

  try{
    RequireAdmin
    console.log("Creating Professor...")
    const body = request.body
    const professor = await createProfessor(body);
    return replyHandler(professor, "Create Professor", 201, reply)
  }catch(e){
    return replyHandler(e, "Create Professor", 500, reply)
  }
  

}



export async function getAllUsersHandler(request: FastifyRequest, reply: FastifyReply){
  const users = await getAllUsers();
  return replyHandler(users, "get Users", 200, reply)

}





export async function loginUserHandler(request: FastifyRequest<{Body: CreateUserLoginInput}>,reply: FastifyReply){
  const body = request.body
  console.log("Requesting Login...")
  const token = await userLogin(body);
  return replyHandler(token, "login", 200, reply)
}

export async function changePasswordHandler(request: FastifyRequest<{Body: ChangePasswordInput}>,reply: FastifyReply){
  console.log('Changing Password')
  const body = request.body
  const headers = request.headers.authorization
  const changed = await changePassword(body, headers)
  return replyHandler(changed, "change Password", 201, reply)
}