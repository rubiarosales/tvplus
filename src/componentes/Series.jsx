import { useState, useEffect } from 'react'
import axios from 'axios';
import React, { Component } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../estilos/peliculas.css';
import '../estilos/tv.css';
import '../index.css';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Form from 'react-bootstrap/Form';
import { AiFillHeart } from "react-icons/ai";

export default function Series() {

    const [tvseries, setTvseries] = useState([]);
    const [page, setPage] = useState(1);
    const [filtrado, setFiltrado] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const urlImg = 'https://image.tmdb.org/t/p/original';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
        }
    };

    const getTvSeries = (page) => {

        axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc`, options)
            .then((response) => {
                setTvseries(tvseries.concat(response.data.results));
                setPage(page + 1);
                setFiltrado(filtrado.concat(response.data.results));
                console.log("Se hizo un llamado a la API");
            })
            .catch((error) => { console.log(error) });

    }

    let filtro = (e) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBuscados = tvseries.filter((tv) => {
            if (tv.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return tv;
            }
        }
        )
        setFiltrado(resultadosBuscados);
    }

    useEffect(() => {
        getTvSeries(page);
    }, []);


    return (
        <div className='tv-container mt-2 scroll-infinito' id='scroll-infinito' >

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
             className='mx-auto'
                dataLength={tvseries.length}
                next={() => {
                    getTvSeries(page);
                }}
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
                <Form className="d-flex justify-content-center buscar-form">
                    <Form.Control
                        type="search"
                        placeholder="Buscar"
                        className="mt-2 mb-4"
                        aria-label="Search"
                        onChange={filtro}
                    />

                </Form>

                <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-1 m-auto d-flex justify-content-center">
                    
                    {filtrado.map((tv) => (
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
