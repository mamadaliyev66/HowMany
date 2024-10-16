import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase'; // Adjust as per your structure
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessary for chart.js to work
import dayjs from 'dayjs'; // For date manipulation

export default function Chart() {
  const [chartData, setChartData] = useState(null);
  const [numDocs, setNumDocs] = useState(5); // Default number of documents to show
  const [totalWords, setTotalWords] = useState(0);
  const [daysSpent, setDaysSpent] = useState(0);

  const handleSelectChange = (event) => {
    setNumDocs(parseInt(event.target.value)); // Update number of documents based on user selection
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('user_id'); // Fetch user ID from localStorage

      // Query to limit the number of documents fetched based on user selection
      const q = query(collection(db, userId), limit(numDocs));
      const querySnapshot = await getDocs(q);
      const data = [];
      let totalWordCount = 0;
      let firstDate = null;
      let lastDate = null;

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const wordCount = parseInt(docData.word_count);
        totalWordCount += wordCount; // Accumulate total words

        const formattedDate = dayjs(docData.date, 'MM,DD,YY'); // Parsing date using your format
        data.push({
          date: docData.date,
          time: docData.time,  // Extracting the 'time' field
          word_count: wordCount, // Extracting the 'word_count' field
          formattedDate: formattedDate, // Store the formatted date for calculations
        });

        // Track the first and last dates for the range
        if (!firstDate || formattedDate.isBefore(firstDate)) firstDate = formattedDate;
        if (!lastDate || formattedDate.isAfter(lastDate)) lastDate = formattedDate;
      });

      // Calculate the number of days spent
      const daysSpent = firstDate && lastDate ? lastDate.diff(firstDate, 'day') + 1 : 0;

      // Prepare data for chart.js
      const formattedData = {
        labels: data.map((item) => `${item.date} ${item.time}`), // X-axis (Date and Time)
        datasets: [
          {
            label: 'Word Count',
            data: data.map((item) => item.word_count), // Y-axis (Word Count)
            fill: true,
            borderColor: '#4F46E5', // Example color (Tailwind indigo-600)
            tension: 0.1,
          },
        ],
      };

      setChartData(formattedData);
      setTotalWords(totalWordCount); // Set total words memorized
      setDaysSpent(daysSpent); // Set total days spent
    };

    fetchData();
  }, [numDocs]); // Refetch data when numDocs changes

  // Chart options for responsive behavior
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height/width
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date and Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Word Count',
        },
      },
    },
  };

  return (
    <div className="w-full mx-auto text-white ">
      <div className="flex justify-center mb-4">
        <label htmlFor="numDocs" className="mr-2">
          Show:
        </label>
        <select
          id="numDocs"
          value={numDocs}
          onChange={handleSelectChange}
          className="border border-gray-300 text-black rounded p-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={9999}>All</option>
        </select>
      </div>

      
      {/* Responsive container for chart */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen mx-auto">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      {/* Display total words and days spent */}
      <div className="mt-6 text-center bg-gray-800 mb-20 rounded-xl py-6 ">
        <p className="text-lg font-bold md:text-2xl text-xl">Total Words Memorized: {totalWords}</p>
        <p className="text-lg font-bold md:text-2xl text-xl">Total Days Spent: {daysSpent}</p>
      </div>
    </div>
  );
}
