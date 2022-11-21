import { generateClassID } from '../../../utils/generate';
import prisma from '../../../utils/prisma';
import { CreateClassInput, GetClassProfessorInput, GetClassUsersInput } from './class.schema';



export async function createClass(input: CreateClassInput){
  console.log("Creating new Class")
  const { classAreaId, name } = input
  const className = name.toUpperCase()
  try{
    await prisma.classarea.findFirstOrThrow({
      where: {
        id: classAreaId
      }
    })
  }catch(e){
    return (e)
  }
  const id = generateClassID()
  const newClass = prisma.class.create({
    data:{
      name: className,
      id,
      classAreaId
    }
  })
  console.log("Class id: " + id)
  console.log("Class name: " + className)
  console.log("Class area: " + classAreaId)
  return (newClass)
}

export async function getClasses(){
  return await prisma.class.findMany({
    select:{
      id: true,
      name: true,
      classArea:{
        select:{
          name: true,
          id: true,
        }
      }
    }
  })
}

export async function getUsersByClassId(input: GetClassUsersInput){
  const { classId } = input
  return await prisma.class.findMany({
    select:{
      users:{
        select:{
          id: true,
          name: true,
          email: true,
          personalDescription: true,
        }, orderBy:{
          name: "asc"
        }
      }
    },where:{
      id: classId
    }
  })
}

export async function getProfessorsByClassId(input: GetClassProfessorInput){
  const { classId } = input
  return await prisma.class.findMany({
    select:{
      professors:{
        select:{
          id: true,
          name: true,
          email: true,
          personalDescription: true,
        }, orderBy:{
          name: "asc"
        }
      }
    },where:{
      id: classId
    }
  })
}
