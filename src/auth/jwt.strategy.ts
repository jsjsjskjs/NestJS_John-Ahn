import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import * as config from 'config'

@Injectable() //JwtStrategy를 다른 곳에서도 사용할 수 있도록 Injectable() 데코레이터 사용
//JwtStrategy class는 PassportStrategy 라는 기능을 상속
//JWT Strategy를 사용하기 위해서 passport-jwt에서 가져온 Strategy를 사용(모듈에서 기본 전략을 jwt로 설정했기 때문에)
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'), //토큰이 유효한지 체크할 때 사용, 모듈에 기입한 키는 토큰을 만들 때 사용
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // 토큰을 어디서 가져오는지 정해준다
    })
  }
  async validate(payload) {
    const { username } = payload
    const user: User = await this.userRepository.findOne({ username })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
