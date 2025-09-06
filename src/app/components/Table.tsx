"use client";

import { Player, PlayerStats, Round } from "../config/useCommonZustandState";

interface PlayerStatsMap {
  [playerName: string]: PlayerStats;
}

export interface RecordType {
  _id: number;
  playerOne: Player;
  playerTwo: Player;
  rounds: Round[];
  playerStats: PlayerStatsMap;
  status: "active" | "stopped" | "draw";
  createdAt: string;
  updatedAt: string;
  _v: number;
}

interface Props {
  record: RecordType[];
}

const GameStatusPreviousGame = ({ record }: Props) => {
  return (
    <div className="text-lg sm:text-xl font-bold p-4 w-full md:max-w-lg">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-3xl sm:text-5xl font-bold text-center">
          Leader Board
        </div>

        <div className="max-w-md md:max-w-2xl overflow-hidden rounded-xl bg-inherit w-full ">
          {/* Scrollable container with spacing */}
          <div className="max-h-96 overflow-y-auto scrollbar-none space-y-4 p-4">
            {record?.map((data: RecordType) => (
              <div
                key={data._id}
                className="md:flex rounded-lg bg-white shadow-sm overflow-hidden"
              >
                <div className="md:shrink-0">
                  <div className="h-25 w-full md:h-full md:w-30 flex items-center justify-center bg-indigo-600 text-white text-4xl font-bold">
                    X/O
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-bold tracking-wide text-indigo-500 uppercase">
                    Round Finish: 10
                  </div>
                  <p className="mt-2 text-pink-500 flex">
                    {data.playerOne?.name}:{" "}
                    <span className="ml-2 text-shadow-lg">
                      {data.playerStats[data.playerOne.name].wins}
                    </span>
                  </p>
                  <p className="mt-2 text-cyan-500 flex">
                    {data.playerTwo?.name}:{" "}
                    <span className="ml-2 text-shadow-lg">
                      {data.playerStats[data.playerTwo.name].wins}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStatusPreviousGame;
