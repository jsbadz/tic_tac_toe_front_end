import { create } from "zustand";

interface Player {
  name: string;
  symbol: "X" | "O";
}

interface Round {
  roundNumber: number;
  winner: string | null; // playerOne.name, playerTwo.name, or "Draw"
  moves: string[];
}

interface PlayerStats {
  wins: number;
  losses: number;
  draws: number;
}

interface PlayerState {
  playerOne: Player;
  playerTwo: Player;
  rounds: Round[];
  playerStats: Record<string, PlayerStats>;
  setPlayers: (p1: string, p2: string) => void;
  addRound: (winner: string | null, moves: string[]) => void;
  resetSession: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  playerOne: { name: "", symbol: "X" },
  playerTwo: { name: "", symbol: "O" },
  rounds: [],
  playerStats: {},
  setPlayers: (p1, p2) =>
    set({
      playerOne: { name: p1, symbol: "X" },
      playerTwo: { name: p2, symbol: "O" },
      rounds: [],
      playerStats: {
        [p1]: { wins: 0, losses: 0, draws: 0 },
        [p2]: { wins: 0, losses: 0, draws: 0 },
      },
    }),
  addRound: (winner, moves) => {
    const { rounds, playerStats, playerOne, playerTwo } = get();
    const roundNumber = rounds.length + 1;

    // Update stats
    const updatedStats = { ...playerStats };
    if (winner === null) {
      updatedStats[playerOne.name].draws++;
      updatedStats[playerTwo.name].draws++;
    } else if (winner === playerOne.name) {
      updatedStats[playerOne.name].wins++;
      updatedStats[playerTwo.name].losses++;
    } else if (winner === playerTwo.name) {
      updatedStats[playerTwo.name].wins++;
      updatedStats[playerOne.name].losses++;
    }

    set({
      rounds: [...rounds, { roundNumber, winner, moves }],
      playerStats: updatedStats,
    });
  },
  resetSession: () =>
    set({
      playerOne: { name: "", symbol: "X" },
      playerTwo: { name: "", symbol: "O" },
      rounds: [],
      playerStats: {},
    }),
}));
