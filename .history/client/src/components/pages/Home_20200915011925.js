import React from 'react'
import homevideo from '../../utils/Homepage.mp4';
import Jumbo from '../Jumbo'


const Home = () => {
    return (
        <div>
            {/* <Jumbo text={"Home"} /> */}
            <video className='videoTag' autoPlay loop muted
                style={{
                    position: 'absolute',
                    width: '100%',
                    left: '50%',
                    top: '50%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '-1',
                }}>
                <source src={homevideo} type='video/mp4' />
            </video>
        </div>

    )
}

export default Home
