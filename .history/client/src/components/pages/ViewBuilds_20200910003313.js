import React, { useState, useEffect } from 'react';
import BuildCard from "../BuildCard.js"

import axios from 'axios';




export default function ImgMediaCard() {

    const [userBuilds, setUserBuilds] = useState()
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
        <BuildCard
            title={userBuilds.title}
        />

    );
}
