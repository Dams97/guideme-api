import { FastifyInstance } from 'fastify';
// import * as bcrypt from 'bcrypt';
import { Static,Type } from "@sinclair/typebox";


import bcrypt from "bcrypt";
import { prismaClient } from '../../prisma';
  

const loginSchema=Type.Object({
    email:    Type.String() ,    
    password:  Type.String() ,  
  
})
type loginSchema=Static<typeof loginSchema>

  export const createUser=Type.Object({
    email:    Type.String() ,   
    name  :    Type.String(),   
    password:  Type.String() ,  
    phone:     Type.String() ,

    // reservations:Type.Optional(Type.Array(Reservation))
})
export type createUser=Static<typeof createUser>
//login

export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/login',
		schema: {
			summary: 'Login a user and returns a token',
			body: loginSchema,
		},
		handler: async (request, reply) => {
			const { email, password } = request.body as loginSchema;

			const user = await prismaClient.tourist.findFirst({
				where: {
					email: email,
				},
			});
			if (!user) {
				const result = await prismaClient.tourist.create({
					data: {
						email: email,
						password: password,
						name: '',
						phone: '',
					},
				});

				const token = server.jwt.sign({
					id: result.tourist_id,
					email: result.email,
					name: result.name,
					
				});

				return {
					id: result.tourist_id,
					token,
					type: 'SignUp',
				};
			} else {
				if (user.password !== password) {
					reply.unauthorized();
					return;
				}

				const token = server.jwt.sign({
					id: user.tourist_id,
					email: user.email,
					name: user.name,
					role: 'admin',
				});

				return {
					id: user.tourist_id,
					token,
					type: 'SignIn',
				};
			}
		},
	});
}
