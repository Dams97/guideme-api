import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { reviewWithoutId } from "./reviews";

export default async function(server:FastifyInstance) {
    server.route({
		method: 'POST',
		url: '/create',
		schema: {
			summary: 'Creates new tourist',
			tags: ['Reviews'],
			body:reviewWithoutId,
		},
		handler: async (request, reply) => {
			const newReview = request.body as reviewWithoutId;
			return await prismaClient.review.create({
				data:newReview
			});
		},
	})
}