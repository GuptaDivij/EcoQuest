import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animations

// Define the type for a leaderboard user
type LeaderboardUser = {
  _id: string;
  user: string;
  footprint: number;
};

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  // Fetch leaderboard data from backend
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5001/leaderboard");
        const data = await response.json();
        setLeaderboard(data); // TypeScript now knows the shape of `data`
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8 animate-bounce">
          🌟 EcoQuest Leaderboard 🌟
        </h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-700">
              <th className="py-3 px-4 text-center">Rank</th>
              <th className="py-3 px-4 text-center">User</th>
              <th className="py-3 px-4 text-center">Footprint</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-green-50`}
              >
                <td className="py-3 px-4 text-center font-bold text-green-600">
                  {index + 1}
                </td>
                <td className="py-3 px-4 text-center">{user.user}</td>
                <td className="py-3 px-4 text-center">
                  {user.footprint.toFixed(2)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
