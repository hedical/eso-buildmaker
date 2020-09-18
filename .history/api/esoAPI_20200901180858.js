// const token = process.env.ESO_TOKEN

// let allSets = []
// let allSkills = []

// function getSets() {

//     axios.get('https://cors-anywhere.herokuapp.com/https://beast.pathfindermediagroup.com/api/eso/sets', {
//         headers: {
//             Authorization: 'Bearer ' + token
//         }
//     }).then((res) => {
//         allSets.push(...res.data)
//         console.log(allSets);
//     }).catch((err) => reject(err))
// }

// function getSkills() {

//     axios.get('https://cors-anywhere.herokuapp.com/https://beast.pathfindermediagroup.com/api/eso/skills/', {
//         headers: {
//             Authorization: 'Bearer ' + token
//         }
//     }).then((res) => {
//         allSkills.push(...res.data)
//         console.log(allSkills);
//     }).catch((err) => reject(err))
// }

// module.exports = { getSets, getSkills }