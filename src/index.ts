import app from './app'

const port = 8080
const address = '127.0.0.1' // only you pc can access

const start = async() => {
    try {
        await app.listen(port, address)
        console.log(`Server listening at ${address}:${port}`)
        
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

start()