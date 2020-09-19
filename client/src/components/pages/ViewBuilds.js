import React, { useState, useEffect } from 'react';
import BuildCard from "../BuildCard.js"
import Jumbo from '../Jumbo'
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';

import axios from 'axios';







export default function ImgMediaCard() {



    const [userBuilds, setUserBuilds] = useState([])


    const getAllBuilds = async () => {
        await axios
            .get(`/builds/all`,
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
            <Jumbo text={`My Builds (${userBuilds.length})`} action="Create a new build" link="/create-build" />
            <div className="container">
                <SnackbarProvider maxSnack={3}>
                    <ConfirmProvider>
                        <div className="row col-12-md-auto justify-content-center">
                            {
                                userBuilds.map((build) => (
                                    <BuildCard build={build} key={build._id}></BuildCard>
                                )).reverse()
                            }
                        </div>
                    </ConfirmProvider>
                </SnackbarProvider>
            </div>



        </div >

    );
}
