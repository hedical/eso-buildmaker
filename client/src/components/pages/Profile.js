
// Functionnal
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import TableBody from '../TableBody'

import Jumbo from '../Jumbo'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


// Context
import UserContext from '../../context/UserContext'

const Profile = () => {


    const { userData, setUserData } = useContext(UserContext)

    const [userBuilds, setUserBuilds] = useState([])
    const [revealed, setRevealed] = useState({
        btn: true,
        token: false
    })


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

    const revelation = () => {
        setRevealed({
            btn: false,
            token: true
        })
    }

    useEffect(() => {
        getAllBuilds()
    }, [])


    console.log(userData);
    console.log(userBuilds);

    return (
        <div>
            {userData.user
                ? <>
                    <Jumbo text={userData.user.username}></Jumbo>
                    <div className="row ml-2 mb-4">
                        <h1 className="mr-2">Your token :</h1>
                        {revealed.btn ? <button className="btn btn-dark" onClick={revelation}>Reveal my token</button> : <></>}
                        {revealed.token ?
                            <TextareaAutosize className="col-4"
                                rowsMax={6}
                                aria-label="maximum height"
                                placeholder="Maximum 4 rows"
                                defaultValue={userData.token}
                            />
                            : <></>}
                    </div>
                    {userBuilds
                        ? <div className="row ml-2 mr-2">
                            <h1>Builds list :</h1>
                            <table className="table mx-auto">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Class</th>
                                        <th scope="col">Role</th>
                                    </tr>
                                </thead>
                                <tbody >

                                    {userBuilds.map((build, id) => (
                                        <TableBody key={id}>
                                            {build}
                                        </TableBody>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        : <></>}
                </>
                : <h1>You should not be here</h1>}
        </div>
    )
}

export default Profile
