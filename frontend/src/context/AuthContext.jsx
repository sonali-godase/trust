import React,{createContext,useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

const [user,setUser] = useState(null);

const login = (data)=>{
localStorage.setItem("token",data);
setUser(data);
}

const logout = ()=>{
localStorage.removeItem("token");
setUser(null);
}

return(

<AuthContext.Provider value={{user,login,logout}}>

{children}

</AuthContext.Provider>

)

}