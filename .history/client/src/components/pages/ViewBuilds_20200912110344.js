import React, { useState, useEffect } from 'react';
import BuildCard from "../BuildCard.js"
import { useHistory } from 'react-router-dom'
import Jumbo from '../Jumbo'

import axios from 'axios';







export default function ImgMediaCard() {



    const [userBuilds, setUserBuilds] = useState([])
    const [selectedBuild, setSelectedBuild] = useState()
    const history = useHistory()

    const selectBuild = (build) => {

        setSelectedBuild(build._id)
        // history.push(`/${build._id}`);
    }

    const getAllBuilds = async () => {
        await axios
            .get(`http://localhost:5000/builds/all`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
            .then((allBuilds) => {
                setUserBuilds(allBuilds.data)
            })
    }

    useEffect(() => {
        getAllBuilds()
    }, [])

    return (
        <div>
            <Jumbo text={"My Builds"} action="Create a new build" link="/create-build" />
            <div className="container">
                <div className="row">
                    {
                        userBuilds.map((build, id) => (
                            <BuildCard key={id}>{build}</BuildCard>
                        ))
                    }
                </div>
            </div>



        </div>

    );
}
