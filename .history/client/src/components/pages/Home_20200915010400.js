import React from 'react'
import homevideo from '../../utils/Homepage.mp4';


const Home = () => {
    return (
        <div>
            <video className='videoTag' autoPlay loop muted>
                <source src={homevideo} type='video/mp4' />
            </video>
        </div>

    )
}

export default Home
