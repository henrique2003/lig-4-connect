import { BOARD } from "./const";

export class GameBoardUtils {
  static isBoardFull (board: number[][]): boolean {
    return board.every(row => row.every(cell => cell !== 0));
  };

  static cloneBoard (board: number[][]): number[][] {
    return board.map((row) => [...row]);
  }

  static getValidMoves (board: number[][]): number[] {
    return board[0].map((cell, i) => (cell === 0 ? i : -1)).filter((i) => i !== -1);
  };

  static getAvailableRow (board: number[][], col: number): number {
    for (let row = BOARD.ROWS - 1; row >= 0; row--) {
      if (board[row][col] === 0) return row;
    }
    return -1;
  };

  static countPotential (board: number[][], player: number): number {
    let count = 0;
    for (let row = 0; row < BOARD.ROWS; row++) {
      for (let col = 0; col < BOARD.COLS; col++) {
        if (board[row][col] === 0) {
          // Favor células vazias adjacentes ao jogador
          const adj = [
            [0, 1], [1, 0], [1, 1], [1, -1]
          ];
          for (let [dr, dc] of adj) {
            const r = row + dr, c = col + dc;
            if (r < BOARD.ROWS && c >= 0 && c < BOARD.COLS && board[r][c] === player) count++;
          }
        }
      }
    }

    return count;
  };

  static evaluateBoard (board: number[][], bot: number): number {
    const opponent = bot === 1 ? 2 : 1;
    return GameBoardUtils.countPotential(board, bot) - 1.5 * GameBoardUtils.countPotential(board, opponent);
  };

  static createEmptyBoard (): number[][] {
    return Array.from({ length: BOARD.ROWS }, () => Array(BOARD.COLS).fill(0));
  }
}