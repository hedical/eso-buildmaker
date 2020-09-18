import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'
import { makeStyles } from '@material-ui/core/styles';
import ReactTooltip from "react-tooltip";
import MyTooltip from "../Tooltip"


const ViewOneBuild = () => {

    const params = useParams("/build/:id")
    const [build, setBuild] = useState({ gears: [] })
    const [gears, setGears] = useState(
        { head: { set: {} } },
        { shoulder: { set: {} } },
        { chest: { set: {} } }
    )
    const [calcul, setCalcul] = useState({
        magicka_occurrence: 0, // Maximum Magicka
        health_occurence: 0, // Maximum Health, Healing taken, Health
        stamina_occurence: 0, // Maximum Stamina
        weapon_damage_occurence: 0, // Weapon Damage
        spell_damage_occurence: 0, // Spell Damage
        stam_reco_occurence: 0, // Stamina Recovery
        mag_reco_occurence: 0, // Magicka Recovery
        health_reco_occurence: 0, // Health Recovery
    })




    const getBuildInfo = async () => {
        console.log("getBuildInfo");
        const mybuild = await axios
            .get(`http://localhost:5000/builds/${params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
        const allInfo = await mybuild.data
        await setBuild(allInfo)
        await gearsMap(allInfo)

    }


    const gearsMap = async (build) => {
        let gearsIn = {}

        await build.gears.forEach(gear => {
            gearsIn[gear.piece] = gear
        })
        await setGears(gearsIn)
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
    }));

    const classes = useStyles();


    useEffect(() => {
        getBuildInfo()
    }, [])

    const statCalculation = () => {
        //Sustain chart
        let maxHealth = 0
        let maxStamina = 0
        let maxMagicka = 0

        let healthReco = 0
        let stamReco = 0
        let magickaReco = 0

        build.gears.forEach((gear) => {
            const stringToAnalyze = Object.values(gear.set)
            stringToAnalyze.forEach((bonus) => {
                console.log(bonus);
                if (typeof bonus == "string" && bonus.includes('Maximum Health' || 'Healing taken')) {
                    maxHealth++
                }
                if (typeof bonus == "string" && bonus.includes('Maximum Stamina')) {
                    maxStamina++
                }
                if (typeof bonus == "string" && bonus.includes('Maximum Magicka')) {
                    maxMagicka++
                }
                //
                if (typeof bonus == "string" && bonus.includes('Health Recovery')) {
                    healthReco++
                }
                if (typeof bonus == "string" && bonus.includes('Stamina Recovery')) {
                    stamReco++
                }
                if (typeof bonus == "string" && bonus.includes('Magicka Recovery')) {
                    magickaReco++
                }
            })
        })
        console.log("health:", maxHealth);
        console.log("stam:", maxStamina);
        console.log("magicka:", maxMagicka);
        console.log("health reco:", healthReco);
        console.log("stam reco:", stamReco);
        console.log("magicka reco:", magickaReco);
    }

    statCalculation()

    return (

        < div >
            <Jumbo text={build.title} comment={build.comments} />
            {gears.chest ?
                < div className="container" >

                    <div className="row col-9 offset-1 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.head} piece='head' />
                        </div>
                    </div>

                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.shoulder} piece='shoulder' />
                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <MyTooltip setInfo={gears.chest} piece='chest' />
                        </div>
                    </div>
                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.hands} piece='hands' />


                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <MyTooltip setInfo={gears.belt} piece='belt' />

                        </div>
                    </div>
                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.legs} piece='legs' />

                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <MyTooltip setInfo={gears.feet} piece='feet' />

                        </div>
                    </div>
                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.necklace} piece='necklace' />

                        </div>
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.ring} piece='ring' />

                        </div>
                        <div className="card-group col-2">
                            <MyTooltip setInfo={gears.ring} piece='ring' />

                        </div>
                    </div>
                </div>
                : <></>
            }
        </ div >
    )
}

export default ViewOneBuild
