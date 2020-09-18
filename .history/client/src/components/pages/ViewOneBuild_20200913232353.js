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
        // setGears(allInfo.gears)

    }

    // const retreiveSetInfo = (target) => {
    //     console.log(target);

    //     for (let i = 0; i < build.gears.length; i++) {
    //         if (target === build.gears[i].piece) {
    //             console.log(build.gears[i].set);
    //             return build.gears[i].set
    //         } else {
    //             console.log("no set");
    //             return "no set"
    //         }
    //     }
    // }

    const gearsMap = (build) => {
        build.gears.map((gear, index) => {
            let gearsIn = []
            gearsIn[gear.piece] = gear.set
            console.log("gearsIn", gearsIn);
            gears.push(gearsIn)
            console.log("gears", gears);
        })
        setGears(gears)
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
                    {/* <Tooltip piece="head" title={() => { retreiveSetInfo("head") }} classes={{ tooltip: classes.customWidth }} placement="bottom"> */}
                    <div className="card-group col-2">

                        <img data-tip data-for="head" src={require('../../utils/images/head.png')} className="card-img" alt={""} />
                        <a data-tip data-for='happyFace'> d(`･∀･)b </a>
                        <ReactTooltip id='happyFace' type='error'>
                            <span>{gears.chest}</span>
                        </ReactTooltip>
                    </div>
                    {/* </Tooltip> */}
                </div>

                <div className="row col-9 mb-1">
                    <Tooltip title={"ho"} classes={{ tooltip: classes.customWidth }} placement="bottom" piece="shoulder">
                        <div className="card-group col-2">
                            {/* <img src={require("../../utils/images/shoulder.png")} className="card-img" alt={"alt"} onClick={() => { retreiveSetInfo("shoulder") }} /> */}

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
