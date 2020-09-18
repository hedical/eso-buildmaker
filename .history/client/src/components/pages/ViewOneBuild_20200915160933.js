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
                            <a data-tip data-for='head'> <img data-tip data-for="head" src={require('../../utils/images/head.png')} className="card-img" alt={""} /></a>
                            <ReactTooltip id='head' className='custom-color-no-arrow'
                                textColor='#eeca2a' backgroundColor='#222' effect='solid' border={true} borderColor='white' place={'top'} type={'light'} >
                                <h2 >{gears.head.set.name}</h2>
                                <ul>
                                    <li>{gears.head.set.bonus_item_1 ? `(1 item) ${gears.head.set.bonus_item_1}` : ""}</li>
                                    <li>{gears.head.set.bonus_item_2 ? `(2 items) ${gears.head.set.bonus_item_2}` : ""}</li>
                                    <li>{gears.head.set.bonus_item_3 ? `(3 items) ${gears.head.set.bonus_item_3}` : ""}</li>
                                    <li>{gears.head.set.bonus_item_4 ? `(4 items) ${gears.head.set.bonus_item_4}` : ""}</li>
                                    <li>{gears.head.set.bonus_item_5 ? `(5 items) ${gears.head.set.bonus_item_5}` : ""}</li>
                                </ul>
                            </ReactTooltip>
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
                : <></>
            }


        </ div >
    )
}

export default ViewOneBuild
