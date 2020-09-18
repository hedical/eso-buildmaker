
// Functionnal
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

// Context
import UserContext from '../../context/UserContext'

// My Components
import Jumbo from '../Jumbo'
import Stats from '../Stats'
import Gears from '../Gears'
import SimpleGears from '../SimpleGears'

// Material-UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

// Variables
const esoRole = ["DPS", "Healer", "Tank", "Hybrid"]
const esoClass = ["Dragonknight", "Necromancer", "Nightblade", "Sorcerer", "Templar", "Warden"]
const esoRace = ["Altmer", "Argonian", "Bosmer", "Breton", "Dunmer", "Imperial", "Khajiit", "Nord", "Orc", "Redguard"]
const esoFood = [
    { name: "Bewitched Sugar Skulls", type: "Stamina based" },
    { name: "Lava Foot Soup-And-Saltrice", type: "Stamina based" },
    { name: "Old Aldmeri Orphan Gruel", type: "Magicka based" },
    { name: "Artaeum Pickled Fish Bowl", type: "Magicka based" },
    { name: "Dubious Camoran Throne", type: "Stamina based" },
    { name: "Witchmother's Potent Brew", type: "Magicka based" }
]




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

    const [buildId, setBuildId] = useState()
    const [title, setTitle] = useState()
    const [iclass, setClass] = useState()
    const [role, setRole] = useState()
    const [race, setRace] = useState()
    const [food, setFood] = useState()
    const [gears, setGears] = useState()
    const [calculs, setCalculs] = useState()
    // options
    const [skills, setSkills] = useState()
    const [c_points, setChampionPoints] = useState()
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
            if (buildId) {
                const updatedBuild = { userId: userData.user.id, title, iclass, role, race, food, gears }
                await axios.patch(
                    `http://localhost:5000/builds/${buildId}`,
                    updatedBuild, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    setBuildId(res.data._id)
                    console.log(sets);

                })
            } else {
                const newBuild = { userId: userData.user.id, title, iclass, role, race, food, gears, skills, c_points, calculs, likes, comments }
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

        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        setSets(allSets);
    }, [])

    const foodOptions = esoFood.map((option) => {
        const firstLetter = option.type;
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });


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
                            label="Build name"
                            // defaultValue="Build name"
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
                        <Autocomplete
                            freeSolo
                            id="food"
                            options={foodOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Food" variant="outlined"
                                onSelect={(e) => setFood(e.target.value)} />}
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
