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

    const gearDisplay = (selectedPiece) => {
        // setPiece(selectedPiece)

        const newGear = { ...finalGear }

        setFinalGear({
            newGear, piece: selectedPiece
        }
        )

        let gearList = []

        try {
            axios.get(`http://localhost:5000/builds/${props.buildId}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
                .then((res) => gearList = res.data.gears)

            console.log(...gearList);
            for (let i = 0; i < gearList.length; i++) {

                if (gearList[i].piece === finalGear.piece) {
                    setFinalGear({
                        gearId: gearList[i]._id,
                        trait: gearList[i].trait,
                        set: gearList[i].set,
                        piece: gearList[i].piece,
                        weight: gearList[i].weight,
                        glyph: gearList[i].glyph,
                    })
                    // setGearId(gearList[i]._id)
                    // setTrait(gearList[i].trait)
                    console.log("Display");

                } else {
                    console.log("no gear exists");
                    setFinalGear({
                        gearId: undefined,
                        glyph: "Chose a glyph",
                        trait: "Chose a trait",
                        set: "Chose a set",
                        weight: "Chose a weight",
                    })
                    // setTrait("Chose a trait")
                    // setGlyph("Chose a  Glyph")
                    // setGearId("")
                }
            }



        } catch (err) {
            console.log(err);
        }
    }

    const save = async (e) => {
        e.preventDefault();

        try {
            const newGear = { finalGear }
            console.log("buildId:", build, "gearID:", finalGear.gearId, "newGear:", newGear);


            if (!finalGear.gearId) {

                await axios.patch(
                    `http://localhost:5000/builds/${build}/new`,
                    newGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    console.log("response if gearID NO exists on save", res.data);
                    // setFinalGear({
                    //     gearId: res.data._id,
                    //     glyph: res.data._id,
                    //     trait: "Chose a trait",
                    //     set,
                    //     piece,
                    //     weight,
                    // })
                    // setGearId(res.data._id)
                })
            } else if (finalGear.gearId) {
                await axios.patch(
                    `http://localhost:5000/builds/${build}/${finalGear.gearId}`,
                    newGear, {
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

    useEffect(() => {
        setFinalGear({ finalGear })
        //     setGearId()
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

                < Autocomplete
                    freeSolo
                    // value={JSON.stringify(value) || ""}
                    onChange={(event, newValue) => {
                        setFinalGear({ set: inputValue })
                        // setSet(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
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
                        setFinalGear({ glyph: newValue })
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
                        setFinalGear({ trait: newValue })

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
