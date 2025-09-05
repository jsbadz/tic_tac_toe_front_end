import { Squares } from "@/app/types/board";

export default (square: Squares): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diags
  ];

  const winningLine = lines.find(([a, b, c]) => {
    return square[a] && square[a] === square[b] && square[a] === square[c];
  });

  return winningLine ? square[winningLine[0]] : null;
};
