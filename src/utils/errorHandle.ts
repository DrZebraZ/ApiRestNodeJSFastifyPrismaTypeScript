import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';


export default function errorHandler(e: any, message: string, reply:FastifyReply):FastifyReply{
  console.log("ERROR HANDLER")
  console.log(e)
  var statusCode = 500
  var errorMessage =  "Internal Server Error"
  var code:string = "error 01"
  var other: any | unknown | null
  if (typeof e === "string"){
    errorMessage = "JSON Error"
    statusCode = 400
    other = e
  }
  else if (e instanceof Prisma.PrismaClientKnownRequestError){
    console.log("error 02")
    statusCode = 401
    errorMessage = message
    other = e.meta
    code = e.code.toString()
    if (e.code === 'P2002'){
      console.log("error 02-01")
      code = 'error 03'
      other = 'This value is already in use on field(s): ' + e.meta.target.toString()
    }
    else if (e.code === 'P2003'){
      console.log("error 02-02")
      code = 'error 02-02'
      other = {'Error on foreign key field: ': e.meta}
    }
  }
  else if (e instanceof Prisma.PrismaClientValidationError){
    statusCode = 404
    errorMessage = message
    code = "error 03"
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