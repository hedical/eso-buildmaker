import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'
import Tooltip from '@material-ui/core/Tooltip';

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

    return (
        <div>
            <Jumbo text={"oko"} action="Create a new build" link="/create-build" />


            < div className="container" >
                <h1>{props.textPlaceholder}</h1>
                {/* <div className="row col-9">

            </div> */}
                <div className="row col-9 offset-1 mb-1">
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2" piece="head">

                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                        </div>
                    </Tooltip>
                </div>

                <div className="row col-9 mb-1">
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                        </div>
                    </Tooltip>
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />


                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />


                        </div>
                    </Tooltip>
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                        </div>
                    </Tooltip>
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2 offset-2 p-0">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                        </div>
                    </Tooltip>
                </div>
                <div className="row col-9 mb-1">
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                        </div>
                    </Tooltip>
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                        </div>
                    </Tooltip>
                    <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <div className="card-group col-2">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                        </div>
                    </Tooltip>
                </div>
            </div>
    )
}

export default ViewOneBuild
