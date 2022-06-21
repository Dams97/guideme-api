import { FastifyInstance } from 'fastify';
import { upsertGuidesController } from '../controllers/tourguides';

export let tourGuides: any[] = [
	{ id: 1, name: 'Saleh',age:27, phone: '0518673554' },
	{ id: 2, name: 'Ahmad',age:24, phone: '0543467567' },
	{ id: 3, name: 'Hadi',age:30, phone: '0573452305' },
    { id: 4, name: 'Khaled',age:34, phone: '0572222305' }
];

export default async function (server: FastifyInstance) {
	server.route({
		method: 'GET',
		url: '/tourguides',
		schema: {
			summary: 'Gets all tour guides',
			tags: ['TourGuides']
		},
		handler: async (request, reply) => {
        return tourGuides;
	}});

	server.route({
		method: 'GET',
		url: '/tourguides/:id',
		schema: {
			summary: 'View a specific Guide',
			tags: ['TourGuides'],
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			tourGuides = tourGuides.find((data) => data.id == +id);

			return tourGuides;
		},
	});
    server.route({
        method: 'PUT',
        url: '/tourguides/profile/update',
        schema: {
            summary: 'Updates tour guides profile',
            tags: ['TourGuides'],
            body: {},
        },
        handler: async (request, reply) => {
            const newContact: any = request.body;
            return upsertGuidesController(tourGuides, newContact);
        },
    });


}