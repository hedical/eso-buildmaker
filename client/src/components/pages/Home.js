import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/UserContext'
import homevideo from '../../utils/Homepage.mp4';
import Jumbo from '../Jumbo'
import { SnackbarProvider } from 'notistack';
import BuildCard from '../BuildCard.js'
import FilterButtons from '../FilterButton';
import { Link } from 'react-router-dom'




const Home = () => {

    const { userData, setUserData } = useContext(UserContext)
    const [builds, setBuilds] = useState([])
    // const [users, setUsers] = useState([])

    const getAllBuilds = () => {
        axios.get(
            `/builds/allbuilds`,
            {
                headers: {
                    "x-auth-token": localStorage.getItem("auth-token")
                }
            })
            .then((builds) => {
                setBuilds(builds.data)
            })

    }

    //For future implementation, add username on cards
    // const getUsernames = () => {
    //     axios
    //         .get(`/users/all`,
    //             {
    //                 headers: {
    //                     "x-auth-token": localStorage.getItem("auth-token")
    //                 }
    //             })
    //         .then((usersInfo) => {
    //             setUsers(usersInfo.data)
    //             console.log(users.data);
    //         })
    // }

    // Definition of state for Input search
    const [search, setSearch] = useState({
        name: "",
    });

    // Function to update input state (based on user input)
    const buildSearch = (e) => {
        setSearch({ ...search, name: e.target.value });
    };
    const matchingBuilds = builds.filter(function (build) {
        console.log(builds);
        if (search.name.length < 0) {
            return builds
        } else if (build.title.includes(search.name)) {
            return build
        }
    });


    useEffect(() => {
        getAllBuilds()
        // getUsernames()
    }, [])


    return (
        <div>
            {userData.user
                ? <div>
                    <Jumbo text={"Last created builds"} comment="Created by the community" />
                    <form>
                        <div className="input-group">
                            <input
                                onChange={buildSearch}
                                type="text"
                                className="form-control ml-4 mr-4"
                                placeholder="Search by title" />
                        </div>
                    </form>
                    <SnackbarProvider maxSnack={3}>
                        <div className="row col-md-auto justify-content-center">
                            {
                                matchingBuilds.map((build) => (
                                    <BuildCard noEdit="yes" build={build} key={build._id}></BuildCard>
                                )).reverse()
                            }
                        </div>
                    </SnackbarProvider>

                </div>
                : <div className="container">
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
                    <div className="mt-5 row justify-content-md-center">
                        <h1 className="text-center text-white" style={{ bg: 'black' }}> Difficulties to keep track of your gears and builds?</h1>
                    </div>
                    <div className="mt-5 row justify-content-md-center">
                        <Link className="btn btn-light text-dark" to="/register">Create an Account</Link>
                    </div>
                </div>

            }


        </div >

    )
}

export default Home
