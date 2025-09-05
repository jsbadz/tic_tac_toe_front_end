"use client";

import Button from "./Button";
import Square from "./Square";
import { useGame } from "@/app/hooks/useGame";

const Game = ({ sessionId }: { sessionId: string }) => {
  const {
    squares,
    status,
    handleClick,
    handleStopGame,
    handleContinueGame,
    playerOne,
    playerTwo,
  } = useGame(sessionId);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Status */}
      <div className="text-5xl font-medium">{status}</div>
      <div className="font-bold flex flex-row items-center justify-center gap-6">
        <div className="text-2xl font-medium">
          {`${playerOne.name} : ${playerOne.symbol}`}
        </div>
        <div className="text-2xl font-medium">
          {`${playerTwo.name} : ${playerTwo.symbol}`}
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3 mt-6 w-80 h-80">
        {squares.map((val, i) => (
          <Square key={i} value={val} onSquareClick={() => handleClick(i)} />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-4 w-full ">
        <Button
          className="bg-pink-500 hover:bg-pink-900 w-auto"
          value="Stop"
          onClick={handleStopGame}
        />
        <Button
          className="bg-cyan-500 hover:bg-cyan-900 w-auto"
          value="Continue"
          onClick={handleContinueGame}
        />
      </div>
    </div>
  );
};

export default Game;
