import { FastifyInstance } from "fastify"
import { createTccHandler } from "./tcc.controllers"
import { $ref } from "./tcc.schema"


async function tccRoutesV1(server: FastifyInstance){

  server.post('/create', { preHandler:[server.RequireAuth]}, createTccHandler)

}

export default tccRoutesV1