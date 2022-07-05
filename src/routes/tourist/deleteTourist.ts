import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { TouristIdParams } from "./userSchema";

export default async function (server: FastifyInstance) {
    
    server.route({
        method:'DELETE',
        url:'/delete/:tourist_id',
        schema:{
            summary:'Deletes a user',
            tags:['Tourists'],
            params:TouristIdParams,

        },
            handler:async(request,reply)=>{
                const {tourist_id}=request.params as TouristIdParams;
                if(!ObjectId.isValid(tourist_id)){
                    reply.badRequest('invalid id')
                return;}
                
                return prismaClient.tourist.delete({
                    where:{tourist_id},
                })

            }
          })
}