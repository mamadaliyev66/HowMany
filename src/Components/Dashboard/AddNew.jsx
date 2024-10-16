import React, { useState } from 'react';
import { db } from '../config/firebase'; // Firebase config file
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

export default function AddNew() {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [time, setTime] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [words, setWords] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id'); // Fetch user ID from localStorage
    if (!userId) {
      console.error('No user ID found in localStorage.');
      return;
    }

    try {
      // Validate form data
      if (!date || !hours || !time || !wordCount) {
        alert('Please fill in all required fields.');
        return;
      }

      // Reference to the user's collection
      const userCollectionRef = collection(db, userId); // Get a reference to the user's collection
      const userDoc = await getDoc(doc(db, userId, 'placeholder')); // Check if a placeholder document exists

      // If the placeholder document does not exist, create a new one
      if (!userDoc.exists()) {
        await addDoc(userCollectionRef, {
          // You can store any initial data you want for the user
        });
      }

      // Add the new document to the user's collection
      await addDoc(userCollectionRef, {
        date,
        hours,
        time,
        word_count: wordCount,
        words,
      });
      alert('Memory added successfully!');

      // Clear form fields after submission
      setDate('');
      setHours('');
      setTime('');
      setWordCount('');
      setWords('');
    } catch (error) {
      console.error('Error adding memory: ', error);
      alert('Error adding memory. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 text-white h-screen">
      <h1 className="text-2xl mb-5 text-center">Add a New Memory</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium mb-1">Date (MM.DD.YY):</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded"
            placeholder="10.30.2024"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hours" className="block text-sm font-medium mb-1">Hours Spent:</label>
          <input
            type="text"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded"
            placeholder="1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium mb-1">Time (HH:MM):</label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded"
            placeholder="11:00"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="wordCount" className="block text-sm font-medium mb-1">Words Count:</label>
          <input
            type="text"
            id="wordCount"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded"
            placeholder="30"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="words" className="block text-sm font-medium mb-1">Words (Optional):</label>
          <textarea
            id="words"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded"
            placeholder="apple, juice ..."
            rows="4" // Set the number of visible rows for the textarea
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">
          Add Memory
        </button>
      </form>
    </div>
  );
}
