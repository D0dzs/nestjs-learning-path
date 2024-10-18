import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './interfaces/token.interface';
import { Response } from './interfaces/response.interface';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async createToken(notRandomToken: Pick<CreateTokenDto, 'token'>): Promise<Response> {
    const res = await this.prisma.validTokens.create({
      data: {
        token: notRandomToken.token,
        createdAt: new Date(),
        expiresAt: new Date(new Date().getTime() + 15 * 60000),
      },
    });

    if (!res) throw new Error('Token not created');
    return { message: 'Token created', token: res };
  }

  async validateToken(token: string): Promise<Required<Response>> {
    const res = await this.prisma.validTokens.findUnique({
      where: {
        token: token,
      },
    });
    if (!res) throw new Error('Token not found');
    const isValidToken = !(new Date() > new Date(res.expiresAt));

    return { message: 'Token found', token: res, isValidToken };
  }

  async updateToken(token: string): Promise<Response> {
    const res = await this.prisma.validTokens.update({
      where: {
        token: token,
      },
      data: {
        expiresAt: new Date(new Date().getTime() + 15 * 60000),
      },
    });

    if (!res) throw new Error('Token not updated');
    return { message: 'Token expiration date updated', token: res };
  }

  async deleteToken(token: string): Promise<Response> {
    const res = await this.prisma.validTokens.delete({
      where: {
        token: token,
      },
    });

    if (!res) throw new Error('Token not deleted');
    return { message: 'Token deleted', token: res };
  }

  async getAllTokens(): Promise<Token[]> {
    const res = await this.prisma.validTokens.findMany();
    if (!res) throw new Error('No tokens found');
    return res;
  }
}
