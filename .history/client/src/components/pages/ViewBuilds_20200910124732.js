import React, { useState, useEffect } from 'react';
import BuildCard from "../BuildCard.js"
import Jumbo from '../Jumbo'
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';

import axios from 'axios';







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
    }, [])

    return (
        <div>
            <Jumbo text={"My Builds"} />
            <div className="container">
                <div className="row">
                    {
                        userBuilds.map((build, id) => (
                            <BuildCard key={id}>{build}</BuildCard>
                        ))
                    }
                </div>
                <div className="row">

                </div>
            </div>



        </div>

    );
}
