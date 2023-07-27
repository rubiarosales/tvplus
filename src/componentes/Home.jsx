import React from 'react';
import Destacadas from './Destacadas';
import Recomendadas from './Recomendadas';
import DescubrePelis from './DescubrePelis';
import DescubreTV from './DescubreTV';
import Generos from './Generos';
import { useAuth } from './AuthContext';


export default function Home() {

    const {user} = useAuth();
    console.log(user)

    return (
        <div className='margen-sup'>
            <Destacadas/>
            <Recomendadas/>
            <DescubrePelis/>
            <DescubreTV/>
            <Generos/>
        </div>
    )
}
