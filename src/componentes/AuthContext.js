import React, { useState } from 'react';



export const UserContext = React.createContext();

export default function AuthProvider({children}) {



const user = {
    login: true
}

  return (
    <UserContext.Provider value={{user}}>
        {children}
    </UserContext.Provider>
  )
}
