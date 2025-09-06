"use client";
import { useState } from "react";
import { Squares } from "@/app/types/board";
import { calculateWinner } from "@/app/hooks/useWinner";
import { useRouter } from "next/navigation";
import {
  Round,
  Session,
  usePlayerStore,
} from "../config/useCommonZustandState";
import { UseRequest } from "../config/useAxiosClient";

export const useGame = (sessionId?: string) => {
  const [squares, setSquares] = useState<Squares>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { playerOne, playerTwo } = usePlayerStore();
  const router = useRouter();
  const winnerSymbol = calculateWinner(squares);
  const winnerName =
    winnerSymbol === "X"
      ? playerOne.name
      : winnerSymbol === "O"
      ? playerTwo.name
      : null;

  const status = winnerName
    ? `Winner: ${winnerName}`
    : squares.every(Boolean)
    ? "Draw!"
    : "";

  const handleClick = (i: number) => {
    if (squares[i] || winnerSymbol) return;
    const next = squares.slice();
    next[i] = xIsNext ? playerOne.symbol : playerTwo.symbol;
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  // 🟢 Save & stop game
  const handleStopGame = async () => {
    if (!sessionId) return;

    // Helper: Determine winner's name
    const getWinnerName = () => {
      if (!winnerSymbol) return null;
      return winnerSymbol === "X" ? playerOne.name : playerTwo.name;
    };

    const roundResult = {
      roundNumber: Date.now(),
      winner: getWinnerName(),
      moves: squares,
    };

    try {
      // 1️⃣ Add this round and mark game as stopped
      await UseRequest("put", `/update/${sessionId}`, {
        $push: { rounds: roundResult },
        status: "stopped",
      });

      // 2️⃣ Fetch the updated session
      const currentSession = await UseRequest<Session>(
        "get",
        `/update/${sessionId}`,
        {
          status: "stopped",
        }
      );

      const { rounds } = currentSession;

      // 3️⃣ Helper to count wins, losses, draws
      const countWins = (playerName: string) =>
        rounds.filter((round: Round) => round.winner === playerName).length;

      const countDraws = () =>
        rounds.filter((round: Round) => round.winner === null).length;

      const playerOneWins = countWins(playerOne.name);
      const playerTwoWins = countWins(playerTwo.name);
      const draws = countDraws();

      // 4️⃣ Prepare stats object
      const updatedStats = {
        playerStats: {
          [playerOne.name]: {
            wins: playerOneWins,
            losses: playerTwoWins,
            draws,
          },
          [playerTwo.name]: {
            wins: playerTwoWins,
            losses: playerOneWins,
            draws,
          },
        },
      };

      // 5️⃣ Update stats in the database
      await UseRequest("put", `/update/${sessionId}`, updatedStats);

      // 6️⃣ Redirect home
      router.push("/");
    } catch (error) {
      console.error("Error stopping game:", error);
    }
  };

  // 🟢 Continue game → save round, reset board
  const handleContinueGame = async () => {
    if (!sessionId) return;

    // Determine the winner's name based on the symbol
    const getWinnerName = () => {
      if (!winnerSymbol) return null;
      return winnerSymbol === "X" ? playerOne.name : playerTwo.name;
    };

    const roundResult = {
      roundNumber: Date.now(),
      winner: getWinnerName(),
      moves: squares,
    };

    try {
      await UseRequest("put", `/update/${sessionId}`, {
        $push: { rounds: roundResult },
      });

      setSquares(Array(9).fill(null));
      setXIsNext(true);
    } catch (error) {
      console.error("Error continuing game:", error);
    }
  };

  return {
    squares,
    status,
    handleClick,
    handleStopGame,
    handleContinueGame,
    winnerName,
    playerOne,
    playerTwo,
  };
};
