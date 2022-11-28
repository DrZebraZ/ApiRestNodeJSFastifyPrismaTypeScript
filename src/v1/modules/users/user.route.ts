import { FastifyInstance } from "fastify"
import { changePasswordHandler, getAllUsersHandler, loginUserHandler, registerTeacherHandler, registerUserHandler } from "./user.controllers" 
import { $ref } from "./user.schema";

async function userRoutesV1(server: FastifyInstance){

  server.post('/create',{schema:{body:$ref('createStudentSchema')}}, registerUserHandler);
  server.get('/getAll', {preHandler:[server.RequireAuth]}, getAllUsersHandler);
  server.post('/login', {schema:{body:$ref('createUserLoginSchema')}},loginUserHandler);
  server.put('/changePassword', {preHandler:[server.RequireAuth],schema:{body:$ref('createChangePasswordSchema')}}, changePasswordHandler);
  server.post('/createTeacher', {schema: {body:$ref('createTeacherSchema')}}, registerTeacherHandler);
}
export default userRoutesV1