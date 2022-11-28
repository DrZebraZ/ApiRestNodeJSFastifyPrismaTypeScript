import { FastifyRequest, FastifyReply } from 'fastify';
import replyHandler from '../../../utils/replyHandler';
import { AssignTeacherToTCCAndGuidanceInput, CreateTccInput, UpdateTccInput } from './tcc.schema';
import { assignTeacherToTccAndGuidance, createTCC, updateTCC } from './tcc.service';

export async function createTccHandler(request: FastifyRequest<{Body: CreateTccInput}>,reply: FastifyReply){
  console.log("Creating TCC")

  const headers = request.headers.authorization
  const body = request.body

  const tcc = await createTCC(body, headers)

  return replyHandler(tcc, "create TCC", 201, reply)
  
} 

export async function updateTccHandler(request: FastifyRequest<{Body: UpdateTccInput}>, reply: FastifyReply){
  console.log("Updating TCC")

  const headers = request.headers.authorization
  const body = request.body

  const tcc = await updateTCC(body, headers)

  return replyHandler(tcc, "Updating TCC", 201, reply)
}



//ADMIN USAGE
export async function assignTeacherToTccAndGuidanceHandler(request: FastifyRequest<{Body: AssignTeacherToTCCAndGuidanceInput}>, reply: FastifyReply){
  console.log("Assigning Teacher to TCC and Guidance")
  const headers = request.headers.authorization
  const body = request.body
  const tcc = await assignTeacherToTccAndGuidance(body)
  return replyHandler(tcc, "assigning Teacher", 201, reply)
}