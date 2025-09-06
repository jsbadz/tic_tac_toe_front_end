import { create } from "zustand";

export interface Player {
  name: string;
  symbol: "X" | "O";
}

export interface Round {
  roundNumber: number;
  winner: string | null;
  moves: string[];
}

export interface Session {
  _id: number;
  playerOne: Player;
  playerTwo: Player;
  rounds: Round[];
  status: string;
}

export interface PlayerStats {
  wins: number;
  losses: number;
  draws: number;
}

interface PlayerState {
  playerOne: Player;
  playerTwo: Player;
  setPlayers: (p1: string, p2: string) => void;
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
    }),
}));
