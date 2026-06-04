"use client"
import { createContext,useEffect,useState } from "react";
import axios from "axios";

export const dataContext = createContext(null as any)

function UserContextProvider({children}:any) {
  const [userData,setUserData] = useState(null);
  useEffect(() => {
    if(userData){
      return;
    }
    const fetchCurrUser = async () => {
      try {
        const result: any = await axios.get("/api/users/curr-user");
        setUserData(result.data.data)
      } catch (error: any) {
        console.log(error.response?.data?.message);
      }
    };

    fetchCurrUser();
  }, []);
  return (
    <div>
      <dataContext.Provider value={{ userData, setUserData }}>
      {children}
      </dataContext.Provider>
    </div>
  )
}

export default UserContextProvider;