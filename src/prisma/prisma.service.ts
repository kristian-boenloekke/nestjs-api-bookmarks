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

    cleanDb() {
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),

            // Reset auto-incrementing IDs (PostgreSQL)
            // this.$executeRaw`TRUNCATE TABLE "Bookmark" RESTART IDENTITY CASCADE`,
            // this.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`,
        ])
    }
}
