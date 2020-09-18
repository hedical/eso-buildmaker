import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
// import GearImage from '../../utils/images/'


const ViewOneBuild = () => {

    const params = useParams("/build/:id")
    const [build, setBuild] = useState()

    const getBuildInfo = async () => {
        await axios
            .get(`http://localhost:5000/builds/${params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
            .then((build) => {
                setBuild(build.data)
            })
    }

    const retreiveSetInfo = async (target) => {
        for (let i = 0; i < build.gears.length; i++) {
            if (target === build.gears[i].piece) {
                return build.gears[i].set
            } else {
                return "no set"
            }
        }
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
            <Jumbo text={"oko"} action="Create a new build" link="/create-build" />


            < div className="container" >

                <div className="row col-9 offset-1 mb-1">
                    <Tooltip piece="head" title={(e) => { retreiveSetInfo(e.target.piece) }} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">

                            <img src={require('../../utils/images/head.png')} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                </div>

                <div className="row col-9 mb-1">
                    <Tooltip title={"ho"} classes={{ tooltip: classes.customWidth }} placement="bottom" piece="chest">
                        <div className="card-group col-2">
                            <img src={require("../../utils/images/shoulder.png")} className="card-img" alt={"alt"} onClick={(e) => console.log(e.target.getAttribute('alt'))} />

                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={require("../../utils/images/chest.png")} className="card-img" alt={""} />


                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={require("../../utils/images/hands.png")} className="card-img" alt={""} />


                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={require("../../utils/images/belt.png")} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={require("../../utils/images/legs.png")} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={require("../../utils/images/feet.png")} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={require("../../utils/images/necklace.png")} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={require("../../utils/images/ring.png")} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={require("../../utils/images/ring.png")} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default ViewOneBuild
