import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig/Firebase';
import { useEffect } from 'react';


export const AuthContext = React.createContext();


//PARA NO TENER QUE IMPORTAR EN CADA COMPONENTE EL USE CONTEXT Y EL AUTHCONTEXT
export const useAuth = () => {
  const userContext = useContext(AuthContext);
  return userContext;
}

{/* SE PUEDE PONER UNA VALIDACION POR SI NO HAY CONTEXTO
If(!userContext) throw new Error('No hay Auth Provider')
*/}

export default function AuthProvider({ children }) {

  const [user,setUser] =useState(null);

  const registrar = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    //     console.log(user);
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //     // console.log(error)
    //     // console.log(errorCode);
    //     console.log(errorMessage)

    //    ;
    // });
  }

  const entrar = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const salir = () => signOut(auth);

  // const userAuth = auth.currentUser;
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])


  return (
    <AuthContext.Provider value={{ registrar, entrar , user , salir}}>
      {children}
    </AuthContext.Provider>
  )
}
