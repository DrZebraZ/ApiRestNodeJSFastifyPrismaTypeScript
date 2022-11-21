import { FastifyReply, FastifyRequest } from "fastify";
import errorHandler from "../../../utils/errorHandle";
import { ChangePasswordInput, CreateUserInput } from "./user.schema";
import { changePassword, createUser, getAllUsers, userLogin } from "./user.service";
import { CreateUserLoginInput } from '../users/user.schema';
import replyHandler from '../../../utils/replyHandler';

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>, 
  reply: FastifyReply
  ){
  console.log("Creating User...")
  const body = request.body
  const user = await createUser(body);
  return replyHandler(user, "Create User", 201, reply)
}

export async function getAllUsersHandler(){
  try{
    return getAllUsers();
  }catch(e: any){
    return (e)
  }
}

export async function loginUserHandler(
  request: FastifyRequest<{Body: CreateUserLoginInput}>,
  reply: FastifyReply
){
  const body = request.body
  
  try{
    console.log("Requesting Login...")
    const user = await userLogin(body);
    if (user){
      console.log("User Logged successfully")
      return reply.code(200).send(user)
    }else if(user === false){
      console.log("Login Failed")
      return reply.code(401).send({ message: "Invalid email or password... Try again!"})
    }else{
      console.log("Unexpected Login Failure")
      return errorHandler(user, "error on login", reply)
    }
  }catch(e){
    console.log("failed to login (final catch)")
    return reply.code(500).send({ message: "Internal Server Error"})
  }
}

export async function changePasswordHandler(
  request: FastifyRequest<{Body: ChangePasswordInput}>,
  reply: FastifyReply
){
  console.log('Changing Password')
  const body = request.body
  const headers = request.headers.authorization
  try{
    const changed = await changePassword(body, headers)
    if (changed === true){
      return reply.code(201).send({ message: "Password Changed" } )
    }else if(changed === false){
      return reply.code(400).send({ message: "Wrong Password"} )
    }
    else return errorHandler(changed, "error changing password", reply)
  }catch(e){
    return reply.code(500).send({ message: "Internal Server Error"})
  }
}