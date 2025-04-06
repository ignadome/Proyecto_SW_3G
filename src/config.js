import 'dotenv/config';
import {dirname, join} from 'node:path';

const isProduction = process.env.NODE_ENV === 'production';

export const config = {
    port: process.env.APP_PORT && Number.isInteger(Number(process.env.APP_PORT))  ? Number(process.env.APP_PORT) : 3000,
    recursos: join(dirname(import.meta.dirname), 'static'),
    vistas: join(dirname(import.meta.dirname), 'views'),
    session: {
        resave: false,
        saveUninitialized: true,
        secret: process.env.APP_SESSION_SECRET ? process.env.APP_SESSION_SECRET : 'no muy secreto'
    },
    isProduction,
    logs: join(dirname(import.meta.dirname), 'logs'),
    logger: {
        level: process.env.APP_LOG_LEVEL ?? (! isProduction ? 'debug' : 'info'),
        http: (pino) => {
            return {
                logger: pino,
                autoLogging: ! isProduction,
                useLevel: 'trace'
            }
        }
    }
}