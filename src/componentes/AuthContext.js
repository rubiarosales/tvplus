import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebaseConfig/Firebase';
import { useEffect } from 'react';
import { collection, getDocs, getDoc,doc } from 'firebase/firestore';
import { dbCollections } from '../firebaseConfig/Collections';
import { db } from '../firebaseConfig/Firebase';

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

  //1. declaracion de variables de estado
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);

  //2. Referencia a la BD
  const userCollection = collection(db, "Usuarios");

  //3. Asincronismo con la bd (cRud)
  const getUsuarioById = async (id) => {
    if (user && user.uid) {
      console.log("Usuario válido:", user);
      const usuario = await getDoc(doc(db,dbCollections.Usuarios, id));
      setUserData(usuario.data());
    }
    console.log("No funciona getUsuario")
  }

  //4. UseEffect
  useEffect(() => {
    if(user && user.uid){
      getUsuarioById(user.uid)
    }
  }, [user])
  console.log(userData);

  const registrar = async (email, password) => {
    try {
      const datosUsuario = await createUserWithEmailAndPassword(auth, email, password);
      setUser(datosUsuario.user);
      return datosUsuario.user; // Devolver el usuario recién creado
    } catch (error) {
      throw error;
    }
  }

  // const cargarDatos = async (nombre) =>{
  //    try {

  //     if (user) {
  //       await updateProfile(user, {
  //         displayName: nombre

  //       });
  //       console.log("Datos cargados correctamente.");
  //     }else {
  //       console.log("No hay un usuario autenticado.");
  //     }

  //    } catch (error) {
  //     console.error("Error al cargar los datos:", error);
  //    }
  // }

  //
  const entrar = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);

  }

  const salir = () => {
    signOut(auth);
  }

  const recuperar = async (auth, email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  }



  //el unsubscribe es para que no quede la info en memoria
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);


  return (
    <AuthContext.Provider value={{ registrar, entrar, user, salir, recuperar, userData ,getUsuarioById}}>
      {children}
    </AuthContext.Provider>
  )
}
