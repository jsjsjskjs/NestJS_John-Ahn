import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { BoardStatus } from './board-status.enum'
import { Board } from './board.entity'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto)
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id)
  }
  
  @Delete('/:id')
  //내장 Pipe => ParseIntPipe를 사용
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id)
  }
  /*
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards()
  }

  @Post()
  @UsePipes(ValidationPipe) // 이미 만들어진 Built-in Pipes 사용
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto)
  }

  // 모든 param 값을 가져올 땐 @Param() params: string[] 이런식으로 구현한다
  // 특정 게시물 찾기
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id)
  }

  // 특정 게시물 삭제
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id)
  }

  // 특정 게시물 업데이트, id는 param에서 status는 body에서
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ): Board {
    return this.boardsService.updateBoardStatus(id, status)
  }
  */
}
