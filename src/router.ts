import { FastifyInstance } from 'fastify'
import indexRoute from './controllers/index'
import demoRoute from './controllers/demo'
import testRouter from './controllers/test'
import userRouter from './controllers/users'

export default async function router(fastify: FastifyInstance) {
    // router prefix
    fastify.register(indexRoute, {prefix: '/'})
    fastify.register(demoRoute, {prefix: '/demo'})
    fastify.register(testRouter, { prefix: '/test'})
    fastify.register(userRouter, { prefix: '/users'})
}