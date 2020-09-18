import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/UserContext'
import homevideo from '../../utils/Homepage.mp4';
import Jumbo from '../Jumbo'
import { SnackbarProvider } from 'notistack';
import BuildCard from '../BuildCard.js'
import FilterButtons from '../FilterButton';



const Home = () => {

    const { userData, setUserData } = useContext(UserContext)
    const [builds, setBuilds] = useState([])
    const [searchClass, setSearchClass] = useState()

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

    // Definition of state for Input search
    const [search, setSearch] = useState({
        name: "",
    });

    // Function to update input state (based on user input)
    const buildSearch = (e) => {
        setSearch({ ...search, name: e.target.value });
    };

    const matchingBuilds = builds.filter(function (build) {
        if (search.name.length < 0) {
            return builds
        } else if (build.title.includes(search.name)) {
            return build
        }
    });

    // const classSearch = (classToChange) => {
    //     setSearchClass(classToChange)
    //     console.log("searchClass2", searchClass);
    // }

    const matchingClass = (searchedClass) => {
        console.log("searchedClass", searchedClass);
        builds.filter(function (build) {
            console.log("build.iclass", build.iclass);

            if (build.iclass.includes(searchedClass)) {
                setSearchClass("Warden")
                return build
            } else if (searchClass === searchedClass) {
                return builds
            }
        });


    }

    useEffect(() => {
        getAllBuilds()
    }, [])

    return (
        <div>
            {userData.user
                ? <div>
                    <Jumbo text={"Last created builds"} />
                    <FilterButtons text="Warden" id="Warden" click={(e) => {
                        matchingClass(e.target.id)
                        // classSearch("Warden")
                    }
                    } />
                    <form>
                        <div className="input-group">
                            <input
                                onChange={buildSearch}
                                type="text"
                                className="form-control ml-2 mr-2"
                                placeholder="Search by title" />
                        </div>
                    </form>
                    <SnackbarProvider maxSnack={3}>
                        <div className="row col-12">
                            {
                                matchingBuilds.map((build) => (
                                    <BuildCard build={build} key={build._id}></BuildCard>
                                )).reverse()
                            }
                        </div>
                    </SnackbarProvider>

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
