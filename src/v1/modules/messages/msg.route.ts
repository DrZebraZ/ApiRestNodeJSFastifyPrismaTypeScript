import { FastifyInstance } from "fastify"
import { createMessageHandler, editMessageHandler, getMessagesHandler } from "./msg.controllers"
import { $ref } from "./msg.schema"
import { generateMessageID } from '../../../utils/generate';



async function messagesRoutesV1(server: FastifyInstance){

  server.post('/sendMessage', { preHandler:[server.RequireAuth], schema:{body:$ref('createMessageSchema')}}, createMessageHandler)
  server.put('/editMessage', { preHandler:[server.RequireAuth], schema:{body:$ref('editMessageSchema')}}, editMessageHandler)
  server.get('/getMessages', { preHandler:[server.RequireAuth], schema:{querystring:$ref('createGuidanceCoreSchema')}}, getMessagesHandler)

}

export default messagesRoutesV1