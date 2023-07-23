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


export default function Peliculas() {

    const [peliculas, setPeliculas] = useState([]);
    const [filtrado, setFiltrado] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [page, setPage] = useState(1);
    const urlImg = 'https://image.tmdb.org/t/p/original';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
        }
    };

    const getMovies = (page) => {

        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc`, options)
            .then((response) => {
                setPeliculas(peliculas.concat(response.data.results));
                setFiltrado(filtrado.concat(response.data.results));
                setPage(page + 1);
                console.log("Se hizo un llamado a la API");
            })
            .catch((error) => { console.log(error) });

    }
    let filtro = (e) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBuscados = peliculas.filter((pelicula) => {
            if (pelicula.title?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return pelicula;
            }
        }
        )
        setFiltrado(resultadosBuscados);
    }


    useEffect(() => {
        getMovies(page);
    }, []);


    return (
        <div className='peliculas-container scroll-infinito' id='scroll-infinito' >
            {/* <Form className="d-flex justify-content-center buscar-form">
                <Form.Control
                    type="search"
                    placeholder="Buscar"
                    className="mt-2 mb-4 "
                    aria-label="Search"
                    onChange={filtro}
                />

            </Form> */}
            <InfiniteScroll
                className='mx-auto '
                dataLength={filtrado.length}
                next={() => {
                    getMovies(page);
                    // filtro(busqueda);
                }}
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
                
                <Form className="d-flex justify-content-center buscar-form">
                    <Form.Control
                        type="search"
                        placeholder="Buscar"
                        className="mt-2 mb-4 "
                        aria-label="Search"
                        onChange={filtro}
                    />

                </Form>

                <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-1 m-auto d-flex justify-content-center">
                    {filtrado.map((pelicula) => (

                        pelicula.poster_path ?
                            <Col key={pelicula.id} className='m-auto d-flex justify-content-center'>
                                <Card style={{ width: '16rem' }} className='peliculas-card h-100'>
                                    <Card.Img variant="top" src={urlImg + pelicula.poster_path} className='m-auto' />

                                    <div className='options'>
                                        <h3 className='icons'> <FaCirclePlus /></h3>
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
