import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const authToken = req.headers['authorization']?.split(' ')[1];
    if (!authToken) throw new UnauthorizedException();

    const isValidToken = await this.prisma.validTokens.findUnique({
      where: {
        token: authToken,
      },
    });

    // {HOST}:{PORT}/token/create, body: {token: randomString} then you can use this endpoint ^-^
    if (!isValidToken) throw new UnauthorizedException('Invalid Token...');
    if (new Date() >= new Date(isValidToken.expiresAt)) throw new UnauthorizedException('Expired Token...');
    else {
      const res = await this.prisma.validTokens.update({
        where: {
          token: authToken,
        },
        data: {
          expiresAt: new Date(new Date().getTime() + 15 * 60000),
        },
      });

      if (!res) throw new InternalServerErrorException();
    }

    return true;
  }
}
