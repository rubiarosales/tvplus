import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import '../estilos/generos.css';


export default function Generos() {
    let generos = [];
    const [generosPelis, setGenerosPelis] = useState([]);
    const [generosTv, setGenerosTv] = useState([]);

generos =generosPelis.concat(generosTv);
console.log(generosPelis);
console.log(generosTv);
console.log(generos);

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
        slidesToShow: 6,
        speed: 500,
        responsive: [

            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  
                }
            },
            {
                breakpoint: 800,
                settings: {
                  slidesToShow: 4,
                  
                }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  
                }
            },
            {
                breakpoint: 400,
                settings: {
                  slidesToShow: 2,
                  
                }
            }

        ]
    };

    return (
        <div className='generos-container'>
            <h2 className='text-start mx-2'>Géneros</h2>
           <div>

            
           <Slider {...settings}>
                {generos.map((genero) => (
                    <div key={genero.id} className="genero-card d-flex align-items-center justify-content-center">
                        <h4>{genero.name}</h4>
                    </div>
                ))}
            </Slider>
            </div>
        </div>
    );
}

