"use client";

interface ButtonProps {
  value?: string | null;
  onClick?: () => void;
  className?: string;
}

export default function Button({ value, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} w-[9rem] rounded-md px-3.5 py-2.5 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:scale-95 transition`}
    >
      {value}
    </button>
  );
}
