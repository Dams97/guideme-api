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

//   export const createUser=Type.Object({
//     email:    Type.String() ,   
//     name  :    Type.String(),   
//     password:  Type.String() ,  
//     phone:     Type.String() ,

 
// })
// export type createUser=Static<typeof createUser>
//login

export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/login',
		schema: {
			summary: 'Login a user and returns a token',
			tags:['login'],
			body: loginSchema,
		},
		handler: async (request, reply) => {
			const user = request.body as loginSchema;

			const userExist = await prismaClient.tourist.findFirst({
				where: {
					email: user.email,
				},
			});
			if (!userExist) {
				const result = await prismaClient.tourist.create({
					data: {
						email: user.email,
						password: user.password,
						name: '',
						phone: '',
						country:''
					},
				});

				const token = server.jwt.sign({
					email: user.email,
					id: result.tourist_id,
					
				});

				return {
					token,
					type: 'SignUp',
				};
			} else {
				if (user.password !== userExist.password) {
					reply.unauthorized();
					return;
				}

				const token = server.jwt.sign({
					email: user.email,
					id: userExist.tourist_id,
					
				
				});

				return {
					token,
					name:userExist.name,
					type: 'SignIn',
				};
			}
		},
	});
}
