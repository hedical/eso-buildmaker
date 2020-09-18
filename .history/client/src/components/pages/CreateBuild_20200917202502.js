
// Functionnal
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx';
import { SnackbarProvider } from 'notistack';

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
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


// Variables
const esoRole = ["DPS", "Healer", "Tank", "Hybrid"]
const esoClass = ["Dragonknight", "Necromancer", "Nightblade", "Sorcerer", "Templar", "Warden"]
const esoRace = ["Altmer", "Argonian", "Bosmer", "Breton", "Dunmer", "Imperial", "Khajiit", "Nord", "Orc", "Redguard"]

// Full list : https://en.uesp.net/wiki/Online:Special_Recipes
const esoFood = [
    { name: "Bewitched Sugar Skulls", type: "Stamina based" },
    { name: "Lava Foot Soup-And-Saltrice", type: "Stamina based" },
    { name: "Old Aldmeri Orphan Gruel", type: "Magicka based" },
    { name: "Artaeum Pickled Fish Bowl", type: "Magicka based" },
    { name: "Dubious Camoran Throne", type: "Stamina based" },
    { name: "Witchmother's Potent Brew", type: "Magicka based" }
]

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4caf50',
        },
        info: {
            main: '#1976d2',
        },
    },
});


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
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '15ch',
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
    const [stats, setStats] = useState({
        magicka: 0,
        health: 0,
        stamina: 0
    })
    // general info is use to display/not display the second section 
    const [generalInfo, setGeneralInfo] = useState(true)

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

        try {
            if (buildId) {
                const updatedBuild = { userId: userData.user.id, title, iclass, role, race, food, gears, comments }
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
                    setGeneralInfo(false)

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

    const handleChange = (prop) => (event) => {
        setStats({ ...stats, [prop]: event.target.value });
    };

    const imgStyle = {
        height: "auto",
    }


    return (
        <ThemeProvider theme={theme}>
            <div>
                <Jumbo text="Build Maker" />

                <div className="container ml-0 mb-3 mr-0">



                    <img className="classImg col-lg-4 col-md-4 col-sm-2" src={iclass ? require(`../../utils/images/${iclass}.png`) : "https://www.eso-gold.com/images/game_left/the-elder-scrolls-online.png"} style={imgStyle} />

                    {generalInfo === true ?
                        <>
                            <h1>General Information</h1>
                            <div className="row"></div>
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

                                < Autocomplete
                                    freeSolo
                                    id="class"
                                    disableClearable
                                    options={esoClass}
                                    getOptionLabel={(option) => option}
                                    style={{ width: 200 }}
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
                                    style={{ width: 200 }}
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
                                    style={{ width: 200 }}
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
                                    style={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Food" variant="outlined"
                                        onSelect={(e) => setFood(e.target.value)} />}
                                />

                            </div>




                            <div className="col-lg-3 col-xs-12">
                                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                                    <FormHelperText id="Magicka">Magicka</FormHelperText>
                                    <Input
                                        id="magicka"
                                        value={stats.magicka}
                                        color="info"
                                        onChange={handleChange('magicka')}
                                        endAdornment={<InputAdornment position="end">points</InputAdornment>}
                                        aria-describedby="Magicka"
                                        inputProps={{
                                            'aria-label': 'Magicka',
                                        }}
                                    />

                                </FormControl>
                                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                                    <FormHelperText id="stamina">Stamina</FormHelperText>
                                    <Input
                                        id="stamina"
                                        value={stats.stamina}
                                        color="primary"
                                        onChange={handleChange('stamina')}
                                        endAdornment={<InputAdornment position="end">points</InputAdornment>}
                                        aria-describedby="stamina"
                                        inputProps={{
                                            'aria-label': 'Stamina',
                                        }}
                                    />

                                </FormControl>
                                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                                    <FormHelperText id="health">Health</FormHelperText>
                                    <Input
                                        id="health"
                                        value={stats.health}
                                        color="secondary"
                                        onChange={handleChange('health')}
                                        endAdornment={<InputAdornment position="end">points</InputAdornment>}
                                        aria-describedby="health"
                                        inputProps={{
                                            'aria-label': 'Health',
                                        }}
                                    />

                                </FormControl>

                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Comments"
                                    variant="outlined"
                                    inputProps={{
                                        maxLength: 60,
                                    }}
                                    style={{ width: 400 }}
                                    onChange={(e) => setComments(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="black"
                                    size="medium"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    onClick={save}
                                >
                                    Save
                                </Button>


                            </div>
                        </>
                        : <SnackbarProvider maxSnack={3}>
                            <SimpleGears sets={sets} buildId={buildId} />
                        </SnackbarProvider>
                    }
                </div>
            </div>
            </div>
        </ThemeProvider >
    )
}

export default CreateBuild
