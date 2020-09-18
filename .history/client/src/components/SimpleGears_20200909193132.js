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
const esoTrait = ["Impenetrable", "Infused", "Charged"]
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
    const [finalGear, setFinalGear] = useState({
        gearId: undefined,
        set: undefined,
        piece: undefined,
        weight: undefined,
        trait: undefined,
        glyph: undefined,
    })
    // const [gearId, setGearId] = useState()
    // const [set, setSet] = useState()
    // const [piece, setPiece] = useState("")
    // const [weight, setWeight] = useState()
    // const [trait, setTrait] = useState()
    // const [glyph, setGlyph] = useState()

    // const [bonus_item_1, setBonus_item_1] = useState()

    const classes = useStyles();
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState("");

    const build = props.buildId

    const gearDisplay = async (selectedPiece) => {
        // setPiece(selectedPiece)

        try {
            await axios
                .get(`http://localhost:5000/builds/${props.buildId}`,
                    {
                        headers: {
                            "x-auth-token": localStorage.getItem("auth-token")
                        }
                    })
                .then(async (res) => await res.data.gears)

                .then(async (gearList) => {
                    console.log(gearList);
                    setFinalGear({ ...finalGear, piece: selectedPiece })
                })
                .then(() => {
                    console.log(...gearList);
                    for (let i = 0; i < gearList.length; i++) {

                        if (finalGear.piece == gearList[i].piece) {
                            console.log("A corresponding gear in this build has been found");
                            await setFinalGear({
                                gearId: gearList[i]._id,
                                trait: gearList[i].trait,
                                set: gearList[i].set,
                                piece: gearList[i].piece,
                                weight: gearList[i].weight,
                                glyph: gearList[i].glyph,
                            })


                        } else if (gearList.piece !== finalGear.piece || gearList.length === 0) {
                            console.log("No existing gears in this build have been found for this type of piece");

                            await setFinalGear({
                                gearId: undefined,
                                glyph: "Chose a glyph",
                                trait: "Chose a trait",
                                set: "Chose a set",
                                weight: "Chose a weight",
                                piece: selectedPiece
                            })
                            // setTrait("Chose a trait")
                            // setGlyph("Chose a  Glyph")
                            // setGearId("")
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
            console.log("buildId:", build, "gearID:", finalGear.gearId, "newGear:", finalGear);

            if (finalGear.piece === undefined) {
                alert("select a piece")
            }
            else if (!finalGear.gearId) {

                await axios.patch(
                    `http://localhost:5000/builds/${build}/new`,
                    finalGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    console.log("response if gearID NO exists on save", res.data);
                    setFinalGear({ ...finalGear, gearId: res.data._id })
                })
            } else if (finalGear.gearId) {
                await axios.patch(
                    `http://localhost:5000/builds/${build}/${finalGear.gearId}`,
                    finalGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    console.log("response if gearID exists on save", res.data);
                })
            }

        }
        catch (err) {
            console.log(err);
        }

    }

    // useEffect(() => {
    //     setFinalGear({ ...finalGear })
    //     //     setGearId()
    // }, [])

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

                < Autocomplete
                    freeSolo
                    // value={JSON.stringify(value) || ""}
                    onChange={(event, newValue) => {
                        // setFinalGear({ ...finalGear, set: nInputValue })
                        // setSet(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        setFinalGear({ ...finalGear, set: newInputValue })
                    }}
                    disableClearable
                    options={props.sets}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Search set"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }} />}
                />

                < Autocomplete
                    freeSolo
                    id="armorGlyph"
                    onChange={(event, newValue) => {
                        setFinalGear({ ...finalGear, glyph: newValue })
                        // setGlyph(newValue);
                    }}
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
                    id="esoTrait"
                    onChange={(event, newValue) => {
                        setFinalGear({ ...finalGear, trait: newValue })

                        // setTrait(newValue);
                    }}
                    disableClearable
                    options={esoTrait}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Trait" margin="normal"
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
