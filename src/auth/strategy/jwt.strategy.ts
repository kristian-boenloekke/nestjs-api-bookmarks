import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService,
        private prisma: PrismaService
    ) {
        const jwtSecret = config.get<string>('JWT_SECRET')
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in the environment variables')
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret, // Now it's guaranteed to be a string
        })
    }

    async validate(payload: { sub: number, email: string }) {
        return this.prisma.user.findUnique({
            where: { id: payload.sub },
        })
    }
}
