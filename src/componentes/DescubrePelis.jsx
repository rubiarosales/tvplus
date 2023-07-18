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

export default function DescubrePelis() {

    const [peliculas, setPeliculas] = useState([]);
    const urlImg = 'https://image.tmdb.org/t/p/original';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
        }
    };
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
        .then((response) => {
            setPeliculas(response.data.results);
        })
        .catch((error) => { console.log(error) });
    }, []);


    var settings = {
        arrows:false,
        dots: false,
        infinite: false,
        centerPadding: "60px",
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1674,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,

                }
            },
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 6,

                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };




    return (
        <div className='peliculas-container'>

            <h2 className='text-start mx-2'>Nuestras Películas</h2>
            <Slider {...settings} className='slider-peliculas'>

                {peliculas.map((pelicula) => (

                    <Card style={{ width: '18rem' }} key={pelicula.id} className='peliculas-card '>
                        <Card.Img variant="top" src={urlImg + pelicula.backdrop_path} className='m-auto' />
                      
                        <div className='options'>
                            <h3 className='icons'> <FaCirclePlus /></h3>
                            <h3 className='icons' > <Link className='text-decoration-none text-white text-center'to={`/detallepelis/${pelicula.id}`}><FaCirclePlay /></Link></h3>
                        </div>
                        
                    </Card>

                ))}
                 <Card style={{ width: '18rem' }} className='vermas-card'>
                 <Link className='text-decoration-none text-white text-center' to='/peliculas'><h3>Ver más</h3></Link>
                </Card>
            </Slider>
        </div>
    )
}
