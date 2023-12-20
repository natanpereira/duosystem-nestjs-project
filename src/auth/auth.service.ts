import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import RepoService from '../repo.service';

@Injectable()
export class AuthService {
  constructor(
    private repoService: RepoService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.repoService.userRepository.findOne({
      where: { username },
    });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
