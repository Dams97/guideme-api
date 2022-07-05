import { Static, Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import tourguide, { TourGuide, tourguideIdParams } from "./tourguide";


const GetCityQuery = Type.Object({
	city: Type.Optional(Type.String()),
});

type GetCityQuery=Static<typeof GetCityQuery>
export default async function(server:FastifyInstance) {
   server.route({
    method: 'GET',
    url: '/tourguides',
    schema: {
        summary: 'Returns for all tour guides in this city',
        tags: ['TourGuide'],
        querystring:GetCityQuery,
        response: {
            '2xx': Type.Array(TourGuide),
        },
    },
    handler: async (request, reply) => {
        const query = request.query as GetCityQuery;
        return await prismaClient.tourguide.findMany({
            where:query
        });
        }
      }),
      server.route({
        method:'GET',
        url:'/:tourguide_id',
        schema:{
            summary:'View a tour guide',
            tags:['TourGuide'],
            params:tourguideIdParams,

        },
            handler:async(request,reply)=>{
                const {tourguide_id}=request.params as tourguideIdParams;
                if(!ObjectId.isValid(tourguide_id)){
                    reply.badRequest('invalid id')
                return ;
            }
                

                return await prismaClient.tourguide.findUnique({
                    where:{tourguide_id},
                })

            }
          })
}
