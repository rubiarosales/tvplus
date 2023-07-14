import React from 'react';
import Destacadas from './Destacadas';
import Recomendadas from './Recomendadas';
import DescubrePelis from './DescubrePelis';
import DescubreTV from './DescubreTV';
import Generos from './Generos';


export default function Home() {
    return (
        <div>
            <Destacadas/>
            <Recomendadas/>
            <DescubrePelis/>
            <DescubreTV/>
            <Generos/>
        </div>
    )
}
