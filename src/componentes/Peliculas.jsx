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
import '../index.css';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import {Link} from 'react-router-dom';

export default function Peliculas() {

    const [peliculas, setPeliculas] = useState([]);
    const [page, setPage] = useState(0);
    const urlImg = 'https://image.tmdb.org/t/p/original';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
        }
    };
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options)
        .then((response) => {
            setPeliculas(response.data.results);
        })
        .catch((error) => { console.log(error) });
    }, [page]);


    return (
        <div className='peliculas-container mt-2'>

            
            <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-1 m-auto d-flex justify-content-center">
                {peliculas.map((pelicula) => (
                    <Col key={pelicula.id} className='m-auto d-flex justify-content-center'>
                    <Card style={{ width: '16rem' }}  className='peliculas-card '>
                        <Card.Img variant="top" src={urlImg + pelicula.poster_path} className='m-auto' />
                      
                        <div className='options'>
                            <h3 className='icons'> <FaCirclePlus /></h3>
                            <h3 className='icons' > <Link to={`/detallepelis/${pelicula.id}`}><FaCirclePlay /></Link></h3>
                        </div>
                        
                    </Card>
                    </Col>
                ))}


                 {/* <Card style={{ width: '18rem' }} className='vermas-card'>
                    <h3>Ver más</h3>
                </Card> */}
      </Row>
        </div>
    )
}
