import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import ReactTooltip from "react-tooltip";


const ViewOneBuild = () => {

    const params = useParams("/build/:id")
    const [build, setBuild] = useState({ gears: [] })
    const [gears, setGears] = useState([])

    const getBuildInfo = async () => {
        const mybuild = await axios
            .get(`http://localhost:5000/builds/${params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
        const allInfo = await mybuild.data
        setBuild(allInfo)
        gearsMap(allInfo)
        // console.log("mapping :", ...mapping);
        // setGears(...mapping)
        // setGears((gears => [{ ...gears }, mapping]))
        // (searches => [...searches, query])

    }

    const gearsMap = (build) => {
        let myGears = {}
        console.log("original :", build);
        build.gears.map((gear) => {
            let gearsIn = {}
            gearsIn[gear.piece] = gear
            myGears = { ...{ myGears }, ...[gearsIn] }
            console.log("gearsIn : ", [gearsIn]);

        })
        console.log("myGears : ", { ...myGears });
        setGears({ ...myGears }, { ...gears });
    }

    useEffect(() => {
        getBuildInfo()
    }, [])

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
        customWidth: {
            maxWidth: 500,
        },
        noMaxWidth: {
            maxWidth: 'none',
        },
    }));

    const classes = useStyles();



    return (
        <div>
            <Jumbo text={build.title} action={build.race} link="" />


            < div className="container" >

                <div className="row col-9 offset-1 mb-1">
                    <div className="card-group col-2">


                        <a data-tip data-for='head'> <img data-tip data-for="head" src={require('../../utils/images/head.png')} className="card-img" alt={""} /></a>
                        <ReactTooltip id='head' type='error'>
                            <span>{gears.head}</span>
                        </ReactTooltip>
                    </div>
                </div>

                <div className="row col-9 mb-1">
                    <div className="card-group col-2">

                        <a data-tip data-for='shoulder'><img src={require("../../utils/images/shoulder.png")} className="card-img" alt={"alt"} /></a>
                        <ReactTooltip id='shoulder' type='error'>
                            <span>{gears.shoulder}</span>
                        </ReactTooltip>
                    </div>
                    <div className="card-group col-2 offset-2 p-0">
                        <a data-tip data-for='chest'><img src={require("../../utils/images/chest.png")} className="card-img" alt={""} /></a>
                        <ReactTooltip id='chest' type='error'>
                            <span>{gears.chest}</span>
                        </ReactTooltip>
                    </div>
                </div>
                <div className="row col-9 mb-1">
                    <div className="card-group col-2">
                        <img src={require("../../utils/images/hands.png")} className="card-img" alt={""} />


                    </div>
                    <div className="card-group col-2 offset-2 p-0">
                        <img src={require("../../utils/images/belt.png")} className="card-img" alt={""} />

                    </div>
                </div>
                <div className="row col-9 mb-1">
                    <div className="card-group col-2">
                        <img src={require("../../utils/images/legs.png")} className="card-img" alt={""} />

                    </div>
                    <div className="card-group col-2 offset-2 p-0">
                        <img src={require("../../utils/images/feet.png")} className="card-img" alt={""} />

                    </div>
                </div>
                <div className="row col-9 mb-1">
                    <div className="card-group col-2">
                        <img src={require("../../utils/images/necklace.png")} className="card-img" alt={""} />

                    </div>
                    <div className="card-group col-2">
                        <img src={require("../../utils/images/ring.png")} className="card-img" alt={""} />

                    </div>
                    <div className="card-group col-2">
                        <img src={require("../../utils/images/ring.png")} className="card-img" alt={""} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewOneBuild
