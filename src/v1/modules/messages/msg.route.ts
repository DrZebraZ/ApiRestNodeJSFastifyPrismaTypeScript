import { FastifyInstance } from "fastify"
import { createMessageHandler, editMessageHandler } from "./msg.controllers"
import { $ref } from "./msg.schema"



async function messagesRoutesV1(server: FastifyInstance){

  server.post('/sendMessage', { preHandler:[server.RequireAuth], schema:{body:$ref('createMessageSchema')}}, createMessageHandler)
  server.put('/editMessage', { preHandler:[server.RequireAuth], schema:{body:$ref('editMessageSchema')}}, editMessageHandler)
  

}

export default messagesRoutesV1