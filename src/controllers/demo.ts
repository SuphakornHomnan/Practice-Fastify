import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default async function demo(fastify: FastifyInstance){
    fastify.get('/', async(request: FastifyRequest, reply: FastifyReply) => {
        reply.send(
            {
                message: 'Demo!'
            }
        )
    })

    // C = CREATE
    fastify.post('/', async(request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: 'Hello from POST method'})
    })

    fastify.post('/params', async(request: FastifyRequest, reply: FastifyReply) => {
        const body: any = request.body
        const username: String = body.username
        const password: String = body.password

        reply.send({username, password})
    })
    // R = READ
    fastify.get('/:firstname/:lastname', async(request: FastifyRequest, reply: FastifyReply) => {
        const params: any = request.params

        const firstname: String = params.firstname
        const lastname: String = params.lastname

        reply.send({firstname, lastname})
    })

    // http://localhost:8080/demo?firstname=suphakorn&lastname=homnan
    fastify.get('/query', async(request: FastifyRequest, reply: FastifyReply) => {
        const query: any = request.query

        const firstname: String = query.firstname
        const lastname: String = query.lastname

        reply.send({firstname, lastname})
    })
}