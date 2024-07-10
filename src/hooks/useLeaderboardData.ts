// useLeaderboardData.ts
import { useState, useEffect } from "react";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

/**
 * Interface representing a single leaderboard entry.
 */
interface LeaderboardData {
  username: string;
  points: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Custom React hook for fetching leaderboard data from an API.
 *
 * @returns An object containing the leaderboard data, loading state, and error state.
 */
const useLeaderboardData = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Asynchronous function to fetch leaderboard data from the API.
     */
    const fetchLeaderboardData = async () => {
      try {
        const client = generateClient<Schema>();
        const data = await client.models.Leaderboard.list();
        setLeaderboardData(data.data);
      } catch (err) {
        setError("Failed to fetch leaderboard data");
        console.error("Failed to fetch leaderboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return { leaderboardData, loading, error };
};

export default useLeaderboardData;
