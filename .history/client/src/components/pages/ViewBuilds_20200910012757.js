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

            <div class="example-2 card">
                <div class="wrapper">
                    <div class="header">
                        <div class="date">
                            <span class="day">12</span>
                            <span class="month">Aug</span>
                            <span class="year">2016</span>
                        </div>
                        <ul class="menu-content">
                            <li>
                                <a href="#" class="fa fa-bookmark-o"></a>
                            </li>
                            <li><a href="#" class="fa fa-heart-o"><span>18</span></a></li>
                            <li><a href="#" class="fa fa-comment-o"><span>3</span></a></li>
                        </ul>
                    </div>
                    <div class="data">
                        <div class="content">
                            <span class="author">Jane Doe</span>
                            <h1 class="title"><a href="#">Stranger Things: The sound of the Upside Down</a></h1>
                            <p class="text">The antsy bingers of Netflix will eagerly anticipate the digital release of the Survive soundtrack, out today.</p>
                            <a href="#" class="button">Read more</a>
                        </div>
                    </div>
                </div>
            

    );
}
