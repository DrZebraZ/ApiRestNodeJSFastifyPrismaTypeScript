import { FastifyInstance } from "fastify"
import { createMessageHandler } from "./orientation.controllers"




async function orientationRoutesV1(server: FastifyInstance){

  server.post('/sendMessage', {preHandler:[server.RequireAuth]}, createMessageHandler)

}

export default orientationRoutesV1