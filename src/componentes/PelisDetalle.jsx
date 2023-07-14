import React from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import Sugeridas from './Sugeridas';


export default function PelisDetalle() {
    {/*
  _onReady(event){
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      };
*/}

    const { id } = useParams();

// TRAER VIDEOS DE TMDB SEGUN ID SELECCIONADO

    const [videos, setVideos] = useState([]);
   

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzYzMDY2NjRmMmQ2ZWQ4ZTM0YWMyMjlmNjIxNDY5ZiIsInN1YiI6IjY0Njk0M2U1YzM1MTRjMDE3NDViZjZiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4scM_4bD4I3kPpJ-eKlrzcJvLhcyAHdZDFdBplamIzE'
            }
        };

        const getVideos = async () => {
            try {
              const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
              setVideos(response.data.results);
            } catch (error) {
              console.log(error);
            }
          };

        useEffect(() => {
            getVideos(id);
          
        }, [id]);

        let trailerOficial=[];
        if (videos && videos.length > 0) {
            trailerOficial = videos.filter((video) => video.name.includes("Official Trailer"));
            console.log(trailerOficial);
          }
        // console.log(trailerOficial);



// PARAMETROS PARA VISUALIZACIÓN DE VIDEOS
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };
        const optsSlider = {
            height: '200',
            width: '250',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 0,
            },
        };
        console.log(videos);

        var settings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1544,
                    settings: {
                      slidesToShow: 5,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: false,
                    }
                  },{
                    breakpoint: 1274,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: false,
                    }
                  },{
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: false,
                    }
                  },
                  {
                    breakpoint: 960,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 2,
                      initialSlide: 2
                    }
                  },{
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 2
                    }
                  },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };

          return (
            <div>
              {trailerOficial && trailerOficial.length > 0 ? (
                <YouTube videoId={trailerOficial[0].key} opts={opts} />
              ) : (
                // <YouTube videoId={videos[0].key} opts={opts} />
                <p>No se encontró el trailer oficial</p>

              )}
          
              {videos.length > 0 ? (
                <Slider {...settings} className='slider-videos'>
                  {videos.map((video) => (
                    <YouTube videoId={video.key} opts={optsSlider} />
                  ))}
                </Slider>
              ) : (
                <p>No se encontraron videos adicionales</p>
              )}

              <Sugeridas/>
            </div>
          );


}
