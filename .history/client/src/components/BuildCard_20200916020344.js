import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ViewOneBuild from './pages/ViewOneBuild'
import Chip from '@material-ui/core/Chip';
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';


import axios from 'axios'





export default function ImgMediaCard(props) {

    const confirm = useConfirm();

    const history = useHistory()
    const [selectedBuild, setSelectedBuild] = useState()

    const selectBuild = (build) => {

        setSelectedBuild(build._id)
        history.push(`/build/${build._id}`);
        return (
            <ViewOneBuild build={build} />
        )
    }

    const message = 'Successfully deleted';
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const alertMessage = () => {
        enqueueSnackbar(message, {
            variant: 'success',
        });
    }

    const confirmAction = (build) => {
        confirm({ description: 'This action is permanent!' })
            .then(() => {
                deleteBuild(build)
            })
            .catch(() => { /* ... */ });
    };

    const deleteBuild = (build) => {
        setSelectedBuild(build._id)
        axios.delete(
            `http://localhost:5000/builds/${build._id}`,
            {
                headers: {
                    "x-auth-token": localStorage.getItem("auth-token")
                }
            })
            .then(() => {
                alertMessage()
            })
        setTimeout(() => {
            window.location.reload(false)
        }, 1300);
    }


    return (

        <div className="card bg-dark text-white col-6 m-2">
            <img className="card-img" src="https://images.mmorpg.com/images/heroes/news/43780.jpg" alt="Card image" />
            <div className="card-img-overlay">
                <div className="row pull-right">
                    <Chip className="" label={props.build.role} size="small" color="primary" />
                    <Chip className="" label={props.build.iclass} size="small" color="primary" />
                </div>
                <h4 className="card-title p-2 text-uppercase">{props.build.title}</h4>
                <h5 className="card-text">{props.build.race}</h5>

            </div>
            <div className="row">
                <ShareIcon />
                <StarIcon />
                <EditIcon />
                <HighlightOffIcon onClick={() => {
                    console.log("clicked delete");
                    confirmAction(props.build)
                }} />
                <Chip className="" label="View details" size="small" color="secondary" onClick={() => { selectBuild(props.build) }} />
            </div>
            <Button>View Details</Button>
        </div>


    );
}

