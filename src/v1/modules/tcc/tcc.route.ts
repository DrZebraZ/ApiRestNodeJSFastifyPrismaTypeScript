import { FastifyInstance } from "fastify"
import { createTccHandler } from "./tcc.controllers"
import { $ref } from "./tcc.schema"


async function tccRoutesV1(server: FastifyInstance){

  server.post('/create', { preHandler:[server.RequireAuth], schema:{body:$ref('createTccSchema')}}, createTccHandler)

}

export default tccRoutesV1