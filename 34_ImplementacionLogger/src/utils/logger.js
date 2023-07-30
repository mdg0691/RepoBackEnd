import 'dotenv/config'// con esta ya puedo usar mis variables de entorno
import winston, { format } from "winston";// logger nos permite permite mostrar info sobre nuestra app

// import dotenv from 'dotenv'

const customLevelsOptions = {
  levels: {
    debug: 5,
    http: 4,
    info: 3,
    warning: 2,
    error: 0,
    fatal: 1,
  },
  colors: {
    debug: "white",
    http: "blue",
    info: "green",
    warning: "yellow",
    error: "red",
    fatal: "red",
  }
};
const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
        filename:'./errors.log',
        level: 'error',
        format: winston.format.simple()
    })
  ],
});
const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
        filename:'./errors.log',
        level: 'error',
        format: winston.format.simple()
    })
  ],
});
// const LOGGER_ENV= 'production'
export const addLogger = (req, res, next) => {
  
    const logger = process.env.LOGGER_ENV === 'production' ? prodLogger : devLogger; 
    
  (req.logger = logger),
    req.logger.http(
      `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
    );
  next();
};
