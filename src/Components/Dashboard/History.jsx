import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase'; // Firebase config file
import { collection, getDocs } from 'firebase/firestore';

export default function History({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Check if userId is valid
    if (!userId) {
      console.error("Invalid userId:", userId);
      return; // Exit early if userId is not valid
    }

    const fetchHistory = async () => {
      const userHistoryCollectionRef = collection(db, userId); // Reference to user's history collection
      const historySnapshot = await getDocs(userHistoryCollectionRef);
      const historyList = [];

      // Loop through each document in the user's collection
      historySnapshot.forEach((doc) => {
        const data = doc.data();
        historyList.push({
          id: doc.id,
          date: data.date,
          hours: data.hours,
          time: data.time,
          wordCount: data.word_count,
          words: data.words,
        });
      });

      // Set history data to state
      setHistory(historyList);
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 text-white h-screen">
      <h1 className="text-3xl font-bold text-center mb-5">History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800">
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Hours</th>
              <th className="border px-4 py-2 text-left">Time</th>
              <th className="border px-4 py-2 text-left">Word Count</th>
              <th className="border px-4 py-2 text-left">Words</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id} className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
                <td className="border px-4 py-2">{entry.date}</td>
                <td className="border px-4 py-2">{entry.hours}</td>
                <td className="border px-4 py-2">{entry.time}</td>
                <td className="border px-4 py-2">{entry.wordCount}</td>
                <td className="border px-4 py-2">{entry.words}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
