import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { reviewParams } from "./reviews";

export default async function(server:FastifyInstance) {
    server.route({
        method:'DELETE',
        url:'/delete/:review_id',
        schema:{
            summary:'Deletes a user',
            tags:['Reviews'],
            params:reviewParams,
    
        },
            handler:async(request,reply)=>{
                const {review_id}=request.params as reviewParams;
                if(!ObjectId.isValid(review_id)){
                    reply.badRequest('invalid id')
                return;}
                
    
                return prismaClient.review.delete({
                    where:{review_id},
                })
    
            }
          })
    }
