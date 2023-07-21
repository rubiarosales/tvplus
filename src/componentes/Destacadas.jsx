import { useState, useEffect } from 'react'
import axios from 'axios';
import React, { Component } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../estilos/destacadas.css';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Destacadas() {

  const [pelis, setPelis] = useState([]);
  const urlImg = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    getMovies();
    console.log(pelis);
  }, []);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
    }
  };

  function getMovies() {
    axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then((response) => {
        setPelis(response.data.results);

      })
      .catch((error) => { console.log(error) });
  }

  console.log(pelis);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (

    <Slider {...settings}>

      {pelis.map((peli) => (
        <Col key={peli.id}>
          <Card className='h-100 peli-card-container' >
            <Card.Img className='peli-card' variant="top" src={urlImg + peli.backdrop_path} alt={peli.title} />
            <div className='destacadas-info position-absolute'>
              <h2 className=' destacadas-title'>{peli.title}</h2>
              <p className='destacadas-resumen'>{peli.overview}</p>
            </div>
            <div className='dest-options'>
            <h3 className='dest-icons'> <FaCirclePlus/></h3>
            <h3 className='dest-icons' > <Link className=' text-center'to={`/detallepelis/${peli.id}`}><FaCirclePlay /></Link></h3>
            </div>
          </Card>
        </Col>
      ))}

    </Slider>


  )
}
