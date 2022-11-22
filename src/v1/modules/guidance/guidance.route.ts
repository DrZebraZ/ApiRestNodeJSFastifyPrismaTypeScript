import { FastifyInstance } from "fastify"
import { createMessageHandler } from "./guidance.controllers"




async function guidanceRoutesV1(server: FastifyInstance){

  server.post('/sendMessage', {preHandler:[server.RequireAuth]}, createMessageHandler)

}

export default guidanceRoutesV1