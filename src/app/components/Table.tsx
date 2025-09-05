"use client";

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

export interface RecordType {
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
    <div className="overflow-x-auto text-lg sm:text-xl font-bold p-4">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-3xl sm:text-5xl font-bold text-center">
          Leader Board
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-center text-base sm:text-2xl font-semibold">
          <div>Player One</div>
          <div>Player Two</div>
          <div>Round</div>
          <div>Draw</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col gap-4 w-full max-w-4xl overflow-y-auto max-h-[28rem] sm:max-h-[22rem] scrollbar-none">
          {record?.map((data: RecordType) => (
            <div
              key={data._id}
              className="grid grid-cols-4 gap-4 sm:gap-6 text-white text-center"
            >
              {/* Player One */}
              <div className="bg-indigo-600 rounded-lg p-2 sm:p-4 shadow-lg flex flex-col items-center justify-center">
                <div className="truncate">{data.playerOne?.name}</div>
                <div className="font-semibold">
                  Score: {data.playerStats[data.playerOne.name].wins}
                </div>
              </div>

              {/* Player Two */}
              <div className="bg-indigo-600 rounded-lg p-2 sm:p-4 shadow-lg flex flex-col items-center justify-center">
                <div className="truncate">{data.playerTwo?.name}</div>
                <div className="font-semibold">
                  Score: {data.playerStats[data.playerTwo.name].wins}
                </div>
              </div>

              {/* Rounds */}
              <div className="bg-pink-500 rounded-lg p-2 sm:p-4 shadow-lg flex items-center justify-center font-semibold">
                {data?.rounds?.length}
              </div>

              {/* Draws */}
              <div className="bg-cyan-500 rounded-lg p-2 sm:p-4 shadow-lg flex items-center justify-center font-semibold">
                {data.playerStats[data.playerTwo.name].draws}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStatusPreviousGame;
