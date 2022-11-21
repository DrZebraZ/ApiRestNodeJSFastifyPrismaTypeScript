import { FastifyRequest, FastifyReply } from 'fastify';
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
    console.log("error at classAreaControllers registerClassAreaHandler " + e)
    return reply.code(500).send(e)
  }
}