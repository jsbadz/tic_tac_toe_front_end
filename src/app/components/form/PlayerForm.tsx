"use client";
import { useState } from "react";

interface PlayerFormProps {
  onSubmit: (playerOne: string, playerTwo: string) => void;
}

const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const handleSubmit = () => {
    if (!playerOne || !playerTwo) {
      alert("Please enter a player name for both players.");
      return;
    }
    onSubmit(playerOne, playerTwo);
  };

  return (
    <div>
      <h2 className="text-white mb-1">Player One</h2>
      <input
        type="text"
        value={playerOne}
        onChange={(e) => setPlayerOne(e.target.value)}
        placeholder="Player One.."
        className="w-full px-3 py-2 mb-3 rounded bg-gray-800 text-white focus:outline-none hover:ring-2 hover:ring-indigo-500 focus:ring-2 focus:ring-indigo-500"
      />

      <h2 className="text-white mb-1">Player Two</h2>
      <input
        type="text"
        value={playerTwo}
        onChange={(e) => setPlayerTwo(e.target.value)}
        placeholder="Player Two.."
        className="w-full px-3 py-2 mb-4 rounded bg-gray-800 text-white hover:ring-2 hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 text-white px-4 py-2 rounded  font-bold hover:-translate-y-1 hover:scale-110 delay-150 duration-300 text-2xl"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default PlayerForm;
