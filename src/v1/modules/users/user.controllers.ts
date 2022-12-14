import { FastifyReply, FastifyRequest } from "fastify";
import { ChangePasswordInput, CreateTeacherInput, CreateStudentInput } from "./user.schema";
import { changePassword, createTeacher, createStudent, getAllUsers, userLogin, editPerfil } from "./user.service";
import { CreateUserLoginInput, EditUserInput } from '../users/user.schema';
import replyHandler from '../../../utils/replyHandler';

export async function registerUserHandler(request: FastifyRequest<{ Body: CreateStudentInput }>, reply: FastifyReply){
  console.log("Creating User...")

  const body = request.body
  const user = await createStudent(body);

  return replyHandler(user, "Create User", 201, reply)
}

export async function loginUserHandler(request: FastifyRequest<{Body: CreateUserLoginInput}>,reply: FastifyReply){
  console.log("Requesting Login...")
  const body = request.body
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

export async function editPerfilHandler(request: FastifyRequest<{Body: EditUserInput}>, reply: FastifyReply){
  console.log("Editing User Profile...")
  const headers = request.headers.authorization
  const body = request.body
  const retorno = await editPerfil(body, headers)
  return replyHandler(retorno, "Editing User Profile", 201, reply)
}

/* ADMIN ONLY */
export async function registerTeacherHandler(request: FastifyRequest<{ Body: CreateTeacherInput}>,reply:FastifyReply){
  try{
    console.log("Creating Professor...")
    const body = request.body
    const professor = await createTeacher(body);
    return replyHandler(professor, "Create Teacher", 201, reply)
  }catch(e){
    return replyHandler(e, "Create Teacher", 500, reply)
  }
}

export async function getAllUsersHandler(request: FastifyRequest, reply: FastifyReply){
  const users = await getAllUsers();
  return replyHandler(users, "get Users", 200, reply)
}