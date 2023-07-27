import { useState, useEffect } from 'react'
import axios from 'axios';
import React, { Component } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../estilos/peliculas.css';
import '../estilos/tv.css';
import '../index.css';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Form from 'react-bootstrap/Form';
import { AiFillHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

export default function Series() {

    const [tvSeries, setTvSeries] = useState([]);
    const [busqueda, SetBusqueda] = useState("");
    const [page, setPage] = useState(1);
    const urlImg = 'https://image.tmdb.org/t/p/original';
    const apiKey = "936306664f2d6ed8e34ac229f621469f";

    //     method: 'GET',
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
    //     }

    // };

    // const getTvSeries = async (page, busqueda) => {
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
    //             // setTvSeries([]);
    //             setPage(page + 1);
    //             setTvSeries(peliculas.concat(response.data.results));
    //             // setTvSeries(response.data.results);
                
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
    //         // setTvSeries([]);
    //         setPage(1);
    //         console.log(page);
    //         await getTvSeries(page, busqueda);
    //     }
    // };

    const getTvSeries = async (page, busqueda) => {
        let fetchUrl = busqueda
          ? `https://api.themoviedb.org/3/search/tv?include_adult=false&language=es-ES&page=${page}&query=${busqueda}`
          : `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-ES&page=${page}`;
    
        try {
          const response = await axios.get(fetchUrl, {
            params: {
              api_key: apiKey,
            },
          });
    
          // Si es la primera página, reemplazamos el estado
          if (page === 1) {
            setTvSeries(response.data.results);
          } else {
            // Si es una página posterior, concatenamos los resultados
            setTvSeries((prevSeries) => [...prevSeries, ...response.data.results]);
          }
          
          console.log("Se hizo un llamado a la API");
        } catch (error) {
          console.log(error);
          throw error;
        }
      };

      const buscar = async (e) => {
        e.preventDefault();
        setTvSeries([]);
        setPage(1);
    
        try {
          await getTvSeries(1, busqueda);
          console.log("funciona buscar");
        } catch (error) {
          console.log(error);
        }
      };
      const fetchMoreData = async () => {
        const nextPage = page + 1;
        try {
          await getTvSeries(nextPage, busqueda);
          setPage(nextPage);
          console.log("Cargando más series...");
        } catch (error) {
          console.log(error);
        }
      };
    

    useEffect(() => {
        getTvSeries(1, busqueda);
    }, []);


    return (
        <div className='tv-container scroll-infinito margen-sup' id='scroll-infinito' >



            <InfiniteScroll
             className='mx-auto'
                dataLength={tvSeries.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Cargando...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
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
                    ><FiSearch/></Button>

                </Form>

                <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-1 m-auto d-flex justify-content-center">
                    
                    {tvSeries.map((tv) => (
                        tv.poster_path ?
                            <Col key={tv.id} className='m-auto d-flex justify-content-center'>
                                <Card style={{ width: '16rem' }} className='peliculas-card '>
                                    <Card.Img variant="top" src={urlImg + tv.poster_path} className='m-auto' />

                                    <div className='options'>
                                        <h3 className='icons'> <FaCirclePlus /></h3>
                                        <h3 className='icons' > <Link to={`/detalletv/${tv.id}`}><FaCirclePlay /></Link></h3>
                                    </div>
                                    <Card.Title className='text-center'>{tv.name}</Card.Title>
                                    <Card.Text className='fs-6 text-end'>
                                        <AiFillHeart /> {tv.vote_average}/10

                                    </Card.Text>

                                </Card>
                            </Col>
                            :
                            console.log(`No hay imagen disponible de ${tv.title}`)
                    ))}
                </Row>

            </InfiniteScroll>
        </div>
    )
}
