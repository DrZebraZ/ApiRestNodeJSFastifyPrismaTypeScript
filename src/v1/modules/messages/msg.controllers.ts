import { FastifyRequest, FastifyReply } from 'fastify';
import replyHandler from '../../../utils/replyHandler';
import { CreateMessageInput, EditMessageSchema } from './msg.schema';
import { createMessage, editMessage } from './msg.service';


export async function createMessageHandler(request: FastifyRequest<{Body:CreateMessageInput}>, reply: FastifyReply){
  console.log('Sending Message...')
  const body = request.body;
  const header = request.headers.authorization
  const response = await createMessage(body, header)
  return replyHandler(response, "sending Message", 201, reply)

}


export async function editMessageHandler(request: FastifyRequest<{Body:EditMessageSchema}>, reply: FastifyReply){
  console.log('Editing Message...')
  const body = request.body;
  const header = request.headers.authorization
  const response = await editMessage(body, header)
  return replyHandler(response, "editing Message", 201, reply)

}