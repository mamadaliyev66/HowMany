import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, addDoc, query, orderBy, limit, getDocs ,where} from "firebase/firestore";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();


  const checkUserValidity = async () => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("user_id");
    
    // If no user is stored in localStorage, no need to check Firestore
    if (!storedUsername || !storedUserId) {
      console.log("No user in localStorage");
      return false;
    }
  
    try {
      // Fetch the user from Firestore based on user_id
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("user_id", "==", storedUserId));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        
        // Check if the stored username matches the Firestore data
        if (userData.username === storedUsername) {
          console.log("User found in Firestore and matches localStorage.");
          return true;
        } else {
          console.log("Username does not match Firestore data.");
        }
      } else {
        console.log("No user found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching user from Firestore:", error);
    }
  
    // If validation fails, remove localStorage data
    localStorage.clear();
    return false;
  };
  

  useEffect(() => {
    const validateUser = async () => {
      const isValid = await checkUserValidity();
      if (!isValid) {
         // Redirect to login if validation fails
      }else{
        navigate('/dashboard')
      }
    };
  
    validateUser();
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Fetch the last user to calculate the next user_id
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, orderBy("user_id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let newUserId = "000001"; // Default for the first user
      if (!querySnapshot.empty) {
        const lastUser = querySnapshot.docs[0].data();
        const lastUserId = parseInt(lastUser.user_id);
        newUserId = (lastUserId + 1).toString().padStart(6, "0");
      }



      // Create the user in Firestore
      await addDoc(usersCollection, {
        username,
        password, // Consider hashing the password
        f_name: fName,
        l_name: lName,
        email,
        login: username,
        user_id: newUserId,
        all_words_count: "0", // Automatically set
      });

      // Store user details in localStorage
      localStorage.setItem("login", username);
      localStorage.setItem("password", password); // For security reasons, remove this in production
      localStorage.setItem("user_id", newUserId);
      localStorage.setItem("username", username);
      localStorage.setItem("f_name", fName);
      localStorage.setItem("l_name", lName);
      localStorage.setItem("email", email);

      setSuccess("Registration successful!");
      const userCollectionRef = collection(db, newUserId);
      await addDoc(userCollectionRef, { createdAt: new Date() });

      // Redirect to dashboard after successful registration
      navigate("/dashboard");
    } catch (err) {
      console.error("Error registering user: ", err);
      setError("Error registering user.");
    }
  };


  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <a className='cursor-pointer'>
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
            </svg>
          </div>
          Register Now
        </div>
      </a>

      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">Register</h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">Create an account to get started.</p>
          </div>

          <div className="p-6 pt-0">
            <form onSubmit={handleRegister}>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">First Name</label>
                <input
                  type="text"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  required
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  placeholder="First Name"
                />
              </div>

              <div className="mt-4 group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Last Name</label>
                <input
                  type="text"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  required
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  placeholder="Last Name"
                />
              </div>

              <div className="mt-4 group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  placeholder="Email"
                />
              </div>

              <div className="mt-4 group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  placeholder="Username"
                />
              </div>

              <div className="mt-4 group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  placeholder="Password"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-x-2">
                <a href="/login" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200">
                  Login
                </a>
                <button
                  type="submit"
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                >
                  Register
                </button>
              </div>

              {error && <div className="text-red-500 mt-4">{error}</div>}
              {success && <div className="text-green-500 mt-4">{success}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
