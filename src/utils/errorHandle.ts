import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';


export default function errorHandler(e: any, message: string, reply:FastifyReply):FastifyReply{
  console.log("ERROR HANDLER")
  console.log(e)
  var statusCode = 500
  var errorMessage =  "Internal Server Error"
  var code: string
  var other: any
  if (typeof e === "string"){
    errorMessage = "JSON Error"
    statusCode = 400
    other = e
  }
  else if (e instanceof Prisma.PrismaClientKnownRequestError){
    console.log("error 01")
    statusCode = 401
    errorMessage = message
    other = e.meta
    code = e.code.toString()
    if (e.code === 'P2002'){
      console.log("error 02")
      code = '401'
      other = 'This value is already in use on field(s): ' + e.meta.target.toString()
    }
  }
  else if (e instanceof Prisma.PrismaClientValidationError){
    statusCode = 404
    errorMessage = message
    code = 404
    other = e.message
  }
  return reply.
    code(statusCode).
    send({
      "error": errorMessage,
      "code": code,
      "info": other
    })
}