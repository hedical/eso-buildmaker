import React, { useState, useEffect } from 'react';
import BuildCard from "../BuildCard.js"
import Jumbo from '../Jumbo'

import axios from 'axios';
import { set } from 'mongoose';







export default function ImgMediaCard() {



    const [userBuilds, setUserBuilds] = useState([])


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
        setUserBuilds(build)
    }, [build])

    return (
        <div>
            <Jumbo text={`My Builds (${userBuilds.length})`} action="Create a new build" link="/create-build" />
            <div className="container">
                <div className="row">
                    {
                        userBuilds.map((build, id) => (
                            <BuildCard key={id}>{build}</BuildCard>
                        )).reverse()
                    }
                </div>
            </div>



        </div >

    );
}
