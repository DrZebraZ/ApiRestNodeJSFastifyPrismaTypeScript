//send Message

import { generateMessageID } from "../../../utils/generate";
import prisma from "../../../utils/prisma";
import { getDateNow } from "../../../utils/utils";
import { getID } from "../../../utils/verifyToken";
import { CreateMessageInput } from './guidance.schema'



export async function createMessage(input:CreateMessageInput, header:any):Promise<any>{
  const senderID = await getID(header)
  var byUser:boolean
  if ((senderID).length == 12){
    byUser = true
  }else if((senderID).length == 8){
    byUser = false
  }else{
    return ("messages only can be created by User or Professor")
  }
  const { guidanceId , text } = input
  const id = generateMessageID()
  const dateNow = await getDateNow()
  const isFrom = await prisma.guidance.findUnique({
    where:{
      id: guidanceId
    },
    select:{
      professorId: true,
      userId: true
    }
  })
  if (isFrom?.professorId === senderID || isFrom?.userId === senderID){
    try{
    await prisma.guidance.update({
      where:{
        id: guidanceId
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
  }else{
    return(
      {"data":{
        "message":"only the professor or user can send mensagens on this guidance",
        "error": "not allowed"
      }
    })
  }
}

//get messages



//delete message

//edit message