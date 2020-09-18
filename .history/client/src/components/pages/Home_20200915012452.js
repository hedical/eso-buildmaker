import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import homevideo from '../../utils/Homepage.mp4';
import Jumbo from '../Jumbo'


const Home = () => {

    const { userData, setUserData } = useContext(UserContext)
    return (
        <div>
            {userData.user
                ? <Jumbo text={"Last created builds"} />
                : <video className='videoTag' autoPlay loop muted
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
                <h1 className="text-center text-white" style={{ bg: 'black' }}> Difficulties to keep track of your gears and builds?</h1>
        }


        </div >

    )
}

export default Home
