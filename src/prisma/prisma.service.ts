import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            },
           
        }) // super vil kalde contructor af klasse som extendes, dvs her PrismaClient
        // PrismaClient constructor skal have datasources, db, url
        
    }
}
