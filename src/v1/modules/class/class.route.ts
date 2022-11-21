import { FastifyInstance} from "fastify";
import { getClassesHandler, getProfessorsByClassIdHandler, getUsersByClassIdHandler, registerClassHandler } from "./class.controllers";

async function classRoutesV1(server: FastifyInstance){

  server.post('/create', registerClassHandler);
  server.get('/getAllClasses', {preHandler:[server.RequireAuth]} ,getClassesHandler);
  server.get('/getUsers', getUsersByClassIdHandler);
  server.get('/getProfessors', getProfessorsByClassIdHandler);
  
}
export default classRoutesV1