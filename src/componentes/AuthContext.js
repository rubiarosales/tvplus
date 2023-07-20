import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
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
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error; 
    }
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

  const cargarDatos = async (nombre) =>{
     try {
      
      if (user) {
        await updateProfile(user, {
          displayName: nombre
          
        });
        console.log("Datos cargados correctamente.");
      }else {
        console.log("No hay un usuario autenticado.");
      }
      
     } catch (error) {
      console.error("Error al cargar los datos:", error);
     }
  }
  const entrar = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    
  }

  const salir = () => signOut(auth);

  // const userAuth = auth.currentUser;

  //el unsubscribe es para que no quede la info en memoria
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);


  return (
    <AuthContext.Provider value={{ registrar, entrar , user , salir, cargarDatos}}>
      {children}
    </AuthContext.Provider>
  )
}