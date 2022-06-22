import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertGuideController } from '../../controllers/upsert-guide';

const TourGuide = Type.Object({
	id: Type.String({ format: 'uuid' }),
	name: Type.String(),
	age:Type.Integer(),
	phone: Type.String(),
});
type TourGuide = Static<typeof TourGuide>;

const GetGuidequery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetGuidequery = Static<typeof GetGuidequery>;

export let tourGuides: TourGuide[] = [
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Ahmed', age:25,phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', name: 'Saleh', age:23,phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', name: 'Hadi', age:30,phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa1', name: 'Mohammed', age:30,phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', name: 'Jaafar',age:19, phone: '0511111111' },

];

export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/tourguides',
		schema: {
			summary: 'Creates new TourGuide profile + all properties are required',
			tags: ['TourGuide'],
			body: TourGuide,
		},
		handler: async (request, reply) => {
			const newGuide: any = request.body;
			return upsertGuideController(tourGuides, newGuide);
		},
	});

	server.route({
		method: 'PATCH',
		url: '/Guides/:id',
		schema: {
			summary: 'Update a guide profile by id + you dont need to pass all properties',
			tags: ['Guide'],
			body: Type.Partial(TourGuide),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newGuide: any = request.body;
			return upsertGuideController(tourGuides, newGuide);
		},
	});

	server.route({
		method: 'DELETE',
		url: '/guides/:id',
		schema: {
			summary: 'Deletes a contact',
			tags: ['Guides'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			tourGuides = tourGuides.filter((c) => c.id !== id);

			return tourGuides;
		},
	});

	server.route({
		method: 'GET',
		url: '/guides/:id',
		schema: {
			summary: 'Returns one contact or null',
			tags: ['Guides'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			response: {
				'2xx': Type.Union([TourGuide, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			return tourGuides.find((c) => c.id === id) ?? null;
		},
	});

	server.route({
		method: 'GET',
		url: '/guides',
		schema: {
			summary: 'Gets all tour guides',
			tags: ['Guides'],
			querystring: GetGuidequery,
			response: {
				'2xx': Type.Array(TourGuide),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetGuidequery;

			if (query.name) {
				return tourGuides.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return tourGuides;
			}
		},
	});
}
