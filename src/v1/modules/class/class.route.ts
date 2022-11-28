import { FastifyInstance} from "fastify";
import { getClassesHandler, getProfessorsByClassIdHandler, getUsersByClassIdHandler, registerClassHandler } from "./class.controllers";
import { $ref } from "./class.schema";

async function classRoutesV1(server: FastifyInstance){

  server.get('/getAllClasses' ,getClassesHandler);

  server.post('/create', {preHandler:[server.RequireAdmin], schema:{body:$ref('createClassSchema')}}, registerClassHandler);
  server.get('/getUsers', {preHandler:[server.RequireAdmin], schema:{querystring:$ref('getClassUsersSchema')}}, getUsersByClassIdHandler);
  server.get('/getTeachers', {preHandler:[server.RequireAdmin],schema:{querystring:$ref('getClassTeacherSchema')} } ,getProfessorsByClassIdHandler);
  
}
export default classRoutesV1