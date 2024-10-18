import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './interfaces/token.interface';
import { TokenService } from './token.service';

interface CommonResponse {
  message: string;
  token: Token;
}

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async returnAllTokens(): Promise<Token[]> {
    const res = await this.tokenService.getAllTokens();
    return res;
  }

  @Post('create')
  async createToken(@Body() createTokenDto: Pick<CreateTokenDto, 'token'>): Promise<CommonResponse> {
    const res = await this.tokenService.createToken(createTokenDto);
    if (!res) throw new Error('Token not created');
    return res;
  }

  @Post('validate')
  async validateToken(@Body() createTokenDto: Required<CreateTokenDto>): Promise<CommonResponse> {
    const res = await this.tokenService.validateToken(createTokenDto.token);
    if (!res) throw new Error('Token not found');
    return res;
  }

  @Post('update')
  async updateToken(@Body() createTokenDto: Pick<CreateTokenDto, 'token'>): Promise<CommonResponse> {
    const res = await this.tokenService.updateToken(createTokenDto.token);
    if (!res) throw new Error('Token not updated');
    return res;
  }

  @Delete('delete')
  async deleteToken(@Body() createTokenDto: Pick<CreateTokenDto, 'token'>): Promise<CommonResponse> {
    const res = await this.tokenService.deleteToken(createTokenDto.token);
    if (!res) throw new Error('Token not deleted');
    return res;
  }
}
