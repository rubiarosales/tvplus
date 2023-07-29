import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc, collection } from "firebase/firestore";
import { dbCollections } from '../firebaseConfig/Collections';
import { useAuth } from './AuthContext';
import { db } from '../firebaseConfig/Firebase';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../estilos/peliculas.css';
import '../index.css';
import '../App.css';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AiFillHeart } from "react-icons/ai";
import Swal from 'sweetalert2';


export default function Favoritos() {
    const urlImg = 'https://image.tmdb.org/t/p/original';

    //1. Declarar variables de estado
    const [favs, setFavs] = useState([]);
    const [favInfo, setFavInfo] = useState([]);

    //llamo el usuario actual desde el AuthContext
    const { user, userData, getUsuarioById,eliminarFav ,} = useAuth();

    //2. Referencia a la BBDD
    // const usuariosCollection = collection (db,"Usuarios");
    const userRef = doc(db, "Usuarios", user.uid)
    // doc(db, dbCollections.Usuarios, id);
    // const userDoc = getDoc(userRef);

    //3. Asincronismo con BBDD
    const getFavs = async () => {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            setFavs(userDoc.data().Favoritos)
            console.log(favs)
        } else {
            console.log("No tiene favoritos o hubo un error")
        }
    }

    // const agregarFav = async(id) => {
    //     setNuevoFav(id)
    //     const usuario = doc(db, dbCollections.Usuarios, user.uid)
    //     const dataFav={
    //         Favoritos : favs.push(nuevoFav)
    //     }

    //     try {
    //         await updateDoc(usuario,dataFav)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    //LLAMADO A LA api PARA TRAER DETALLES DE FAVORITOS
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
        }

    };
    console.log(favs)


    const getFavInfo = async (favs) => {
        if (favs) {
            try {

                const favPromises = favs.map((fav) =>
                    axios.get(`https://api.themoviedb.org/3/movie/${fav}?language=es-ES'`, options)
                );

                const responses = await Promise.all(favPromises);

                // Mapear las respuestas para obtener la información de las películas favoritas
                const favInfo = responses.map((response) => response.data);
                console.log(favInfo);

                return favInfo;
            } catch (error) {
                console.log(error);
            }
        }
    };

    const confirmEliminarFav =(id)=>{
   
        Swal.fire({
          title: '¿Estás seguro de eliminar este favorito?',
          text: "No podrás volver atrás",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórralo!'
        }).then(async (result) => {
          if (result.isConfirmed) {
           await eliminarFav(id);
        
            Swal.fire(
              'Eliminado!',
              'Tu favorito fue eliminado',
              'success'
            )
            getFavs();
          }
        })
        }


    console.log(favInfo);

    //Traer fav de la BBDD
    useEffect(() => {
        getFavs();
        // getFavInfo();
    }, [])

    //Obteniendo la info de los favs en un array favInfo
    useEffect(() => {

        getFavInfo(favs)
            .then((favInfoData) => {
                setFavInfo(favInfoData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [favs]);

    return (
        <div>
            {favs?
            favs.length > 0 ?
            <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-1 m-auto d-flex justify-content-center">
                {favInfo.map((fav) => (

                    fav.poster_path ?
                        <Col key={fav.id} className='m-auto d-flex justify-content-center'>
                            <Card style={{ width: '16rem' }} className='peliculas-card h-100 '>
                                <Card.Img variant="top" src={urlImg + fav.poster_path} className='m-auto' />

                                <div className='options d-flex align-items-center'>
                                    {/* <h3 className='icons'> <FaCirclePlus /></h3> */}
                                    <h3 className=' icons'
                                    onClick={()=>{
                                        confirmEliminarFav(fav.id);
                                        // getFavs();
                                        }}>
                                        <FaTrashCan />
                                    </h3 >
                                    <h3 className=' icons ' > <Link className='text-decoration-none text-white text-center' to={`/detallepelis/${fav.id}`}><FaCirclePlay /></Link></h3>
                                    

                                </div>
                                <Card.Title className='text-center'>{fav.title}</Card.Title>

                                <Card.Text className='fs-6 text-end p-1'>
                                    <AiFillHeart /> {fav.vote_average}/10

                                </Card.Text>


                            </Card>

                        </Col>
                        :
                        console.log(`No hay imagen disponible de ${fav.title}`)
                ))}
            </Row>
            :
            <p className='fs-4 text-center text-white'>Aun no tienes Favoritos</p>
        :
        <p className='fs-4 text-center text-white'>Aun no tienes Favoritos</p>}



        </div>
    )
}
