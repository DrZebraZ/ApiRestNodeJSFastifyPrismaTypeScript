import { FastifyReply } from 'fastify';
import errorHandler from './errorHandle';


export default function replyHandler(input: any, texto: string, code:number, reply: FastifyReply, other?:any){
  console.log("Reply Handler")
  console.log(input)
  if (input === true){

    console.log("Success: "+ texto );
    
    return reply.code(code).send({ message: "Success: "+texto})

  } else if( input === false){

    return reply.code(400).send({ message: "Failed: "+ texto})

  } else if( "token" in input ){

    return reply.code(200).send(input)

  }else if( "data" in input){

    return reply.code(200).send({ message: input["data"]})

  }else{
    errorHandler(input, "error: "+ texto, reply)
  }
}