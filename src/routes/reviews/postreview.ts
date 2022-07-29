import { Rate } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { JwtVerificationSchema } from "../tourist/touristmakeRes";



export const reviewWithoutId=Type.Object({
    rate:Type.Enum(Rate),

    tourguide_id:Type.String()
})
export type reviewWithoutId=Static<typeof reviewWithoutId>

export default async function(server:FastifyInstance) {
	
    server.route({
		method: 'POST',
		url: '/create',
		schema: {
			summary: 'Creates new Review',
			tags: ['Reviews'],
			body:Type.Partial(reviewWithoutId),
			headers:JwtVerificationSchema,
		},
		handler: async (request, reply) => {
			const newReview : any= request.body as reviewWithoutId;
			const { token } = request.headers as JwtVerificationSchema;
			server.jwt.verify(token,   async function(err, decoded) {
				let a = decoded.id;  
			if(a){
			return await prismaClient.review.create({
				data:{
					rate:newReview.rate,
					tourguide_id:newReview.tourguide_id,
				
					tourist_id:a
				}

			});
		
			}
	})
}
}
)}