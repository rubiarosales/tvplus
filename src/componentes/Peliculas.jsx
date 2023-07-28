import { useState, useEffect } from 'react'
import axios from 'axios';
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../estilos/peliculas.css';
import '../index.css';
import '../App.css'
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiFillHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useAuth } from './AuthContext';

export default function Peliculas() {

  const { user, userData, agregarFav } = useAuth();
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, SetBusqueda] = useState("");
  const [page, setPage] = useState(1);
  const urlImg = 'https://image.tmdb.org/t/p/original';
  const apiKey = "936306664f2d6ed8e34ac229f621469f";

  // const options = {
  //     method: 'GET',
  //     headers: {
  //         accept: 'application/json',
  //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
  //     }

  // };

  // const getMovies = async (page, busqueda) => {
  //     let fetchUrl = busqueda ?
  //         `https://api.themoviedb.org/3/search/movie?include_adult=false&language=es-ES&page=${page}&query=${busqueda}`
  //         :
  //         `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=es-ES&page=${page}`

  //     await axios.get(fetchUrl, {
  //         params: {
  //             api_key: apiKey,
  //         }
  //     })
  //         // axios.get(fetchUrl, options)
  //         .then((response) => {
  //             // setPeliculas([]);
  //             setPage(page + 1);
  //             setPeliculas(peliculas.concat(response.data.results));
  //             // setPeliculas(response.data.results);

  //             console.log("Se hizo un llamado a la API");
  //             return response.data.results;
  //         })
  //         .catch((error) => { console.log(error) });
  //     console.log(fetchUrl)
  //     console.log(busqueda)
  // }


  // const buscar = async (e) => {
  //     e.preventDefault();
  //     if (busqueda) {
  //         // setPeliculas([]);
  //         setPage(1);
  //         console.log(page);
  //         await getMovies(page, busqueda);
  //     }
  // };

  const getMovies = async (page, busqueda) => {
    let fetchUrl = busqueda
      ? `https://api.themoviedb.org/3/search/movie?include_adult=false&language=es-ES&page=${page}&query=${busqueda}`
      : `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=es-ES&page=${page}`;

    try {
      const response = await axios.get(fetchUrl, {
        params: {
          api_key: apiKey,
        },
      });

      // Si es la primera página, reemplazamos el estado
      if (page === 1) {
        setPeliculas(response.data.results);
      } else {
        // Si es una página posterior, concatenamos los resultados
        setPeliculas((prevPeliculas) => [...prevPeliculas, ...response.data.results]);
      }

      console.log("Se hizo un llamado a la API");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const buscar = async (e) => {
    e.preventDefault();
    setPeliculas([]);
    setPage(1);

    try {
      await getMovies(1, busqueda);
      console.log("funciona buscar");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    try {
      await getMovies(nextPage, busqueda);
      setPage(nextPage);
      console.log("Cargando más películas...");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getMovies(1, busqueda);
  }, []);


  return (
    <div className='peliculas-container scroll-infinito margen-sup' id='scroll-infinito' >

      <InfiniteScroll
        className='mx-auto'
        dataLength={peliculas.length}
        // next={() => {
        //     getMovies(page, busqueda);
        // }}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Cargando...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Parece que has llegado al final</b>
          </p>
        }
      // below props only if you need pull down functionality
      // refreshFunction={this.refresh}
      // pullDownToRefresh
      // pullDownToRefreshThreshold={50}
      // pullDownToRefreshContent={
      //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
      // }
      // releaseToRefreshContent={
      //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
      // }
      >

        <Form
          className="d-flex justify-content-center buscar-form align-items-baseline"
        // onSubmit={buscar}
        >
          <Form.Control
            type="search"
            placeholder="Buscar"
            className="mt-2 mb-4 "
            aria-label="Search"
            onChange={(e) => { SetBusqueda(e.target.value) }}
          />
          <Button
            variant="outline-light"
            onClick={buscar}
            className='btn-buscar mx-1'
          ><FiSearch /></Button>

        </Form>

        <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-1 m-auto d-flex justify-content-center">
          {peliculas.map((pelicula) => (

            pelicula.poster_path ?
              <Col key={pelicula.id} className='m-auto d-flex justify-content-center'>
                <Card style={{ width: '16rem' }} className='peliculas-card h-100'>
                  <Card.Img variant="top" src={urlImg + pelicula.poster_path} className='m-auto' />

                  <div className='options'>
                    <h3 className='icons'
                      onClick={() => agregarFav(pelicula.id)}
                    > <FaCirclePlus /></h3>
                    <h3 className='icons ' > <Link className='text-decoration-none text-white text-center' to={`/detallepelis/${pelicula.id}`}><FaCirclePlay /></Link></h3>

                  </div>
                  <Card.Title className='text-center'>{pelicula.title}</Card.Title>
                  <Card.Text className='fs-6 text-end'>
                    <AiFillHeart /> {pelicula.vote_average}/10

                  </Card.Text>
                </Card>

              </Col>
              :
              console.log(`No hay imagen disponible de ${pelicula.title}`)
          ))}
        </Row>

      </InfiniteScroll>
    </div>
  )
}
