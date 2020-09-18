import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'

// Material-UI
import TextField from '@material-ui/core/TextField';


const EditBuild = () => {

    const { userData, setUserData } = useContext(UserContext)
    const params = useParams("/edit-build/:id")
    const [build, setBuild] = useState({})
    const [title, setTitle] = useState(build.title)


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

    const save = async (e) => {
        e.preventDefault();

        try {
            if (build._id) {
                const updatedBuild = { userId: userData.user.id, title }
                await axios.patch(
                    `http://localhost:5000/builds/${params.id}`,
                    updatedBuild, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    console.log(res.data);
                    window.location.reload(false)
                })

            }

        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        console.log(params.id);
        getBuildInfo()
    }, [])

    return (
        <div>
            <Jumbo text={"Edit Build"} comment={build.title} />
            {build.title
                ?
                <div>
                    <div className="container mb-3">
                        <h2>General Information</h2>

                        <button onClick={save}>Edit</button>
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
