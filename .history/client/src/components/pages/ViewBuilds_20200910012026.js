import React, { useState, useEffect } from 'react';
import BuildCard from "../BuildCard.js"
import Jumbo from '../Jumbo'
import '../../card.css'

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
            </div>

            <div id="wrapper">
                <article class="card" role="article">
                    <a href="#">
                        <div class="card-text">
                            <div class="card-meta">Architecture</div>
                            <h2 class="card-title">A Photographer’s Weekend House By General Design</h2>
                        </div>
                        <img class="card-image" src="http://www.ignant.de/wp-content/uploads/2016/02/Frederiksvej-Kindergarten_07_credit-Rasmus-Hjortsh%C3%B8j-COAST-Studio.jpg" />
                    </a>
                </article>
            </div>

        </div>

    );
}
