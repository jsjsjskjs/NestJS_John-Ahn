import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards = [] // 다른 컴포넌트에서 수정할 수 없도록 private 사용

    getAllBoards() {
        return this.boards
    }
}
