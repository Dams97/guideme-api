import { FastifyInstance } from 'fastify';

//import { Static, Type } from '@sinclair/typebox';




	export default async function (server: FastifyInstance) {

	server.put('/user/create', async (request, reply) => {
		return 'user created';
	});
	server.get('/login', async (request, reply) => {
		return 'hi';
	});

	server.get('/verify', async (request, reply) => {
		return 'welcome';
	});
	


}
