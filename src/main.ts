
import { ADMIN, SUPERSECRET } from './env';

import tccRoutesV1 from './v1/modules/tcc/tcc.route';
import guidanceRoutesV1 from './v1/modules/guidance/guidance.route';
import messagesRoutesV1 from './v1/modules/messages/msg.route';
import userRoutesV1 from './v1/modules/users/user.route';
import classRoutesV1 from './v1/modules/class/class.route';
import classAreaRoutesV1 from './v1/modules/classArea/classArea.routes';

import { userSchemas } from './v1/modules/users/user.schema';
import { tccSchemas } from './v1/modules/tcc/tcc.schema';
import { msgSchemas } from './v1/modules/messages/msg.schema';
import { classSchemas } from './v1/modules/class/class.schema';
import { classAreaSchemas } from './v1/modules/classArea/classArea.schema';
import { FastifyRequest, FastifyReply } from 'fastify';


export const server = require('fastify')()


declare module "fastify"{
  export interface FastifyInstance {
    RequireAuth: any;
    RequireAdmin: any;
  }
}

server.register(require('@fastify/jwt'), { secret: SUPERSECRET})

server.decorate(
  'RequireAuth',
  async (request:any, reply:any) => {
  try{
    await request.jwtVerify()
  }catch(e){
    reply.code(401).send(e)
  }
})

export async function RequireAdmin(request:FastifyRequest, reply:FastifyReply) {
  console.log("require admin")
  try{
    const token = request.headers.authorization
    console.log(token)
    if (token != ADMIN){
      throw new Error("YOU AREN'T ADMIN!");
    }
  }catch(e){
    reply.code(401).send(e)
  }
}

server.get('/healthcheck', async function() {
  return { status: "OK"};
})

async function main(){

  for (let schema of [...userSchemas, ...msgSchemas, ...tccSchemas, ...classSchemas, ...classAreaSchemas]){
    await server.addSchema(schema);
  }

  server.register(userRoutesV1, { prefix: 'api/v1/user'})
  server.register(classRoutesV1, { prefix: 'api/v1/class'})
  server.register(classAreaRoutesV1, { prefix: 'api/v1/class/area'})
  server.register(tccRoutesV1, { prefix: 'api/v1/tcc' })
  server.register(guidanceRoutesV1, { prefix: 'api/v1/guidance' })
  server.register(messagesRoutesV1, { prefix: 'api/v1/messages' })

  try{
    await server.listen({ port: 3333, host: '0.0.0.0'})
    console.log("server ready at http://localhost:3333")
  }catch(e){
    console.error(e);
    process.exit(1);
  }


  

  
}

main()