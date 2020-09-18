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
import EditBuild from "./pages/EditBuild"


import axios from 'axios'





export default function ImgMediaCard(props) {

    const history = useHistory()
    const [selectedBuild, setSelectedBuild] = useState()

    const editBuild = (build) => {
        setSelectedBuild(build._id)
        history.push(`/edit-build/${build._id}`);
        return (
            <EditBuild />
        )
    }

    const viewDetails = (build) => {

        setSelectedBuild(build._id)
        history.push(`/build/${build._id}`);
        return (
            <ViewOneBuild build={build} />
        )
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const alertSuccess = (message) => {
        enqueueSnackbar(message, {
            variant: 'success',
        });
    }

    const confirm = useConfirm();
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
                alertSuccess("Successfully deleted")
            })
        setTimeout(() => {
            window.location.reload(false)
        }, 1300);
    }



    // OPTIONAL : COPY TO CLIPBOARD FUNCTION TO SHARE
    // const shareBuild = (build) => {
    //     setSelectedBuild(build._id)
    //     let text = `${window.location.pathname}/build/${build._id}`
    //     text.select();
    //     text.setSelectionRange(0, 99999);
    //     document.execCommand("copy")
    //     alertSuccess("URL copied to clipboard")
    // }

    return (

        <div className="card text-white col-3 m-2">
            <img className="card-img" src="https://images.mmorpg.com/images/heroes/news/43780.jpg" alt="Card image" />
            <div className="card-img-overlay">
                <div className="row pull-right">

                    <span className="badge badge-pill badge-dark text-warning">{props.build.role} </span>
                    <span className="badge badge-pill badge-dark text-warning">{props.build.iclass} </span>
                </div>
                <h4 className="card-title p-2 text-uppercase text-warning">{props.build.title}</h4>
                <h5 className="card-text">{props.build.race}</h5>

            </div>
            <div className="row mx-auto">
                {!props.noEdit ? <Button onClick={() => { editBuild(props.build) }} >Edit</Button> : <></>}
                {/* <Chip className="m-1" label="Share" size="small" color="secondary"
                // onClick={() => { shareBuild(props.build) }} 
                /> */}
                {!props.noEdit ? <Button onClick={() => { confirmAction(props.build) }} >Delete</Button> : <></>}
                {/* <Button className="m-1 badge badge-pill badge-dark text-white" onClick={() => { viewDetails(props.build) }} >Details</Button> */}
            </div>
            <Button onClick={() => { viewDetails(props.build) }}>View Details</Button>
        </div>


    );
}

