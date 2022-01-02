import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule // UseGuards를 사용하기 위해서 auth.module에 있는 AuthModule을 가져온다
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
