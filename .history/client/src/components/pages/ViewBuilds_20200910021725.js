import React, { useState, useEffect } from 'react';
import BuildCard from "../BuildCard.js"
import Jumbo from '../Jumbo'
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));



export default function ImgMediaCard() {

    const classes = useStyles();

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };


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
                    <div className="card bg-dark text-white col-6">
                        <img className="card-img" src="https://images.mmorpg.com/images/heroes/news/43780.jpg" alt="Card image" />
                        <div className="card-img-overlay">
                            <div className="row d-flex">
                                <Chip className="" label="Stamina" size="small" color="primary" />
                                <Chip className="ml-auto" label="DPS" size="small" color="primary" />
                            </div>
                            <h4 className="card-title p-2">Stamden Frost</h4>
                            <h5 className="card-text">Warden</h5>
                            <h6 className="card-text">DPS</h6>
                            <div className="row">
                                <ShareIcon />
                                <StarIcon />
                                <EditIcon />
                            </div>


                        </div>

                    </div>
                </div>
            </div>



        </div>

    );
}