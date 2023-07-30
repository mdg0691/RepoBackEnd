import express from "express"
import { addLogger } from "./utils/logger.js"

const app = express()// instancio express
const PORT = 8080
app.use(addLogger)
app.listen(PORT, ()=>{// inicializo mi server en el puerto 8080
    console.log(`server un port ${PORT}`)
})

// Endpoint para probar los logs
app.get('/loggerTest', (req, res) => {
    req.logger.debug('This is a debug message');
    req.logger.http('This is an http message');
    req.logger.info('This is an info message');
    req.logger.warning('This is a warning message');
    req.logger.error('This is an error message');
    req.logger.fatal('This is a fatal message');
  
    res.send('Logs have been printed in the console.');
  });


