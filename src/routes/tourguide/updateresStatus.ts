import { Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { Reservation, resIdParams, resWithoutId } from "../reservation/reservation";

export default async function(server:FastifyInstance){
    server.route({
		method: 'PATCH',
		url: '/update/reservation/:booking_id',
		schema: {
			summary: 'Tour Guide update the Status of the reservation',
			tags: ['TourGuide'],
			body:Type.Partial(resWithoutId),
			params: resIdParams
          
		},
		handler: async (request, reply) => {
			const { booking_id } = request.params as resIdParams;
			if (!ObjectId.isValid(booking_id)) {
				reply.badRequest('booking_id should be an ObjectId!');
				return;
			}
			const updateStatus = request.body as resWithoutId;

			return prismaClient.reservation.update({
				where: { booking_id },
				data:updateStatus ,
			});
		}
	})
}