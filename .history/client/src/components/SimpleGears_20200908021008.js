import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Material-UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SimpleCard from './SimpleCard';
import { TableContainer, TableRow } from '@material-ui/core';

// Variables
const armorType = ["Light", "Medium", "Heavy"]
const trait = ["Impenetrable", "Infused", "Charged"]
const armorGlyph = ["Health", "Recovery", "Stamina"]

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

const SimpleGears = (props) => {
    const [gearId, setGearId] = useState()
    const [set, setSets] = useState()
    const [piece, setPiece] = useState("")
    const [weight, setWeight] = useState()
    const [trait, setTrait] = useState()
    const [glyph, setGlyph] = useState()

    const [bonus_item_1, setBonus_item_1] = useState()

    const classes = useStyles();
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState("");

    const build = props.buildId
    const sets = props.sets

    // const allSets = () => {
    //     axios.get('http://localhost:5000/api/sets', {
    //         headers: {
    //             "x-auth-token": localStorage.getItem("auth-token")
    //         }
    //     }).then((res) => {
    //         console.log(res.data)
    //         return res.data
    //     })
    // }


    const gearDisplay = async (selectedPiece) => {
        await setPiece(selectedPiece)
        try {
            await axios.get(`http://localhost:5000/builds/${build}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
                .then((res) => {
                    const gearList = res.data.gears
                    console.log(gearList);
                    console.log(trait);

                    for (let i = 0; i < gearList.length; i++) {

                        if (gearList[i].piece == selectedPiece) {
                            setGearId(gearList[i]._id)
                            setTrait(gearList[i].trait)
                            console.log("Display");

                        } else if (!gearList[i].piece) {
                            console.log("no gear exists");
                            setGearId("new")
                            setTrait("Chose a trait")
                        }
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    const save = async (e) => {
        e.preventDefault();

        try {
            const newGear = { set, piece, weight, trait, glyph }
            console.log("buildId:", build, "gearID:", gearId, "newGear:", newGear);


            if (gearId === "new") {

                await axios.patch(
                    `http://localhost:5000/builds/${build}/new`,
                    newGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    setGearId(res.data._id)
                })
            } else {
                await axios.patch(
                    `http://localhost:5000/builds/${build}/${gearId}`,
                    newGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
            }

        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        // setSets(allSets);
        setGearId()
    }, [])

    return (
        <div>
            <div className="row col-9 offset-1 mb-1">
                <div className="card-group col-2">
                    <img src="https://via.placeholder.com/150?text=head"
                        className="card-img"
                        id="head"
                        onClick={(e) => { gearDisplay(e.target.id) }}
                    />
                </div>
                <div className="card-group col-2">
                    <img src="https://via.placeholder.com/150?text=chest"
                        className="card-img"
                        id="chest"
                        onClick={(e) => { gearDisplay(e.target.id) }}
                    />
                </div>
            </div>

            <form>
                <div className="form-group">
                    <label htmlFor="piece-type">Trait</label>
                    <input id="piece-type"
                        type="piece"
                        value={trait || ""}
                        onChange={(e) => {
                            setTrait(e.target.value)
                        }}
                        className="form-control"
                    />
                </div>

                {/* < Autocomplete
                    freeSolo
                    value={JSON.stringify(value)}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    disableClearable
                    options={props.allSets}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Search set"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }} />}
                /> */}

                < Autocomplete
                    freeSolo
                    id="armorGlyph"
                    disableClearable
                    options={armorGlyph}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Glyph" margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }} />}
                />

                < Autocomplete
                    freeSolo
                    id="sets"
                    disableClearable
                    options={sets}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Glyph" margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }} />}
                />

                <input type="submit"
                    value="Save"
                    className="btn btn-primary"
                    onClick={save} />
            </form>
        </div>
    )
}

export default SimpleGears
