import { Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import _ from "lodash";
import { prismaClient } from "../../prisma";
import { TourGuide } from "./tourguide";

export default async function (server: FastifyInstance) {
    server.route({
        method: 'PUT',
        url: '/create',
        schema: {
            summary: 'Creates new Tour Guide',
            tags: ['TourGuide'],
            body:TourGuide,
        },
        handler:async(request,reply)=>{
            const checktourGuide=request.body as any;
            if(!ObjectId.isValid(checktourGuide.tourguide_id)){
                reply.badRequest('id not valid')
            } else 
            return await prismaClient.tourguide.upsert({
                where:{tourguide_id:checktourGuide.tourguide_id},
                create:checktourGuide,
                update:_.omit(checktourGuide,['tourguide_id']),
        
        })
    }
})
}