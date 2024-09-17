let name = "yu"
console.log(name.charAt(0))
let sayHello = "hello, "
let sayHelloToYu = `!@#  ${sayHello} !! ${name}` // use `` to contain the sentense, use ${} to contain variables
console.log(sayHelloToYu)
let fav_places_in_nyc = ["central park", "koronets", "Benny's Cuban Cafè", "Levain Bakery", "Qahwah House",]

// class notes
console.log(fav_places_in_nyc[0])
console.log(fav_places_in_nyc[fav_places_in_nyc.length-1]) // access the last item in the array
// for loop
// for(let i=0; i < fav_places_in_nyc.length; i++) {
//     console.log(fav_places_in_nyc[i])
// }

// for of loop
for(let item of fav_places_in_nyc) {
    console.log(item)
}
// forEach loop
fav_places_in_nyc.forEach(place => {
    // console.log(place)
    const myDiv = document.createElement('div')
    myDiv.innerText = place
})