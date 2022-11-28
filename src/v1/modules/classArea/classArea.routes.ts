import { FastifyInstance} from "fastify";
import { registerClassAreaHandler } from "./classArea.controllers";
import { $ref } from "./classArea.schema";


async function classAreaRoutesV1(server: FastifyInstance){

  server.post('/create', {preHandler:[server.RequireAdmin] ,schema:{body:$ref('createClassAreaSchema')}}, registerClassAreaHandler);

}
export default classAreaRoutesV1