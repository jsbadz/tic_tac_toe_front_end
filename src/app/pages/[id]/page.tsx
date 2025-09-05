"use client";
import Game from "@/app/components/Game";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <Game sessionId={id} />
    </main>
  );
}
