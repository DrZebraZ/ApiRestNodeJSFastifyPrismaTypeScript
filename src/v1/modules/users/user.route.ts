import { FastifyInstance } from "fastify"
import { RequireAdmin } from "../../../main";
import { changePasswordHandler, getAllUsersHandler, loginUserHandler, registerProfessorHandler, registerUserHandler } from "./user.controllers" 
import { $ref } from "./user.schema";

async function userRoutesV1(server: FastifyInstance){

  server.post('/create',{schema:{body:$ref('createStudentSchema')}}, registerUserHandler);
  server.get('/getAll', {preHandler:[server.RequireAuth]}, getAllUsersHandler);
  server.post('/login', {schema:{body:$ref('createUserLoginSchema')}},loginUserHandler);
  server.put('/changePassword', {preHandler:[server.RequireAuth],schema:{body:$ref('createChangePasswordSchema')}}, changePasswordHandler);
  server.post('/createProfessor', {schema: {body:$ref('createProfessorSchema')}}, registerProfessorHandler);
}
export default userRoutesV1