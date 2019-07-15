//console.log("Logging from the index.js of the coffee app");
const BASE_URL = 'http://flatiron-coffee-api.herokuapp.com/coffee'

var num = 0
let input = ""

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://flatiron-coffee-api.herokuapp.com/coffee?limit=5', {
        method: "GET"
    })
    .then(res => res.json())
    .then(coffees => {
        const ulTag = document.querySelector('#coffee-list')
        coffees.forEach(coffee => {
            ulTag.innerHTML += `
            <li> <h3>${coffee.name}</h3> <p> Origin: ${coffee.origin}</p> <p>Notes: ${coffee.notes}</p> </li>
            `
        })
    })

    document.addEventListener('click', function(e) {
        if (e.target.id === "filter") {
            e.preventDefault()
            
            const ulTag = document.querySelector('#coffee-list')
            input = e.target.parentElement.children[1].value.trim()
            // console.log(input)
            num = 0 
         
            fetch(`http://flatiron-coffee-api.herokuapp.com/coffee?origin=${input}&offset=${num}&limit=5`)
            .then(resp => resp.json())
            .then(coffees => {
                ulTag.innerHTML= ""
                coffees.forEach(coffee => {
                        ulTag.innerHTML += `
                        <li> <h3>${coffee.name}</h3> <p> Origin: ${coffee.origin}</p> <p>Notes: ${coffee.notes}</p> </li>
                        `
                })
            });

        }else if (e.target.id ==="next-results"){
            e.preventDefault()
            // console.log('we here')
            const ulTag = document.querySelector('#coffee-list')
            num += 1
            fetch(`http://flatiron-coffee-api.herokuapp.com/coffee?origin=${input}&offset=${num}&limit=5`)
            .then(resp => resp.json())
            .then(coffees => {
                ulTag.innerHTML= ""
                coffees.forEach(coffee => {    
                    ulTag.innerHTML += `
                        <li> <h3>${coffee.name}</h3> <p> Origin: ${coffee.origin}</p> <p>Notes: ${coffee.notes}</p> </li>
                        `
                })
            })
        }
    })

})