
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Jumbo from '../Jumbo'
import axios from 'axios'
import Stats from '../Stats'

// Material-UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { TableContainer, TableRow } from '@material-ui/core';


// Variables


const role = ["DPS", "Healer", "Tank", "Hybrid"]
const esoClass = ["Dragonknight", "Necromancer", "Nightblade", "Sorcerer", "Templar", "Warden"]
const race = ["Altmer", "Argonian", "Bosmer", "Breton", "Dunmer", "Imperial", "Khajiit", "Nord", "Orc", "Redguard"]




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







const CreateBuild = () => {

    const [title, setTitle] = useState()
    const [esoClass, setClass] = useState()
    const [role, setRole] = useState()
    const [race, setRace] = useState()

    const { userData, setUserData } = useContext(UserContext)

    const classes = useStyles();


    const save = async (e) => {
        e.preventDefault();

        const userId = userData.user.username

        try {
            const newBuild = { userId, title, esoClass, role, race }
            await axios.post(
                "http://localhost:5000/users/builds",
                newBuild);

            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }

    }


    return (
        <div>
            <Jumbo text="Build Maker" />
            <div className="container">
                <h2>General Information</h2>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Save
                    </Button>

                <div className="row">
                    <div className="col-6 mt-2">
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Build name"
                            variant="outlined"
                            style={{ width: 300 }}
                        />

                        < Autocomplete
                            freeSolo
                            id="class"
                            disableClearable
                            options={esoClass}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Class" margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }} />}
                        />
                        < Autocomplete
                            freeSolo
                            id="role"
                            disableClearable
                            options={role}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Role" margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }} />}
                        />
                        < Autocomplete
                            freeSolo
                            id="race"
                            disableClearable
                            options={race}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Race" margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }} />}
                        />
                    </div>
                    <div className="col-6 mt-2">
                        <Stats name="Magicka" />
                        <Stats name="Stamina" />
                        <Stats name="Health" />
                    </div>

                </div>


            </div>

        </div>
    )
}

export default CreateBuild
