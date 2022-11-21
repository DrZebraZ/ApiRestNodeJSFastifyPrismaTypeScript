import { FastifyReply } from 'fastify';
import errorHandler from './errorHandle';


export default function replyHandler(input: any, texto: string, code:number, reply: FastifyReply){
  console.log("Reply Handler")
  if (input === true){
    console.log("Success: "+ texto );
    return reply.code(code).send({ message: "Success: "+texto})
  } else if( input === false){
    return reply.code(400).send({ message: "Failed: "+ texto})
  } else errorHandler(input, "error: "+ texto, reply)
}