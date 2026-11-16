import Redis from "ioredis";
import { logger } from "../logger/logger.js";
import { ICacheProvider } from "./cache.interface.js";

interface configCache {
    host: string;
    port: number;
    password: string;
}
export class RedisCacheProvider implements ICacheProvider {
    private readonly client: Redis;

    constructor( config: configCache ) {
        this.client = new Redis( {
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime: 3
        } );
        this.client.on( "error", ( err ) => {
            logger.error( "Redis Server Error", { errorMessage: err.message } )
        } )
        this.client.connect().catch( err => logger.error( "Redis Connection Error", { errorMessage: err.message } ) );
    }
    async set( key: string, value: string, ttl: number ) {
        return this.client.set( key, value, 'EX', ttl );
    }
    async get( key: string ){
        return this.client.get( key );
    }
    async del( key: string ) {
        return this.client.del( key );
    }
    async ttl( key: string ){
        return this.client.ttl( key );
    }
}