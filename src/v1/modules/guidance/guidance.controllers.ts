import { FastifyRequest, FastifyReply } from 'fastify';
import replyHandler from '../../../utils/replyHandler';
import { CreateMessageInput } from './guidance.schema';
import { createMessage } from './guidance.service';


export async function createMessageHandler(request: FastifyRequest<{Body:CreateMessageInput}>, reply: FastifyReply){
  console.log('Sending Message...')
  const body = request.body;
  const header = request.headers.authorization
  const response = await createMessage(body, header)
  return replyHandler(response, "sending Message", 201, reply)

}