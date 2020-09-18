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

            <div className="row">
                <div className="example-2 card">
                    <div className="wrapper">
                        <div className="header">
                            <div className="date">
                                <span className="day">12</span>
                                <span className="month">Aug</span>
                                <span className="year">2016</span>
                            </div>
                            <ul className="menu-content">
                                <li>
                                    <a href="#" className="fa fa-bookmark-o"></a>
                                </li>
                                <li><a href="#" className="fa fa-heart-o"><span>18</span></a></li>
                                <li><a href="#" className="fa fa-comment-o"><span>3</span></a></li>
                            </ul>
                        </div>
                        <div className="data">
                            <div className="content">
                                <span className="author">Jane Doe</span>
                                <h1 className="title"><a href="#">Stranger Things: The sound of the Upside Down</a></h1>
                                <p className="text">The antsy bingers of Netflix will eagerly anticipate the digital release of the Survive soundtrack, out today.</p>
                                <a href="#" className="button">Read more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
