"use client";

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      onClick={onSquareClick}
      className={`rounded-lg flex h-25 w-25 items-center justify-center shadow-xl/30 shadow-xl/30 bg-indigo-600 text-4xl text-shadow-lg font-bold hover:bg-indigo-900 active:scale-95 transition`}
    >
      {value}
    </button>
  );
}
