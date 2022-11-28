import { FastifyInstance } from "fastify";
import { addTeacherToClassHandler, getAllTeachersHandler } from "./teacher.controllers";
import { $ref } from "./teacher.schema";


async function teacherRoutesV1(server: FastifyInstance){

  server.post('/addTeacherToClass', {preHandler:[server.RequireAdmin], schema:{body:$ref('addTeacherToClassSchema')}}, addTeacherToClassHandler);
  server.get('/getAllTeachers', {preHandler:[server.RequireAdmin]}, getAllTeachersHandler);
}
export default teacherRoutesV1