
import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Chart from './Chart'
import Ranking from "./Ranking"
import Settings from "./Settings"
import History from "./History"
import AddNew from './AddNew';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from 'react-router-dom';
import LogOut from './LogOut';

export default function Dashboard() {
  const navigate=useNavigate()
  const [nav, setNav] = useState(false);

  const [page,setPage]=useState("main")




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
        navigate('/login')
         // Redirect to login if validation fails
      }else{

      }
    };
  
    validateUser();
  }, [navigate]);
  





  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className='h-screen bg-gray-900'>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">

    <nav className='w-full h-20  bg-gray-800 md:hidden grid grid-cols-2 pt-5'>
   
   
    <div className='pt-[5%] ml-9'>
      
    <div onClick={handleNav} className='block md:hidden transition-all duration-1000  text-white '>
        {nav ? < AiOutlineMenu  size={25} /> : <AiOutlineClose size={25} />}
      </div>

    </div>
      <h1 className='text-center text-white font-bold text-xl pt-[5%] '>How Many ?</h1>


    </nav>

    {/* <!-- Sidebar --> */}
{/* "fixed top-0 left-0 z-40 w-64 h-screen pt-3 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" */}
    <aside
      className={
        nav
        ? 'fixed top-0 left-0 z-40 w-64 h-screen pt-3 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
        : 'fixed top-0 left-0 z-40 w-64 h-screen pt-3 transition-transform  bg-white border-r border-gray-200 translate-x-0 dark:bg-gray-800 dark:border-gray-700'
    }
      
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
       
        <ul className="space-y-2">
        <li className=''>
        
            <div
              
              className="flex items-center text-center text-xl p-2  font-medium  rounded-lg text-white group"
            >
              
              <span className="ml-3">How Many ?</span><div onClick={handleNav} className='block pl-6 md:hidden transition-all duration-1000  text-white '>
        {nav ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}
      </div>
            </div>
          </li>
          
          <li onClick={()=>{setPage('main')}}>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Overview</span>
            </a>
          </li>
          <li onClick={()=>{setPage('addnew')}}>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
               <svg className='rounded text-white'
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
              <span className="ml-3">Add New</span>
            </a>
          </li>
          <li onClick={()=>{setPage('ranking')}}>
            <button
              type="button"
              className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-pages"
              data-collapse-toggle="dropdown-pages"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
              </svg>
              <span className="flex-1 ml-3 text-left whitespace-nowrap"
                >Ranking</span
              >
              
            </button>
           
          </li>
          <li onClick={()=>{setPage('history')}}>
            <button
              type="button"
              className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-sales"
              data-collapse-toggle="dropdown-sales"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 ' fill='white' shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 513.11"><path fillRule="nonzero" d="M210.48 160.8c0-14.61 11.84-26.46 26.45-26.46s26.45 11.85 26.45 26.46v110.88l73.34 32.24c13.36 5.88 19.42 21.47 13.54 34.82-5.88 13.35-21.47 19.41-34.82 13.54l-87.8-38.6c-10.03-3.76-17.16-13.43-17.16-24.77V160.8zM5.4 168.54c-.76-2.25-1.23-4.64-1.36-7.13l-4-73.49c-.75-14.55 10.45-26.95 25-27.69 14.55-.75 26.95 10.45 27.69 25l.74 13.6a254.258 254.258 0 0136.81-38.32c17.97-15.16 38.38-28.09 61.01-38.18 64.67-28.85 134.85-28.78 196.02-5.35 60.55 23.2 112.36 69.27 141.4 132.83.77 1.38 1.42 2.84 1.94 4.36 27.86 64.06 27.53 133.33 4.37 193.81-23.2 60.55-69.27 112.36-132.83 141.39a26.24 26.24 0 01-12.89 3.35c-14.61 0-26.45-11.84-26.45-26.45 0-11.5 7.34-21.28 17.59-24.92 7.69-3.53 15.06-7.47 22.09-11.8.8-.66 1.65-1.28 2.55-1.86 11.33-7.32 22.1-15.7 31.84-25.04.64-.61 1.31-1.19 2-1.72 20.66-20.5 36.48-45.06 46.71-71.76 18.66-48.7 18.77-104.46-4.1-155.72l-.01-.03C418.65 122.16 377.13 85 328.5 66.37c-48.7-18.65-104.46-18.76-155.72 4.1a203.616 203.616 0 00-48.4 30.33c-9.86 8.32-18.8 17.46-26.75 27.29l3.45-.43c14.49-1.77 27.68 8.55 29.45 23.04 1.77 14.49-8.55 27.68-23.04 29.45l-73.06 9c-13.66 1.66-26.16-7.41-29.03-20.61zM283.49 511.5c20.88-2.34 30.84-26.93 17.46-43.16-5.71-6.93-14.39-10.34-23.29-9.42-15.56 1.75-31.13 1.72-46.68-.13-9.34-1.11-18.45 2.72-24.19 10.17-12.36 16.43-2.55 39.77 17.82 42.35 19.58 2.34 39.28 2.39 58.88.19zm-168.74-40.67c7.92 5.26 17.77 5.86 26.32 1.74 18.29-9.06 19.97-34.41 3.01-45.76-12.81-8.45-25.14-18.96-35.61-30.16-9.58-10.2-25.28-11.25-36.11-2.39a26.436 26.436 0 00-2.55 38.5c13.34 14.2 28.66 27.34 44.94 38.07zM10.93 331.97c2.92 9.44 10.72 16.32 20.41 18.18 19.54 3.63 36.01-14.84 30.13-33.82-4.66-15-7.49-30.26-8.64-45.93-1.36-18.33-20.21-29.62-37.06-22.33C5.5 252.72-.69 262.86.06 274.14c1.42 19.66 5.02 39 10.87 57.83z"/></svg>
              <span className="flex-1 ml-3 text-left whitespace-nowrap"
                >History</span
              >
              
            </button>
            
          </li>
          
        </ul>
        <ul
          className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
        >
          <li onClick={()=>{setPage('settings')}}>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 122.88 95.089"
              
              fill='white'
            >
              <g>
                <path d="M66.605,9.676c-0.791-0.791-1.718-1.181-2.792-1.181c-1.073,0-2.013,0.39-2.791,1.181l-4.255,4.241c-1.141-0.738-2.348-1.383-3.61-1.96c-1.261-0.577-2.55-1.072-3.852-1.502V3.931c0-1.1-0.375-2.026-1.141-2.791C47.401,0.375,46.475,0,45.374,0h-8.187c-1.047,0-1.958,0.375-2.75,1.14c-0.778,0.765-1.168,1.691-1.168,2.791v5.973c-1.368,0.321-2.697,0.724-3.973,1.221c-1.287,0.496-2.508,1.061-3.663,1.691l-4.711-4.644c-0.738-0.778-1.637-1.181-2.724-1.181c-1.075,0-2,0.403-2.792,1.181l-5.73,5.745c-0.791,0.791-1.181,1.718-1.181,2.79c0,1.074,0.39,2.014,1.181,2.792l4.242,4.255c-0.738,1.14-1.382,2.348-1.959,3.608c-0.578,1.262-1.073,2.552-1.504,3.853H3.933c-1.102,0-2.028,0.375-2.792,1.14C0.376,33.121,0,34.047,0,35.148v8.187c0,1.045,0.376,1.959,1.14,2.751c0.764,0.777,1.691,1.167,2.792,1.167h5.971c0.322,1.367,0.724,2.696,1.222,3.971c0.498,1.289,1.061,2.537,1.691,3.744l-4.644,4.63c-0.779,0.739-1.181,1.638-1.181,2.726c0,1.073,0.402,2,1.181,2.792l5.745,5.811c0.791,0.738,1.717,1.102,2.792,1.102c1.072,0,2.011-0.363,2.791-1.102l4.254-4.321c1.14,0.737,2.349,1.381,3.61,1.96c1.262,0.575,2.55,1.073,3.852,1.502v6.523c0,1.1,0.376,2.025,1.14,2.789c0.765,0.767,1.692,1.143,2.792,1.143h8.186c1.047,0,1.959-0.376,2.751-1.143c0.777-0.764,1.167-1.689,1.167-2.789v-5.973c1.369-0.321,2.697-0.724,3.972-1.222c1.289-0.496,2.538-1.061,3.744-1.691l4.63,4.645c0.739,0.778,1.65,1.181,2.753,1.181c1.112,0,2.025-0.402,2.765-1.181l5.811-5.744c0.738-0.793,1.102-1.719,1.102-2.792s-0.363-2.013-1.102-2.791l-4.321-4.255c0.738-1.141,1.382-2.348,1.96-3.609c0.575-1.261,1.072-2.551,1.502-3.852h6.523c1.1,0,2.025-0.378,2.789-1.141c0.766-0.766,1.142-1.691,1.142-2.792v-8.186c0-1.047-0.376-1.958-1.142-2.752c-0.764-0.778-1.689-1.167-2.789-1.167h-5.973c-0.322-1.315-0.725-2.63-1.222-3.931c-0.496-1.316-1.061-2.55-1.691-3.706l4.645-4.709c0.778-0.738,1.181-1.638,1.181-2.724c0-1.075-0.402-2-1.181-2.792L66.605,9.676z M111.918,53.649c-0.506-0.355-1.044-0.479-1.627-0.376c-0.583,0.101-1.057,0.401-1.401,0.904l-1.908,2.702c-0.688-0.292-1.402-0.526-2.144-0.721c-0.737-0.194-1.484-0.343-2.231-0.451l-0.616-3.538c-0.105-0.596-0.395-1.063-0.884-1.406c-0.486-0.343-1.024-0.459-1.621-0.354l-4.441,0.774c-0.566,0.099-1.025,0.39-1.383,0.879c-0.35,0.487-0.475,1.027-0.369,1.625l0.564,3.238c-0.713,0.303-1.395,0.648-2.037,1.038c-0.654,0.392-1.263,0.812-1.828,1.264l-2.995-2.073c-0.476-0.352-0.999-0.484-1.59-0.383c-0.583,0.103-1.046,0.407-1.402,0.904l-2.564,3.659c-0.354,0.504-0.479,1.044-0.377,1.623c0.102,0.585,0.402,1.057,0.905,1.404l2.703,1.907c-0.292,0.687-0.527,1.402-0.721,2.144c-0.195,0.738-0.343,1.484-0.452,2.231l-3.538,0.616c-0.596,0.104-1.063,0.396-1.406,0.884c-0.344,0.486-0.458,1.025-0.354,1.621l0.773,4.441c0.099,0.566,0.388,1.026,0.88,1.383c0.487,0.35,1.027,0.474,1.624,0.369l3.239-0.564c0.304,0.713,0.648,1.394,1.038,2.039c0.392,0.652,0.815,1.274,1.272,1.869l-2.073,2.994c-0.352,0.476-0.484,0.999-0.383,1.59c0.103,0.583,0.407,1.046,0.904,1.402l3.659,2.565c0.504,0.354,1.044,0.479,1.623,0.377c0.585-0.102,1.057-0.402,1.403-0.905l1.908-2.703c0.688,0.292,1.402,0.527,2.144,0.721c0.738,0.195,1.484,0.343,2.231,0.452l0.616,3.538c0.105,0.596,0.395,1.063,0.884,1.406c0.486,0.343,1.024,0.459,1.621,0.354l4.441-0.774c0.566-0.099,1.025-0.39,1.383-0.879c0.35-0.487,0.475-1.027,0.369-1.625l-0.564-3.238c0.713-0.303,1.395-0.648,2.037-1.038c0.654-0.392,1.263-0.812,1.828-1.264l2.995,2.073c0.476,0.352,0.999,0.484,1.59,0.383c0.583-0.103,1.046-0.407,1.402-0.904l2.564-3.659c0.354-0.504,0.479-1.044,0.377-1.623C112.063,54.327,112.020,53.668,111.918,53.649z" />
              </g>
            </svg>
              <span className="ml-3">Settings</span>
            </a>
          </li>
          <li onClick={()=>{setPage('logout')}}>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            
            >
              <path d="M10 17l-1.41-1.41L12.17 12H4v-2h8.17l-3.59-3.59L10 7l6 6-6 6zM20 3h-4V1h4c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2h-4v-2h4V3z" />
            </svg>
              <span className="ml-3">Log Out</span>
            </a>
          </li>
         
        </ul>
      </div>
      
    </aside>



    <main className="p-4 md:ml-64 h-auto pt-20">
          {page=="main"?(
            <div>
              <Chart/>
            </div>
          ):(<></>)}
          {page=="ranking"?(
            <div>
              <Ranking loggedInUserId={localStorage.getItem('user_id')} />
            </div>
          ):(<></>)}
          {page=="history"?(
            <div>
              
              <History userId={localStorage.getItem('user_id')}/>
            </div>
          ):(<></>)}
          {page=="settings"?(
            <div>
             
              <Settings userId={localStorage.getItem('user_id')}/>
            </div>
          ):(<></>)}
          {page=="addnew"?(
            <div>
             
              <AddNew/>
            </div>
          ):(<></>)}
          {page=="logout"?(
            <div>
             
              <LogOut/>
            </div>
          ):(<></>)}
    </main>
  </div>
    </div>
  )
}
