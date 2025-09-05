"use client";

import Button from "./Button";

interface PlayerStats {
  wins: number;
  losses: number;
  draws: number;
}

interface Rounds {
  recordNumber: number;
  winner: string | null;
  moves: string[];
}

interface Player {
  name: string;
  symbol: "X" | "O";
}

interface PlayerStatsMap {
  [playerName: string]: PlayerStats;
}

interface RecordType {
  _id: number;
  playerOne: Player;
  playerTwo: Player;
  rounds: Rounds[];
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
    <div className="overflow-x-auto  text-xl font-bold">
      <div className="p-3 text-2xl font-bold flex flex-col items-center justify-center gap-6">
        <div className="text-5xl">Leader Board</div>

        <div className="grid grid-cols-4 gap-6 w-[30rem] text-center text-2xl w-[40rem]">
          <div>Player One</div>
          <div>Player Two</div>
          <div>Round</div>
          <div>Draw</div>
        </div>
        <div className="overflow-x-auto flex flex-col gap-6 max-h-[22rem] scrollbar-none">
          {record?.map((data: RecordType) => (
            <div
              key={data._id}
              className="flex flex-col items-center justify-center w-[40rem] "
            >
              <div className="grid grid-row-4 gap-4 w-full">
                <div className="rounded-2xl border-none w-full w-full flex flex-row gap-4 text-white text-center">
                  <div className="w-full bg-indigo-600 rounded-lg p-4 shadow-xl/30 w-fit">
                    <div> {data.playerOne?.name}</div>
                    <div>
                      Score: {data.playerStats[data.playerOne.name].wins}
                    </div>
                  </div>
                  <div className="w-full bg-indigo-600 rounded-lg p-4 shadow-xl/30">
                    <div> {data.playerTwo?.name}</div>
                    <div>
                      Score: {data.playerStats[data.playerTwo.name].wins}
                    </div>
                  </div>
                  <div className="w-full bg-pink-500 rounded-lg p-4 shadow-xl/30 flex items-center justify-center">
                    <div>{data?.rounds?.length}</div>
                  </div>
                  <div className="w-full bg-cyan-500 rounded-lg p-4 shadow-xl/30 flex items-center justify-center">
                    <div>{data.playerStats[data.playerTwo.name].draws}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStatusPreviousGame;
