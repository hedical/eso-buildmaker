
import React, { useState, useContext, useEffect } from 'react'
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
import Gears from '../Gears'
import SimpleGears from '../SimpleGears'


// Variables


const esoRole = ["DPS", "Healer", "Tank", "Hybrid"]
const esoClass = ["Dragonknight", "Necromancer", "Nightblade", "Sorcerer", "Templar", "Warden"]
const esoRace = ["Altmer", "Argonian", "Bosmer", "Breton", "Dunmer", "Imperial", "Khajiit", "Nord", "Orc", "Redguard"]




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

    const { userData, setUserData } = useContext(UserContext)

    const [userId, setUserId] = useState({ userId: userData.user.id })
    const [buildId, setBuildId] = useState()
    const [title, setTitle] = useState()
    const [iclass, setClass] = useState()
    const [role, setRole] = useState()
    const [race, setRace] = useState()
    const [food, setFood] = useState()
    const [gears, setGears] = useState()
    const [skills, setSkills] = useState()
    const [c_points, setChampionPoints] = useState()
    const [calculs, setCalculs] = useState()
    const [likes, setLikes] = useState()
    const [comments, setComments] = useState()

    const [sets, setSets] = useState()

    const [inputValue, setInputValue] = useState("");

    const classes = useStyles();

    const allSets = () => {
        axios.get('http://localhost:5000/api/sets', {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        }).then((res) => {
            setSets(res.data)
            return res.data
        })
    }

    const save = async (e) => {
        e.preventDefault();

        // const userId = userData.user.username

        try {
            const newBuild = { userId, title, iclass, role, race, food, gears, skills, c_points, calculs, likes, comments }
            await axios.post(
                "http://localhost:5000/builds",
                newBuild, {
                headers: {
                    "x-auth-token": localStorage.getItem("auth-token")
                }
            }).then((res) => {
                setBuildId(res.data._id)
                console.log(sets);

            })
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        setSets(allSets);
    }, [])


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
                    onClick={save}
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
                            onChange={(e) => setTitle(e.target.value)}
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
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                onSelect={(e) => setClass(e.target.value)}
                            />}
                        />
                        < Autocomplete
                            freeSolo
                            id="role"
                            disableClearable
                            options={esoRole}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Role" margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                onSelect={(e) => setRole(e.target.value)}
                            />}
                        />
                        < Autocomplete
                            freeSolo
                            id="race"
                            disableClearable
                            options={esoRace}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Race" margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                onSelect={(e) => setRace(e.target.value)}
                            />}
                        />
                    </div>
                    <div className="col-6 mt-2">
                        <Stats name="Magicka" />
                        <Stats name="Stamina" />
                        <Stats name="Health" />
                    </div>

                </div>
                {buildId ? <SimpleGears sets={sets} buildId={buildId} /> : <></>}


            </div>

        </div>
    )
}

export default CreateBuild
