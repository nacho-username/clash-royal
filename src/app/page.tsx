"use client";

import { useState } from "react";
import { getPlayerData } from "./actions";
import { PlayerData } from "../types/player";

export default function Home() {
  const [playerTag, setPlayerTag] = useState("PQ0RJY0JL");
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  async function handleSubmit(formData: FormData) {
    const tag = formData.get("playerTag") as string;
    try {
      const data = await getPlayerData(tag);
      setPlayerData(data);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clash Royale Player Data</h1>
      <form action={handleSubmit}>
        <input
          type="text"
          name="playerTag"
          value={playerTag}
          onChange={(e) => setPlayerTag(e.target.value)}
          className="border p-2 mr-2 text-slate-800"
          placeholder="Enter player tag"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Fetch Player Data
        </button>
      </form>
      {playerData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{playerData.name}</h2>
          <p>Tag: {playerData.tag}</p>
          <p>Trophies: {playerData.trophies}</p>
          <p>Level: {playerData.expLevel}</p>
          <p>Clan: {playerData.clan?.name || "No Clan"}</p>
          <p>Arena: {playerData.arena.name}</p>
          <p>Wins: {playerData.wins}</p>
          <p>Losses: {playerData.losses}</p>
          <p>Total Donations: {playerData.totalDonations}</p>
          <p>Favorite Card: {playerData.currentFavouriteCard.name}</p>
        </div>
      )}
    </main>
  );
}
