import { drop, dropLine } from "@/src/assets";
import { Audio } from "expo-av";
import { goBack } from "expo-router/build/global-state/routing";
import { useEffect, useRef, useState } from "react";
import {
  Alert
} from "react-native";
import { BOARD } from "./const";
import { GameBoardProps, Player } from "./props";
import { GameBoardUtils } from "./utils";

export const useGameBoard = ({ singlePlayer }: GameBoardProps) => {
  const [board, setBoard] = useState(GameBoardUtils.createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.Red);
  const [moveCount, setMoveCount] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const botPlayer = Player.Yellow;

  const dropSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    if (singlePlayer && currentPlayer === botPlayer) {
      const botMove = getBestMove(board, BOARD.MAX_DEPTH, Player.Yellow);
      setTimeout(() => dropPiece(botMove, true), 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer]);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(drop);
      dropSound.current = sound;
    };

    loadSound();

    return () => {
      dropSound.current?.unloadAsync(); // limpa ao desmontar
    };
  }, []);

  function handleChangeShowRules(show: boolean): void {
    setShowRules(show);
  }

  const getBestMove = (board: number[][], depth: number, botPlayer: number): number => {
    const opponent = botPlayer === 1 ? 2 : 1;

    // 1. Verifica se o bot pode vencer agora
    for (let col of GameBoardUtils.getValidMoves(board)) {
      const row = GameBoardUtils.getAvailableRow(board, col);
      if (row === -1) continue;

      const tempBoard = GameBoardUtils.cloneBoard(board);
      tempBoard[row][col] = botPlayer;

      if (checkWin(tempBoard, row, col, botPlayer)) {
        return col; // joga para vencer
      }
    }

    // 2. Verifica se o oponente pode vencer na próxima jogada
    for (let col of GameBoardUtils.getValidMoves(board)) {
      const row = GameBoardUtils.getAvailableRow(board, col);
      if (row === -1) continue;

      const tempBoard = GameBoardUtils.cloneBoard(board);
      tempBoard[row][col] = opponent;

      if (checkWin(tempBoard, row, col, opponent)) {
        return col; // bloqueia
      }
    }

    // 3. Se não há vitória/bloqueio, usa o minimax
    let bestScore = -Infinity;
    let bestCols: number[] = [];

    for (let col of GameBoardUtils.getValidMoves(board)) {
      const row = GameBoardUtils.getAvailableRow(board, col);
      if (row === -1) continue;

      const tempBoard = GameBoardUtils.cloneBoard(board);
      tempBoard[row][col] = botPlayer;

      const score = minimax(tempBoard, depth - 1, false, botPlayer, opponent);

      if (score > bestScore) {
        bestScore = score;
        bestCols = [col];
      } else if (score === bestScore) {
        bestCols.push(col);
      }
    }

    // Ordena para priorizar colunas mais próximas ao centro
    bestCols.sort((a, b) => Math.abs(BOARD.COLS / 2 - a) - Math.abs(BOARD.COLS / 2 - b));
    return bestCols[Math.floor(Math.random() * Math.min(2, bestCols.length))]; // sorteia entre os melhores
  };

  const minimax = (
    board: number[][],
    depth: number,
    isMaximizing: boolean,
    botPlayer: number,
    humanPlayer: number
  ): number => {
    if (depth === 0 || GameBoardUtils.isBoardFull(board)) {
      return GameBoardUtils.evaluateBoard(board, botPlayer);
    }

    const player = isMaximizing ? botPlayer : humanPlayer;
    const moves = GameBoardUtils.getValidMoves(board);

    let best = isMaximizing ? -Infinity : Infinity;

    for (let col of moves) {
      const row = GameBoardUtils.getAvailableRow(board, col);
      if (row === -1) continue;

      const tempBoard = GameBoardUtils.cloneBoard(board);
      tempBoard[row][col] = player;

      const score = minimax(tempBoard, depth - 1, !isMaximizing, botPlayer, humanPlayer);
      best = isMaximizing ? Math.max(best, score) : Math.min(best, score);
    }

    return best;
  };

  const playDropSound = async () => {
    try {
      await dropSound.current?.replayAsync();
    } catch (error) {
      console.warn("Erro ao reproduzir som:", error);
    }
  };

  const playLineDropSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(dropLine);
      await sound.playAsync();
    } catch (error) {
      console.warn("Erro ao tocar som da linha:", error);
    }
  };

  const dropPiece = async (colIndex: number, isBotPlayer?: boolean) => {
    if (singlePlayer && currentPlayer === botPlayer && !isBotPlayer) {
      return;
    }

    const newBoard = board.map((row) => [...row]);

    for (let row = BOARD.ROWS - 1; row >= 0; row--) {
      if (newBoard[row][colIndex] === 0) {
        newBoard[row][colIndex] = currentPlayer;

        const updatedMoveCount = moveCount + 1;

        playDropSound();
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === Player.Red ? Player.Yellow : Player.Red);

        if (checkWin(newBoard, row, colIndex, currentPlayer)) {
          return Alert.alert(
            `Jogador ${Player.Red === currentPlayer ? "Vermelho" : "Amarelo"} venceu!`,
            "Deseja jogar novamente?",
            [
              {
                text: "Inicio",
                style: "cancel",
                onPress: () => {
                  goBack();
                },
              },
              {
                text: "Jogar novamente",
                onPress: () => {
                  setBoard(GameBoardUtils.createEmptyBoard());
                  setCurrentPlayer(Player.Red);
                  setMoveCount(0);
                },
              },
            ]
          );
        }

        const isBoardFull = GameBoardUtils.isBoardFull(newBoard);
        if (updatedMoveCount % 10 === 0 || (isBoardFull && updatedMoveCount % 10 !== 0)) {
          newBoard.pop();
          newBoard.unshift(Array(BOARD.COLS).fill(0));

          playLineDropSound();
        }

        return setMoveCount(updatedMoveCount);
      }
    }
  };

  const checkWin = (b: number[][], row: number, col: number, player: number): boolean => {
    return (
      countInDirection(b, row, col, 0, 1, player) + countInDirection(b, row, col, 0, -1, player) > 2 ||
      countInDirection(b, row, col, 1, 0, player) + countInDirection(b, row, col, -1, 0, player) > 2 ||
      countInDirection(b, row, col, 1, 1, player) + countInDirection(b, row, col, -1, -1, player) > 2 ||
      countInDirection(b, row, col, 1, -1, player) + countInDirection(b, row, col, -1, 1, player) > 2
    );
  };

  const countInDirection = (b: number[][], row: number, col: number, rowDir: number, colDir: number, player: number): number => {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
    while (r >= 0 && r < BOARD.ROWS && c >= 0 && c < BOARD.COLS && b[r][c] === player) {
      count++;
      r += rowDir;
      c += colDir;
    }
    return count;
  };

  return {
    currentPlayer,
    moveCount,
    board,
    dropPiece,
    handleChangeShowRules,
    showRules
  }
}