import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function TvSugeridas() {

    const { id } = useParams();
    const urlImg = 'https://image.tmdb.org/t/p/w500';
    // TRAER RECOMENDACIONES DE TMDB SEGUN ID SELECCIONADO

    const [sugerencias, setSugerencias] = useState([]);


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
        }
    };

    const getSugerencias = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`, options);
            setSugerencias(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSugerencias(id);
    }, [id]);


    var settings = {
        dots: false,
        arrows: false,
        speed: 300,
        slidesToShow: 6,
        swipeToSlide: true,
        // slidesToScroll: 6,
        // initialSlide: 0,
        responsive: [
            {
                breakpoint: 1544,
                settings: {
                    slidesToShow: 5,
                    swipeToSlide: true,
                    // slidesToScroll: 5,
                    dots: false,
                    arrows: false,
                }
            }, {
                breakpoint: 1274,
                settings: {
                    slidesToShow: 4,
                    // slidesToScroll: 4,
                    swipeToSlide: true,
                    dots: false,
                    arrows: false,
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    // slidesToScroll: 4,
                    swipeToSlide: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    swipeToSlide: true,
                    // slidesToScroll: 3,
                    // initialSlide: 2,
                    dots: false,
                    arrows: false,
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    swipeToSlide: true,
                    // slidesToScroll: 2,
                    // initialSlide: 2,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    // slidesToScroll: 1
                    swipeToSlide: true,
                    dots: false,
                    arrows: false,
                }
            }
        ]
    };

    return (
        <div className='recomendadas-container'>

            <h2 className='text-start mx-2'>También te puede gustar</h2>
            <Slider {...settings} className='slider-recomendadas'>

                {sugerencias.map((sugerida) => (

                    <Card style={{ width: '18rem' }} key={sugerida.id} className='recomendadas-card'>
                        <Card.Img variant="top" src={urlImg + sugerida.poster_path} className='m-auto h-100' />

                        <div className='options'>
                            <h3 className='icons'> <FaCirclePlus /></h3>
                            <h3 className='icons' > <Link className='text-decoration-none text-white text-center' to={`/detalletv/${sugerida.id}`}><FaCirclePlay /></Link></h3>
                        </div>

                    </Card>

                ))}
                <Card style={{ width: '18rem' }} className='vermas-card'>
                <Link className='text-decoration-none text-white text-center' to='/seriestv'><h3>Ver más</h3></Link>
                </Card>
            </Slider>
        </div>
    )
}
