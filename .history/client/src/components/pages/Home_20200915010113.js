import React from 'react'
import homevideo from '../../utils/Homepage';


const Home = () => {
    return (
        <video className='videoTag' autoPlay loop muted>
            <source src={homevideo} type='video/mp4' />
        </video>
    )
}

export default Home
