import { Injectable } from '@nestjs/common'
import { Board, BoardStatus } from './board.model'
import { v1 as uuid } from 'uuid' // uuid의 version을 v1으로 사용한다는 뜻
import { CreateBoardDto } from './dto/create-board.dto'

@Injectable()
export class BoardsService {
  // 다른 컴포넌트에서 수정할 수 없도록 private 사용
  // boards의 타입을 정할 때 []이라고 초기화 했기 때문에 ': Board[]' 라고 타입을 정해줘야 한다
  private boards: Board[] = []

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

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id)
  }
}
