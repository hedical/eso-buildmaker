import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'


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
                        <Button
                            variant="contained"
                            color="black"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={save}
                        >
                            Save
                        </Button>

                        <div className="row">
                            <div className="col-4 mt-2">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Build name"
                                    variant="outlined"
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    style={{ width: 200 }}
                                    onChange={(e) => setTitle(e.target.value)}
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
