import { FastifyReply, FastifyRequest } from "fastify";
import errorHandler from "../../../utils/errorHandle";
import { ChangePasswordInput, CreateUserInput } from "./user.schema";
import { changePassword, createUser, getAllUsers, userLogin } from "./user.service";
import { CreateUserLoginInput } from '../users/user.schema';
import replyHandler from '../../../utils/replyHandler';

export async function registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply){

  console.log("Creating User...")

  const body = request.body
  const user = await createUser(body);

  return replyHandler(user, "Create User", 201, reply)

}


export async function getAllUsersHandler(request: FastifyRequest, reply: FastifyReply){
  const users = await getAllUsers();
  return replyHandler(users, "get Users", 200, reply)
  try{
    return getAllUsers();
  }catch(e: any){
    return (e)
  }

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