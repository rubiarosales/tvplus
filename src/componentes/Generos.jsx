import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import '../estilos/generos.css';


export default function Generos() {
    const [generosPelis, setGenerosPelis] = useState([]);
    const [generosTv, setGenerosTv] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
        }
    };
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?language=es', options)
            .then((response) => {
                setGenerosPelis(response.data.genres);

            })
            .catch((error) => { console.log(error) });
    }, []);
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/genre/tv/list?language=es', options)
            .then((response) => {
                setGenerosTv(response.data.genres);

            })
            .catch((error) => { console.log(error) });
    }, []);


   

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        arrows: false,
        slidesToShow: 3,
        speed: 500
    };

    return (
        <div className='generos-container'>
            <h2 className='text-start mx-2'>Géneros</h2>
           <div>

            
           <Slider {...settings}>
                {generosPelis.map((generoPeli) => (
                    <div key={generoPeli.id} className="genero-card d-flex align-items-center justify-content-center">
                        <h3>{generoPeli.name}</h3>
                    </div>
                ))}
            </Slider>
            </div>
            <Slider {...settings}>
                
                 {generosTv.map((generoTv) => (
                    <div key={generoTv.id} className="genero-card d-flex align-items-center justify-content-center">
                        <h3>{generoTv.name}</h3>
                    </div>
                ))}

            </Slider>
        </div>
    );
}

