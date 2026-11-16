export interface ICacheProvider {
    set( key: string, value: string, ttl: number ): Promise<"OK">;
    get( key: string ): Promise<string | null>;
    del( key: string ): Promise<number>;
    ttl( key: string ): Promise<number>;
}