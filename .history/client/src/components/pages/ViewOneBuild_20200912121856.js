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
                {/* <div className="row col-9">

            </div> */}
                <div className="row col-9 offset-1 mb-1">
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2" piece="head">

                            <img src={require('../../utils/images/head.png')} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                </div>

                <div className="row col-9 mb-1">
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={"../../utils/images/shoulder.png"} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={"../../utils/images/chest.png"} className="card-img" alt={""} />


                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={"../../utils/images/hand.png"} className="card-img" alt={""} />


                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={"../../utils/images/belt.png"} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={"../../utils/images/legs.png"} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={"../../utils/images/feet.png"} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={"../../utils/images/necklace.png"} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={"../../utils/images/ring.png"} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                    <Tooltip title={"Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={"../../utils/images/ring.png"} className="card-img" alt={""} />

                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default ViewOneBuild