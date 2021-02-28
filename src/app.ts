import * as fastify from 'fastify'

import routers from './router'

const app: fastify.FastifyInstance = fastify.fastify({
    logger: {
        level: 'info'
    }
})

// เรียกข้าม domain 
app.register(require('fastify-cors'))

// เรียก JSON
app.register(require('fastify-formbody'))

// register knex
app.register(require('fastify-knexjs'), {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'test',
        socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    },
    debug: true
})

app.register(routers)

export default app