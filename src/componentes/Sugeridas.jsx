import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

export default function Sugeridas() {

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
              const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options);
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
    
                <h2 className='text-start mx-2'>También te puede gustar</h2>
                <Slider {...settings} className='slider-recomendadas'>
    
                    {sugerencias.map((sugerida) => (
    
                        <Card style={{ width: '18rem' }} key={sugerida.id} className='recomendadas-card '>
                            <Card.Img variant="top" src={urlImg + sugerida.poster_path} className='m-auto' />
    
                            <div className='options'>
                                <h3 className='icons'> <FaCirclePlus /></h3>
                                <h3 className='icons' > <Link to={`/detallepelis/${sugerida.id}`}><FaCirclePlay /></Link></h3>
                            </div>
    
                        </Card>
    
                    ))}
                    <Card style={{ width: '18rem' }} className='vermas-card'>
                        <h3>Ver más</h3>
                    </Card>
                </Slider>
            </div>
        )
}
