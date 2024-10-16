import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase'; // Firebase config file
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

export default function Settings({ userId }) {
  const [userInfo, setUserInfo] = useState({
    allWordsCount: '',
    email: '',
    fName: '',
    lName: '',
    login: '',
    password: '',
    username: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) {
        console.error("Invalid userId:", userId);
        return; // Exit early if userId is not valid
      }

      const userCollectionRef = collection(db, 'users'); // Reference to the users collection
      const userQuery = query(userCollectionRef, where('user_id', '==', userId)); // Query to find the user by user_id
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        userSnapshot.forEach((doc) => {
          setUserInfo({
            allWordsCount: doc.data().all_words_count || '',
            email: doc.data().email || '',
            fName: doc.data().f_name || '',
            lName: doc.data().l_name || '',
            login: doc.data().login || '',
            password: doc.data().password || '',
            username: doc.data().username || '',
          }); // Set user data from the document
        });
      } else {
        console.error("No such user document!");
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCollectionRef = collection(db, 'users'); // Reference to the users collection
    const userQuery = query(userCollectionRef, where('user_id', '==', userId)); // Query to find the user by user_id
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      userSnapshot.forEach(async (doc) => {
        const userDocRef = doc.ref; // Get the document reference
        const updates = {}; // Object to hold the updated fields

        // Check which fields have changed and add them to the updates object
        if (userInfo.allWordsCount !== doc.data().all_words_count) {
          updates.all_words_count = userInfo.allWordsCount;
        }
        if (userInfo.email !== doc.data().email) {
          updates.email = userInfo.email;
        }
        if (userInfo.fName !== doc.data().f_name) {
          updates.f_name = userInfo.fName;
        }
        if (userInfo.lName !== doc.data().l_name) {
          updates.l_name = userInfo.lName;
        }
        if (userInfo.login !== doc.data().login) {
          updates.login = userInfo.login;
        }
        if (userInfo.password !== doc.data().password) {
          updates.password = userInfo.password; // Note: It's not recommended to store plain passwords
        }
        if (userInfo.username !== doc.data().username) {
          updates.username = userInfo.username;
        }

        // Update the document only if there are changes
        if (Object.keys(updates).length > 0) {
          await updateDoc(userDocRef, updates);
          alert("User info updated successfully!");
        } else {
          alert("No changes detected.");
        }
      });
    } else {
      console.error("No such user document to update!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 text-white">
      <h1 className="text-3xl font-bold text-center mb-5">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            name="username"
            value={userInfo.username} // Display current username
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email} // Display current email
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">First Name:</label>
          <input
            type="text"
            name="fName"
            value={userInfo.fName} // Display current first name
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Last Name:</label>
          <input
            type="text"
            name="lName"
            value={userInfo.lName} // Display current last name
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Login:</label>
          <input
            type="text"
            name="login"
            value={userInfo.login} // Display current login
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={userInfo.password} // Display current password (hidden)
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Total Words Count:</label>
          <input
            type="text"
            name="allWordsCount"
            value={userInfo.allWordsCount} // Display current total words count
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500 transition duration-300">
          Update Info
        </button>
      </form>
    </div>
  );
}
