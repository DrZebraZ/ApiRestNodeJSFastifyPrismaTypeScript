import { FastifyRequest, FastifyReply } from 'fastify';
import replyHandler from '../../../utils/replyHandler';
import { CreateClassAreaInput } from './classArea.schema';
import { createClassArea } from './classArea.service';

export async function registerClassAreaHandler(
  request: FastifyRequest<{Body: CreateClassAreaInput}>,
  reply: FastifyReply
){
  const body = request.body
  try{
    const classArea = await createClassArea(body);
    console.log("Class Area Created")
    return reply.code(201).send(classArea);
  }catch(e){
    return replyHandler({"data":{"error": "Admin Only!"}}, "creating class area", 500, reply)
  }
}