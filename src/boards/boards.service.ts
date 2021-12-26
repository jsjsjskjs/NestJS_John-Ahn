import { Injectable, NotFoundException } from '@nestjs/common'
import { BoardStatus } from './board-status.enum'
import { v1 as uuid } from 'uuid' // uuid의 version을 v1으로 사용한다는 뜻
import { CreateBoardDto } from './dto/create-board.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { BoardRepository } from './board.repository'
import { Board } from "./board.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,    
  ){}

  async getBoardById(id: number): Promise <Board> { // 정의한 entity에 맞게 리턴값이 나오도록
    const found = await this.boardRepository.findOne(id)

    if(!found) {
      throw new NotFoundException(`${id}를 가진 게시물을 찾지 못했습니다`)
    }
    return found
  }
  /*
  // 다른 컴포넌트에서 수정할 수 없도록 private 사용
  // boards의 타입을 정할 때 []이라고 초기화 했기 때문에 ': Board[]' 라고 타입을 정해줘야 한다

  getAllBoards(): Board[] {
    return this.boards
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC //model에서 정의 된 상태를 정해줌
    }

    this.boards.push(board)
    return board
  }
  
  // id로 특정 게시물 가져오기
  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id)

    if (!found) {
      throw new NotFoundException('게시물을 찾을 수 없습니다!')
    }
    return found
  }

  // id로 특정 게시물 삭제하기
  deleteBoard(id: string): void {
    const found = this.getBoardById(id)
    this.boards = this.boards.filter((boards) => boards.id !== found.id)
  }

  // 특정 게시물 상태 업데이트
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id)
    board.status = status
    return board
  }
  */
}
