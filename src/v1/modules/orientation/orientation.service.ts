//send Message

import { generateMessageID } from "../../../utils/generate";
import prisma from "../../../utils/prisma";
import { getDateNow } from "../../../utils/utils";
import { getID } from "../../../utils/verifyToken";
import { CreateMessageInput } from './orientation.schema';



export async function createMessage(input:CreateMessageInput, header:any):Promise<any>{
  const userID = getID(header)
  var byUser:boolean
  if ((await (userID)).length == 12){
    byUser = true
  }else if((await (userID)).length == 8){
    byUser = false
  }else{
    return ("messages only can be created by User or Professor")
  }

  const { orientationId , text } = input
  const id = generateMessageID()
  const dateNow = await getDateNow()
  try{
    await prisma.orientation.update({
      where:{
        id: orientationId
      },
      data:{
        messages:{
          create:{
            id,
            text,
            createdByUser: byUser,
            createdAt: dateNow
          }
        }
      }
    })
    return true;
  }catch(e){
    return e;
  }
}

//get messages

//delete message

//edit message