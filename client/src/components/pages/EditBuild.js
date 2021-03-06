import React, { useState, useContext, useEffect } from 'react'
import clsx from 'clsx';
import { SnackbarProvider } from 'notistack';


import UserContext from '../../context/UserContext'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import SimpleGears from '../SimpleGears'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


import Jumbo from '../Jumbo.js'

// Material-UI
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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

const EditBuild = () => {

    const { userData, setUserData } = useContext(UserContext)
    const params = useParams("/edit-build/:id")
    const [build, setBuild] = useState({})
    const [title, setTitle] = useState(build.title)
    const [iclass, setClass] = useState(build.iclass)
    const [role, setRole] = useState(build.role)
    const [race, setRace] = useState(build.race)
    const [food, setFood] = useState(build.food)
    const [stats, setStats] = useState({
        magicka: 0,
        health: 0,
        stamina: 0
    })
    const [comments, setComments] = useState(build.comments)

    // general info is use to display/not display the second section 
    const [generalInfo, setGeneralInfo] = useState(true)

    const [sets, setSets] = useState()


    const allSets = () => {
        axios.get('/api/sets', {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        }).then((res) => {
            setSets(res.data)
            return res.data
        })
    }

    const getBuildInfo = async () => {
        console.log("getBuildInfo");
        console.log(params.id);
        const mybuild = await axios
            .get(`/builds/${params.id}`,
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
                const updatedBuild = { userId: userData.user.id, title, iclass, role, race, food, stats, comments }
                await axios.patch(
                    `/builds/${params.id}`,
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

    const classes = useStyles();


    useEffect(() => {
        getBuildInfo()
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
                <Jumbo text={"Edit Build"} comment={build.title} />
                <div className="container ml-0 mb-3 mr-0">
                    <div className="row">
                        {build.iclass ?
                            <>
                                <img className="classImg col-lg-4 col-md-4 col-sm-2" src={iclass ? require(`../../utils/images/${iclass}.png`) : "https://www.eso-gold.com/images/game_left/the-elder-scrolls-online.png"} style={imgStyle} />

                                {generalInfo === true ?
                                    <>


                                        <div className="col-4 mt-2">
                                            <h2>General Information</h2>



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

                                            < Autocomplete
                                                freeSolo
                                                id="class"
                                                disableClearable
                                                options={esoClass}
                                                defaultValue={build.iclass}
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
                                                defaultValue={build.role}
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
                                                defaultValue={build.race}
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
                                                disableClearable
                                                options={foodOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                                defaultValue={build.food}
                                                groupBy={(option) => option.firstLetter}
                                                getOptionLabel={(option) => option.name ? option.name : build.food}
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
                                                    // value={stats.magicka}
                                                    defaultValue={build.stats ? build.stats.magicka : 0}
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
                                                    // value={stats.stamina}
                                                    defaultValue={build.stats ? build.stats.stamina : 0}
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
                                                    // value={stats.health}
                                                    defaultValue={build.stats ? build.stats.health : 0}
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
                                                defaultValue={build.comments}
                                                inputProps={{
                                                    maxLength: 60,
                                                }}
                                                style={{ width: 400 }}
                                                onChange={(e) => setComments(e.target.value)}
                                            />
                                            <Button
                                                variant="contained"
                                                color="black"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                onClick={save}
                                            >
                                                Edit
                                                    </Button>
                                        </div>


                                    </>
                                    : <SnackbarProvider maxSnack={3}>
                                        <SimpleGears sets={sets} buildId={params.id} />
                                    </SnackbarProvider>
                                }
                            </>
                            : <></>
                        }
                    </div>

                </div>

            </div>

        </ThemeProvider>
    )
}

export default EditBuild
