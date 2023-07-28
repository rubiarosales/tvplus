import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebaseConfig/Firebase';
import { useEffect } from 'react';
import { collection, arrayRemove , getDoc,doc,updateDoc } from 'firebase/firestore';
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
  const [favs, setFavs] = useState([]);
  const [nuevoFav, setNuevoFav] = useState([]);

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

// OJO OJO OJO OJO 
  //CORREGIR VALIDACION PARA QUE NO REPITA Y AGREGAR SWEET ALERT
  const agregarFav = async(id) => {
    if(user){
    if(favs.includes(id)){
      console.log("Ya esta en tu lista")
    }else{
      const nuevosFavs = [...favs, id]; // Almacena el estado actualizado en una variable
      setFavs(nuevosFavs);
     try {
      const usuario = doc(db, dbCollections.Usuarios, user.uid)
    const dataFav={
        Favoritos : nuevosFavs
        // Favoritos : favs.push(nuevoFav)
    }

   //El merge es porque me estaba sobreescribiendo y me volvia
        await updateDoc(usuario,dataFav, { merge: true })
    } catch (error) {
        console.log(error);
    }
    }
    }
}

const eliminarFav = async (id) => {
  if (user) {
    // Crea una referencia al documento del usuario
    const usuarioRef = doc(db, dbCollections.Usuarios, user.uid);

    // Actualiza el campo "Favoritos" utilizando FieldValue.arrayRemove()
    try {
      await updateDoc(usuarioRef, {
        Favoritos: arrayRemove(id),
      });
    } catch (error) {
      console.log(error);
    }
  }
};
  //el unsubscribe es para que no quede la info en memoria
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);


  return (
    <AuthContext.Provider value={{ registrar, entrar, user, salir, recuperar, userData ,getUsuarioById, agregarFav,eliminarFav}}>
      {children}
    </AuthContext.Provider>
  )
}
