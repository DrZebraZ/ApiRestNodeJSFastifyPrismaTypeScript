import { FastifyRequest, FastifyReply } from 'fastify';
import replyHandler from '../../../utils/replyHandler';
import { CreateTccInput } from './tcc.schema';
import { createTCC } from './tcc.service';

export async function createTccHandler(request: FastifyRequest<{Body: CreateTccInput}>,reply: FastifyReply){
  console.log("Creating TCC")

  const headers = request.headers.authorization
  const body = request.body

  const tcc = await createTCC(body, headers)

  return replyHandler(tcc, "create TCC", 201, reply)
  
} 