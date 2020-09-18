import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'

// Material-UI
import TextField from '@material-ui/core/TextField';


const EditBuild = () => {

    const params = useParams("/edit-build/:id")
    const [build, setBuild] = useState({})


    const getBuildInfo = async () => {
        console.log("getBuildInfo");
        console.log(params.id);
        const mybuild = await axios
            .get(`http://localhost:5000/builds/${params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
        const allInfo = await mybuild.data
        await setBuild(allInfo)
        console.log("allInfo", allInfo);
    }

    useEffect(() => {
        console.log(params.id);
        getBuildInfo()
    }, [])

    return (
        <div>
            <Jumbo text={"Edit Build"} comment={build.title} />
            {build
                ?
                <div>
                    <div className="container mb-3">
                        <h2>General Information</h2>


                        <div className="row">
                            <div className="col-4 mt-2">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Build name"
                                    defaultValue={build.title}
                                    variant="outlined"
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    style={{ width: 200 }}
                                    onChange={(e) => setBuild({ ...build }, { title: e.target.value })}
                                />
                            </div>

                        </div>
                    </div>

                </div>
                : <></>
            }
        </div>
    )
}

export default EditBuild
