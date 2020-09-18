import React, { useState } from 'react'
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
let allSets = []
const armorType = ["Light", "Medium", "Heavy"]
const trait = ["Impenetrable", "Infused", "Charged"]
const armorGlyph = ["Health", "Recovery", "Stamina"]
const token = process.env.REACT_APP_TOKEN




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



// useEffect(() => {
getSets();
// }, [])

// Call to get all sets from API

function getSets() {

    axios.get('http://localhost:5000/api/sets', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("auth-token")
        }
    }).then((res) => console.log(res.data)
}

const Gears = (props) => {

    const classes = useStyles();

    const [value, setValue] = useState(allSets[0]);
    const [inputValue, setInputValue] = useState("");

    return (

        < div className="container" >
            <h1>{props.textPlaceholder}</h1>
            <div className="row">
                <Tooltip title={value ? value.name : "Chose a set"} classes={{ tooltip: classes.customWidth }} placement="bottom">
                    <div className="card-group col-3">
                        <div className="card">
                            <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />
                            <div className="card-body">
                            </div>
                        </div>
                    </div>
                </Tooltip>



                <div className="col-4">
                    < Autocomplete
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
                        options={allSets}
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
                        id="trait"
                        disableClearable
                        options={armorType}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Armor type" margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }} />}
                    />

                    < Autocomplete
                        freeSolo
                        id="trait"
                        disableClearable
                        options={trait}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Chose Trait" margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }} />}
                    />

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

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>


                </div>
                {value ? <div className="col-5"><SimpleCard set={value} /></div> : <div></div>}



            </div >
        </div>



    )
}

export default Gears


