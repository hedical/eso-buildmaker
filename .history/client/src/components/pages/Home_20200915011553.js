import React from 'react'
import homevideo from '../../utils/Homepage.mp4';
import Jumbo from '../Jumbo'


const Home = () => {
    return (
        <div>
            <Jumbo text={"Home"} />
            <video className='videoTag' autoPlay loop muted>
                <source src={homevideo} type='video/mp4' />
            </video>
        </div>

    )
}

export default Home
