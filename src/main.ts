import userRoutesV1 from './v1/modules/users/user.route';
import classRoutesV1 from './v1/modules/class/class.route';
import classAreaRoutesV1 from './v1/modules/classArea/classArea.routes';
import { userSchemas } from './v1/modules/users/user.schema';
import { SUPERSECRET } from './env';
import tccRoutesV1 from './v1/modules/tcc/tcc.route';
import orientationRoutesV1 from './v1/modules/orientation/orientation.route';


export const server = require('fastify')()


declare module "fastify"{
  export interface FastifyInstance {
    RequireAuth: any;
  }
}

server.register(require('@fastify/jwt'), { secret: SUPERSECRET})

server.decorate(
  'RequireAuth',
  async (request, reply) => {
  try{
    await request.jwtVerify()
  }catch(e){
    reply.code(401).send(e)
  }
})

server.get('/healthcheck', async function() {
  return { status: "OK"};
})

async function main(){

  for (const schema of userSchemas){
    server.addSchema(schema);
  }

  server.register(userRoutesV1, { prefix: 'api/v1/user'})
  server.register(classRoutesV1, { prefix: 'api/v1/class'})
  server.register(classAreaRoutesV1, { prefix: 'api/v1/class/area'})
  server.register(tccRoutesV1, { prefix: 'api/v1/tcc' })
  server.register(orientationRoutesV1, { prefix: 'api/v1/orientation' })

  try{
    await server.listen({ port: 3333, host: '0.0.0.0'})
    console.log("server ready at http://localhost:3333")
  }catch(e){
    console.error(e);
    process.exit(1);
  }


  

  
}

main()