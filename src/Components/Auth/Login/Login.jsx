import React from 'react'
import { useState,useEffect } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const navigate = useNavigate();

  const [username,SetUsername]= useState("")
  const [password,SetPassword]= useState("")

  const [utrueinfo,SetUtrueInfo]=useState("absolute right-3 translate-y-2 text-green-200 hidden")
  const [ptrueinfo,SetPtrueInfo]=useState("absolute right-3 translate-y-2 text-green-200 hidden")


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
  





  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const usersCollection = collection(db, "users"); // Assuming your Firestore collection is 'users'
      const q = query(usersCollection, where("login", "==", username), where("password", "==", password));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setSuccess("Login successful!");
        navigate('/dashboard')

         // Assuming only one user will match the query
         const userDoc = querySnapshot.docs[0];
         const userData = userDoc.data();
 
         // Save user details and login credentials in localStorage
         localStorage.setItem("login", username);
         localStorage.setItem("password", password); // Warning: Don't store passwords like this in production
         localStorage.setItem("user_id", userData.user_id); // Firestore document ID
         localStorage.setItem("username", userData.username);
         localStorage.setItem("f_name", userData.f_name);
         localStorage.setItem("l_name", userData.l_name);
         localStorage.setItem("email", userData.email);
         localStorage.setItem("all_words_count", userData.all_words_count);
        
      } else {
        setError("Invalid username or password.");
        alert("Username or password is invalid !")
      }
    } catch (err) {
      console.error("Error logging in: ", err);
      setError("Error logging in.");
    }
  };

console.log(success,error);




  return (
    <div>


<div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
    <a className='cursor-pointer'>
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                </svg>
            </div>
            How Many ?
        </div>
    </a>
    <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
            bis_skin_checked="1"></div>
        <div
            className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
                <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
                <p className="mt-1.5 text-sm font-medium text-white/50">Welcome back, enter your credentials to continue.
                </p>
            </div>
            <div className="p-6 pt-0">
                <div>
                    <div>
                        <div>
                            <div
                                className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                <div className="flex justify-between">
                                    <label
                                        className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Username</label>
                                    <div className={utrueinfo}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                    fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd"
                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                        clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="absolute right-3 hidden  translate-y-2 text-white bg-rose-600 w-6 h-6 text-center rounded-full ">
                                                !
                                            </div>
                                </div>
                                <input type="text" name="username" placeholder="Username"
                                    autoComplete="off" onChange={(e)=>{SetUsername(e.target.value);if (username!=undefined && username!="") {
                                      SetUtrueInfo("absolute right-3 translate-y-2 text-green-200")
                                    }else{ SetUtrueInfo("absolute right-3 translate-y-2 hidden text-green-200")}}}
                                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <div
                                className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                 <div className={ptrueinfo}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                    fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd"
                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                        clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="absolute right-3 hidden  translate-y-2 text-white bg-rose-600 w-6 h-6 text-center rounded-full ">
                                                !
                                            </div>
                                <div className="flex justify-between">
                                    <label
                                        className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                                </div>
                               
                                <div className="flex items-center">
                                    <input type="password" name="password" onChange={(e)=>{SetPassword(e.target.value);if (username!=undefined && username!="") {
                                      SetPtrueInfo("absolute right-3 translate-y-2 hidden text-green-200")
                                    }else{ SetPtrueInfo("absolute right-3 translate-y-2  text-green-200")}}} placeholder='Password'
                                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                       
                       
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-x-2">
                        <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                            href="/register">Register</a>
                        <button
                            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                            type="button" onClick={handleLogin}>Log in</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    </div>
  )
}
