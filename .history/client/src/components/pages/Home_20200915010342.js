import React from 'react'
import homevideo from '../../utils/Homepage.mp4';


const Home = () => {
    return (
        <h1>HELLO</h1>
        <video className='videoTag' autoPlay loop muted>
            <source src={homevideo} type='video/mp4' />
        </video>
    )
}

export default Home
