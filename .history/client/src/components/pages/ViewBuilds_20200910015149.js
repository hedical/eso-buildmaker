import React, { useState, useEffect } from 'react';
import BuildCard from "../BuildCard.js"
import Jumbo from '../Jumbo'

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
                    <div className="card bg-dark text-white col-4">
                        <img className="card-img" src="https://media.wired.com/photos/59328f9b5c4fbd732b5538e4/master/pass/eso-skyrim.jpg" alt="Card image" />
                        <div className="card-img-overlay">
                            <h4 className="card-title">Stamden Frost</h4>
                            <h5 className="card-text">Warden</h5>
                            <h6 className="card-text text-color-success">DPS</h6>
                            <h6 className="card-text">DPS</h6>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    );
}
