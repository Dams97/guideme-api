import { Languages } from "@prisma/client"
import { Static, Type } from "@sinclair/typebox"
import { ObjectId } from "bson"
import { FastifyInstance } from "fastify"
import { prismaClient } from "../../prisma"
import { tourguideIdParams } from "./tourguide"

export const TourGuideWithoutId=Type.Object({
    name:Type.String(),
    email:Type.String(),
    phone:Type.String(),
    languages:Type.Array(Type.Enum(Languages)),
    experience:Type.String(),
    city:Type.String(),
    price:Type.String()
})
type TourGuideWithoutId=Static<typeof TourGuideWithoutId>
const PartialTourGuideWithoutId=Type.Partial(TourGuideWithoutId)
type PartialTourGuideWithoutId=Static<typeof PartialTourGuideWithoutId>

export default async function(server:FastifyInstance){
    server.route({
		method: 'PATCH',
		url: '/:tourguide_id',
		schema: {
			summary: 'update tour guide info ',
			tags: ['TourGuide'],
			body:PartialTourGuideWithoutId,
			params:tourguideIdParams
          
		},
		handler: async (request, reply) => {
			const {tourguide_id } = request.params as tourguideIdParams;
			if (!ObjectId.isValid(tourguide_id)) {
				reply.badRequest('tourguide_id should be an ObjectId!');
				return;
			}
			const updateGuide = request.body as PartialTourGuideWithoutId;

			return prismaClient.tourguide.update({
				where: { tourguide_id },
				data:updateGuide ,
			});
		}
	})
}