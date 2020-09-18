import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'
import { makeStyles } from '@material-ui/core/styles';
import ReactTooltip from "react-tooltip";
import MyTooltip from "../Tooltip"


const ViewOneBuild = () => {

    const params = useParams("/build/:id")
    const [build, setBuild] = useState({ gears: [] })
    const [gears, setGears] = useState(
        { head: { set: {} } },
        { shoulder: { set: {} } },
        { chest: { set: {} } }
    )




    const getBuildInfo = async () => {
        console.log("getBuildInfo");
        const mybuild = await axios
            .get(`http://localhost:5000/builds/${params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
        const allInfo = await mybuild.data
        await setBuild(allInfo)
        await gearsMap(allInfo)

    }


    const gearsMap = async (build) => {
        let gearsIn = {}

        await build.gears.forEach(gear => {
            gearsIn[gear.piece] = gear
        })
        await setGears(gearsIn)
    }



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


    useEffect(() => {
        getBuildInfo()
        console.log("gears: ", gears);

    }, [])



    return (

        < div >
            <Jumbo text={build.title} action={build.race} link="" />
            {gears.chest ?
                < div className="container" >

                    <div className="row col-9 offset-1 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.head} piece='head' />
                        </div>
                    </div>

                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.shoulder} piece='shoulder' />
                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <MyTooltip setInfo={gears.chest} piece='chest' />
                        </div>
                    </div>
                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.hands} piece='hands' />


                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <MyTooltip setInfo={gears.belt} piece='belt' />

                        </div>
                    </div>
                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.legs} piece='legs' />

                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <MyTooltip setInfo={gears.feet} piece='feet' />

                        </div>
                    </div>
                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.necklace} piece='necklace' />

                        </div>
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.ring} piece='ring' />

                        </div>
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.ring} piece='ring' />

                        </div>
                    </div>
                </div>
                : <></>
            }
        </ div >
    )
}

export default ViewOneBuild