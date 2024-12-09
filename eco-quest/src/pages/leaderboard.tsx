import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animations
import './leaderboard.css';
import LeftIcon from '../icons/left-icon.tsx';
import RightIcon from '../icons/right-icon.tsx';
import { addWeeks, subWeeks, startOfISOWeek, isSameISOWeek } from 'date-fns';

// Define the type for a leaderboard user
type LeaderboardUser = {
  _id: string;
  user: string;
  footprint: number;
  timestamp: Date;
};

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [prevWeekLb, setPrevWeekLb] = useState<LeaderboardUser[]>([]);
  const [currentWeekLb, setCurrentWeekLb] = useState<LeaderboardUser[]>([]);

  const date = new Date();
  const pstDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const [referenceDate, setReferenceDate] = useState(startOfISOWeek(pstDate));

  const prevWeek = () => {
    const newDate = subWeeks(referenceDate, 1);
    setReferenceDate(newDate);
    updateCurrentAndPrevLb(newDate);
  } 

  const nextWeek = () => {
    const newDate = addWeeks(referenceDate, 1);
    setReferenceDate(newDate);
    updateCurrentAndPrevLb(newDate);
  }

  // Fetch leaderboard data from backend
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/leaderboard");
        const data = await response.json();
        setLeaderboard(data); // TypeScript now knows the shape of `data`
        setPrevWeekLb(data.filter((user) => isSameISOWeek(user.timestamp, subWeeks(startOfISOWeek(pstDate), 1))));
        setCurrentWeekLb(data.filter((user) => isSameISOWeek(user.timestamp, startOfISOWeek(pstDate))));
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const updateCurrentAndPrevLb = (date) => {
    setPrevWeekLb(leaderboard.filter((user) => isSameISOWeek(user.timestamp, subWeeks(date, 1))));
    setCurrentWeekLb(leaderboard.filter((user) => isSameISOWeek(user.timestamp, date)));
  }

  const changeFromPreviousWeek = (username, footprint) => {
    const data = prevWeekLb.find((user) => user.user == username);
    if (data === undefined) {
      return "N/A";
    }
    else {
      const change = (footprint - data.footprint) * 100 / data.footprint;
      if (change > 0) {
        return "+" + change.toFixed(2) + "%";
      }
      else {
        return change.toFixed(2) + "%";
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8 leaderboard">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8 animate-bounce leaderboard-title">
          🌟 EcoQuest Leaderboard 🌟
        </h1>
        <div>
          <p className="text-center"> Week of {referenceDate.toLocaleDateString()} </p>
        </div>
        <div className="flex justify-center gap-4">
          <button className="prevWeek" onClick={prevWeek}>
            <LeftIcon></LeftIcon>
          </button>
          <p>Previous Week</p>
          <p>|</p>
          <p>Next Week</p>
          <button className="nextWeek" onClick={nextWeek}>
            <RightIcon></RightIcon>
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-700">
              <th className="py-3 px-4 text-center leaderboard-column-title">Rank</th>
              <th className="py-3 px-4 text-center leaderboard-column-title">User</th>
              <th className="py-3 px-4 text-center leaderboard-column-title">Carbon Footprint (metric tons)</th>
              <th className="py-3 px-4 text-center leaderboard-column-title">Change From Previous Week</th>
            </tr>
          </thead>
          <tbody>
            {currentWeekLb.map((user, index) => (
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
                <td className="py-3 px-4 text-center">{changeFromPreviousWeek(user.user, user.footprint)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
