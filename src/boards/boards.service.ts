import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
    private boards: Board[] = [] // 다른 컴포넌트에서 수정할 수 없도록 private 사용

    getAllBoards(): Board[] {
        return this.boards
    }
}
