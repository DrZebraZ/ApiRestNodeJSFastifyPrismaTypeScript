import { FastifyInstance } from "fastify"
import { assignTeacherToTccAndGuidanceHandler, createTccHandler, updateTccHandler } from "./tcc.controllers"
import { $ref } from "./tcc.schema"


async function tccRoutesV1(server: FastifyInstance){

  server.post('/create', { preHandler:[server.RequireAuth], schema:{body:$ref('createTccSchema')}}, createTccHandler)
  server.put('/update', { preHandler:[server.RequireAuth], schema:{body:$ref('updateTccSchema')}}, updateTccHandler)
  server.put('/assignTeacherToTccAndGuidance', {preHandler:[server.RequireAdmin], schema:{body:$ref('assignTeacherToTCCAndGuidanceSchema')}}, assignTeacherToTccAndGuidanceHandler)
}

export default tccRoutesV1