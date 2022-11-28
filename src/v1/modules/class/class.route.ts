import { FastifyInstance} from "fastify";
import { RequireAdmin } from "../../../main";
import { getClassesHandler, getProfessorsByClassIdHandler, getUsersByClassIdHandler, registerClassHandler } from "./class.controllers";

async function classRoutesV1(server: FastifyInstance){

  server.post('/create', {preHandler:RequireAdmin}, registerClassHandler);
  server.get('/getAllClasses' ,getClassesHandler);
  server.get('/getUsers', getUsersByClassIdHandler);
  server.get('/getProfessors', getProfessorsByClassIdHandler);
  
}
export default classRoutesV1