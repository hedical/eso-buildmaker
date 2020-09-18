import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'
import { makeStyles } from '@material-ui/core/styles';
import ReactTooltip from "react-tooltip";
import MyTooltip from "../Tooltip"
import ReactApexChart from 'apexcharts'


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
        let healthPool = 0
        let stamPool = 0
        let magickaPool = 0

        let healthReco = 0
        let stamReco = 0
        let magickaReco = 0

        // Damage chart
        let physicalPen = 0
        let spellPen = 0

        let weaponCritical = 0
        let spellCritical = 0

        let weaponDamage = 0
        let spellDamage = 0

        build.gears.forEach((gear) => {
            const stringToAnalyze = Object.values(gear.set)
            stringToAnalyze.forEach((bonus) => {
                console.log(bonus);
                if (typeof bonus == "string" && bonus.includes('Maximum Health' || 'Healing taken')) {
                    healthPool++
                }
                if (typeof bonus == "string" && bonus.includes('Maximum Stamina')) {
                    stamPool++
                }
                if (typeof bonus == "string" && bonus.includes('Maximum Magicka')) {
                    magickaPool++
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
                if (typeof bonus == "string" && bonus.includes('Physical and Spell Penetration')) {
                    physicalPen++
                }
                if (typeof bonus == "string" && bonus.includes('Physical Penetration')) {
                    physicalPen++
                }
                if (typeof bonus == "string" && bonus.includes('Physical and Spell Penetration')) {
                    spellPen++
                }
                if (typeof bonus == "string" && bonus.includes('Spell Penetration')) {
                    spellPen++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon and Spell Damage')) {
                    weaponDamage++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon Damage')) {
                    weaponDamage++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon and Spell Damage')) {
                    spellDamage++
                }
                if (typeof bonus == "string" && bonus.includes('Spell Damage')) {
                    spellDamage++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon and Spell Critical')) {
                    weaponCritical++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon Critial')) {
                    weaponCritical++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon and Spell Critical')) {
                    spellCritical++
                }
                if (typeof bonus == "string" && bonus.includes('Spell Critical')) {
                    spellCritical++
                }
            })
        })
        console.log("health:", healthPool);
        console.log("stam:", stamPool);
        console.log("magicka:", magickaPool);
        console.log("health reco:", healthReco);
        console.log("stam reco:", stamReco);
        console.log("magicka reco:", magickaReco);
        console.log("physical pen:", physicalPen);
        console.log("spell pen:", spellPen);
        console.log("weapon damage:", weaponDamage);
        console.log("spell damage:", spellDamage);
        console.log("weapon damage:", weaponDamage);
        console.log("spell damage:", spellDamage);
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
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={350} />
            </div>
        </ div >
    )
}

export default ViewOneBuild
