import { useState, useEffect } from 'react'
import axios from 'axios';
import React, { Component } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../estilos/recomendadas.css';
import '../estilos/destacadas.css';
import '../index.css';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Recomendadas() {

    const [recomendadas, setRecomendadas] = useState([]);
    const urlImg = 'https://image.tmdb.org/t/p/w500';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
        }
    };
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=1', options)
            .then((response) => {
                setRecomendadas(response.data.results);
            })
            .catch((error) => { console.log(error) });
    }, []);


    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1674,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };




    return (
        <div className='recomendadas-container'>

            <h2 className='text-start mx-2'>Recomendadas para vos</h2>
            <Slider {...settings} className='slider-recomendadas'>

                {recomendadas.map((recomendada) => (

                    <Card style={{ width: '18rem' }} key={recomendada.id} className='recomendadas-card '>
                        <Card.Img variant="top" src={urlImg + recomendada.poster_path} className='m-auto' />

                        <div className='options'>
                            <h3 className='icons'> <FaCirclePlus /></h3>
                            <h3 className='icons' > <Link className='text-decoration-none text-white text-center'to={`/detallepelis/${recomendada.id}`}><FaCirclePlay /></Link></h3>
                        </div>

                    </Card>

                ))}
                <Card style={{ width: '18rem' }} className='vermas-card'>
                <Link className='text-decoration-none text-white text-center'to='/peliculas'><h3>Ver más</h3></Link>
                </Card>
            </Slider>
        </div>
    )
}
