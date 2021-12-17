import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Board } from './board.model'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards()
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto)
  }

  //모든 param 값을 가져올 땐 @Param() params: string[] 이런식으로 구현한다
  @Get('/:id')
  getBoardById(@Param('id') id: string) :Board {
    return this.boardsService.getBoardById(id)
  }
}
