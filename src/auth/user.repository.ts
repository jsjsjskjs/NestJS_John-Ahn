import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { User } from './user.entity'
import * as bcypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto
    const salt = await bcypt.genSalt()
    const hashedPW = await bcypt.hash(password, salt)
    const user = this.create({ username, password: hashedPW })

    try {
      await this.save(user)
    } catch (error) {
        if(error.code === '23505') {
            throw new ConflictException('이름을 사용 중인 유저가 존재합니다')
        } else {
            throw new InternalServerErrorException()
        }
    }
  }
}
