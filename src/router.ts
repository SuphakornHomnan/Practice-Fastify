import { FastifyInstance } from 'fastify'
import indexRoute from './controllers/index'
import demoRoute from './controllers/demo'
import testRouter from './controllers/test'

export default async function router(fastify: FastifyInstance) {
    // router prefix
    fastify.register(indexRoute, {prefix: '/'})
    fastify.register(demoRoute, {prefix: '/demo'})
    fastify.register(testRouter, { prefix: '/test'})
}