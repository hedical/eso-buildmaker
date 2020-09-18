import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/UserContext'
import homevideo from '../../utils/Homepage.mp4';
import Jumbo from '../Jumbo'
import BuildCard from '../BuildCard.js'


const Home = () => {

    const { userData, setUserData } = useContext(UserContext)
    const [builds, setBuilds] = useState([])

    const getAllBuilds = () => {
        axios.get(
            `http://localhost:5000/builds/allbuilds`,
            {
                headers: {
                    "x-auth-token": localStorage.getItem("auth-token")
                }
            })
            .then((builds) => {
                setBuilds(builds.data)
            })

    }

    useEffect(() => {
        getAllBuilds()
    }, [])

    return (
        <div>
            {userData.user
                ? <div>
                    <Jumbo text={"Last created builds"} />
                    <div className="row col-12">
                        {
                            builds.map((build) => (
                                <BuildCard build={build} key={build._id}></BuildCard>
                            )).reverse()
                        }
                    </div>
                </div>
                : <>
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
                    <h1 className="text-center text-white" style={{ bg: 'black' }}> Difficulties to keep track of your gears and builds?</h1>
                </>

            }


        </div >

    )
}

export default Home
