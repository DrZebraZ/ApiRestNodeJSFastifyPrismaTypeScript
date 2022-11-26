import { FastifyReply } from 'fastify';
import errorHandler from './errorHandle';


export default function replyHandler(input: any, texto: string, code:number, reply: FastifyReply, other?:any){
  console.log("Reply Handler")
  if (input === true){

    console.log("Success: "+ texto );
    
    return reply.code(code).send({ message: "Success: "+texto})

  } else if( input === false){

    return reply.code(400).send({ message: "Failed: "+ texto})

  } else if( "token" in input ){

    return reply.code(200).send(input)

  }else if( "data" in input && "error" in input["data"]){
    
    return reply.code(400).send({ data: input["data"]})
  
  }else if( "data" in input){

    return reply.code(200).send({ data: input["data"]})

  }else{
    errorHandler(input, "error: "+ texto, reply)
  }
}