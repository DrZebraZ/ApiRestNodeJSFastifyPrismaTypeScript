import { generateClassAreaID } from '../../../utils/generate';
import prisma from '../../../utils/prisma';
import { CreateClassAreaInput } from './classArea.schema';


export async function createClassArea(input: CreateClassAreaInput){
  console.log("Creating Class Area...")
  const AreaName = input.name.toUpperCase()
  const AreaId = generateClassAreaID()
  const classArea = await prisma.classarea.create({
    data:{
      id: AreaId,
      name: AreaName
    }
  })
  console.log("Area Name: " + AreaName)
  console.log("Area ID: " + AreaId)
  return (classArea)
}

/*
  fastify.get('/curso/getAreaCurso', async () => {
    return prisma.areaCurso.findMany()
  })

  fastify.get('/curso/getCursosPorArea', async () => {
    
  }) */

// AREA CURSOS