import { FastifyInstance } from 'fastify';
import { tourGuides } from '../tourGuide/tourguide';
import { Static, Type } from '@sinclair/typebox';

const Tourist = Type.Object({
	id: Type.String({ format: 'uuid' }),
	name: Type.String(),
	phone: Type.String(),
});

export let tourists=
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Ahmed', phone: '0511111111' }

export default async function (server: FastifyInstance) {

	
	server.get('/view/tourguides', async (request, reply) => {
		return tourGuides;
	});
    server.put('/user/profile/:id', async (request, reply) => {
		return 'user profile';
	});
	server.put('/user/update/:id', async (request, reply) => {
		return 'user profile updated';
	});

	server.delete('/user/delete/:id', async (request, reply) => {
		return 'user profile updated';
	});


}
