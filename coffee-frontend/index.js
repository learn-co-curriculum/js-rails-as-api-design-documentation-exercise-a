console.log("Logging from the index.js of the coffee app");

document.addEventListener("DOMContentLoaded", function() {
    let offset = 0
    let origin = ""
    fetch("https://flatiron-coffee-api.herokuapp.com/coffee?limit=5")
    .then(res => res.json())
    .then(data => {
        const ulTag = document.querySelector("ul#coffee-list")
        data.forEach(coffee => {
            ulTag.innerHTML += `<li><h3>${coffee.name}</h3>
            <p>Origin: ${coffee.origin}</p>
            <p>Notes: ${coffee.notes}</p></li>`
        });

        document.addEventListener("click", function(e) {
            if (e.target.tagName === "BUTTON" && e.target.id === "filter") {
                e.preventDefault()
                origin = e.target.parentElement.children[1].value
                fetch(`https://flatiron-coffee-api.herokuapp.com/coffee?origin=${origin}&limit=5`)
                .then(res => res.json())
                .then(data => {
                    const ulTag = document.querySelector("ul#coffee-list")
                    ulTag.innerHTML = ""
                    data.forEach(coffee => {
                        ulTag.innerHTML += `<li><h3>${coffee.name}</h3>
                        <p>Origin: ${coffee.origin}</p>
                        <p>Notes: ${coffee.notes}</p></li>`
                    });
    
                    offset = 0
                })
            } else if (e.target.tagName === "BUTTON" && e.target.id === "next-results") {
                offset = offset + 1
                fetch(`https://flatiron-coffee-api.herokuapp.com/coffee?offset=${offset}&origin=${origin}&limit=5`)
                .then(res => res.json())
                .then(data => {
                    const ulTag = document.querySelector("ul#coffee-list")
                    ulTag.innerHTML = ""
                    data.forEach(coffee => {
                        ulTag.innerHTML += `<li><h3>${coffee.name}</h3>
                        <p>Origin: ${coffee.origin}</p>
                        <p>Notes: ${coffee.notes}</p></li>`
                    });
                })
            }
        })
    })

    // document.addEventListener("click", function(e) {
    //     if (e.target.tagName === "BUTTON" && e.target.id === "filter") {
    //         e.preventDefault()
    //         let origin = e.target.parentElement.children[1].value
    //         fetch(`https://flatiron-coffee-api.herokuapp.com/coffee?origin=${origin}&limit=5`)
    //         .then(res => res.json())
    //         .then(data => {
    //             const ulTag = document.querySelector("ul#coffee-list")
    //             ulTag.innerHTML = ""
    //             data.forEach(coffee => {
    //                 ulTag.innerHTML += `<li><h3>${coffee.name}</h3>
    //                 <p>Origin: ${coffee.origin}</p>
    //                 <p>Notes: ${coffee.notes}</p></li>`
    //             });

    //             let offset = 0

    //             document.addEventListener("click", function(e) {
    //                 if (e.target.tagName === "BUTTON" && e.target.id === "next-results") {
    //                     offset = offset + 1
    //                     fetch(`https://flatiron-coffee-api.herokuapp.com/coffee?offset=${offset}&origin=${origin}&limit=5`)
    //                     .then(res => res.json())
    //                     .then(data => {
    //                         const ulTag = document.querySelector("ul#coffee-list")
    //                         ulTag.innerHTML = ""
    //                         data.forEach(coffee => {
    //                             ulTag.innerHTML += `<li><h3>${coffee.name}</h3>
    //                             <p>Origin: ${coffee.origin}</p>
    //                             <p>Notes: ${coffee.notes}</p></li>`
    //                         });
    //                     })
    //                 }
    //             })
    //         })
    //     }
    // })
})