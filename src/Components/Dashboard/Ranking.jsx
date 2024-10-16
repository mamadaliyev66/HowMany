import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase'; // Firebase config file
import { collection, getDocs } from 'firebase/firestore';
import { FaRegGem, FaMedal } from 'react-icons/fa'; // Importing diamond and gold medal icons
import { GiTrophy } from 'react-icons/gi'; // Importing trophy icon for 3rd place

export default function Ranking({ loggedInUserId }) {
  const [users, setUsers] = useState([]);
  const [userPosition, setUserPosition] = useState(null); // State to hold logged-in user's position

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(db, 'users'); // Reference to the users collection
      const usersSnapshot = await getDocs(usersCollectionRef);
      const userList = [];

      // Loop through each user document and retrieve necessary data
      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        const userId = userData.user_id;

        // Initialize totalWords counter
        let totalWords = 0;

        // Reference to user's memories collection
        const userMemoriesCollectionRef = collection(db, String(userId));
        const memoriesSnapshot = await getDocs(userMemoriesCollectionRef);

        // Use map to calculate total words memorized
        const wordCounts = memoriesSnapshot.docs.map((memoryDoc) => {
          const memoryData = memoryDoc.data();
          const wordCount = parseInt(memoryData.word_count) || 0; // Safely parse the word count
          return wordCount; // Return the word count for accumulation
        });

        // Accumulate total words using reduce
        totalWords = wordCounts.reduce((acc, count) => acc + count, 0);

        // Prepare user data
        userList.push({
          id: userId,
          username: userData.username,
          firstName: userData.f_name,
          lastName: userData.l_name,
          email: userData.email,
          totalWords,
        });
      }

      // Sort users by total words memorized in descending order
      userList.sort((a, b) => b.totalWords - a.totalWords);
      setUsers(userList);

      // Find the position of the logged-in user
      const position = userList.findIndex(user => user.id === loggedInUserId);
      setUserPosition(position !== -1 ? position + 1 : null); // Store user position (1-based index)
    };

    fetchUsers();
  }, [loggedInUserId]); // Re-fetch data if logged-in user ID changes

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 text-white h-screen">
       {/* Showbar for logged-in user position */}
       {userPosition && (
        <div className="p-4 bg-blue-600 rounded mb-5">
          <p className="text-lg font-bold text-center">Your Position: {userPosition}</p>
          <p className="text-center">{users[userPosition - 1]?.totalWords} words</p> {/* Display user's total words */}
        </div>
      )}
      <h1 className="text-3xl font-bold text-center mb-5">Ranking</h1>
      <h2 className="text-xl text-center mb-5">Top 3 Users</h2>
      <div className="mb-5">
        {users.slice(0, 3).map((user, index) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 bg-gray-800 rounded mb-2 hover:bg-gray-700 transition-colors duration-300 relative group"
          >
            <span className="font-bold flex items-center">
              {index === 0 && <FaRegGem className="text-blue-400 mr-2" />} {/* Diamond for 1st place */}
              {index === 1 && <FaMedal className="text-yellow-400 mr-2" />} {/* Gold for 2nd place */}
              {index === 2 && <GiTrophy className="text-orange-500 mr-2" />} {/* Trophy for 3rd place */}
              {index + 1}. @{user.username}
            </span>
            <span>{user.totalWords} words</span>
            <div className="absolute z-10 left-0 -bottom-10 hidden group-hover:block bg-gray-900 text-white p-2 rounded shadow-lg">
              <p>{user.firstName} {user.lastName}</p>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>

     

      <h2 className="text-xl text-center mb-5">All Users</h2>
      {users.map((user, index) => (
        <div
          key={user.id}
          className="flex justify-between items-center p-4 bg-gray-800 rounded mb-2 hover:bg-gray-700 transition-colors duration-300 relative group"
        >
          <span className="font-bold flex items-center">
           
            {index + 1}. @{user.username}
          </span>
          <span>{user.totalWords} words</span>
          <div className="absolute z-40 left-0 -bottom-10 hidden group-hover:block bg-gray-900 text-white p-2 rounded shadow-lg">
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
