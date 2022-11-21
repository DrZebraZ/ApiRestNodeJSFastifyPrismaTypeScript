import { FastifyRequest, FastifyReply } from 'fastify';
import replyHandler from '../../../utils/replyHandler';
import { CreateMessageInput } from './orientation.schema';
import { createMessage } from './orientation.service';


export async function createMessageHandler(request: FastifyRequest<{Body:CreateMessageInput}>, reply: FastifyReply){
  console.log('Sending Message...')
  const body = request.body;
  const header = request.headers.authorization
  const response = await createMessage(body, header)
  return replyHandler(response, "sending Message", 201, reply)

}