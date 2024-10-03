let offset = 0;  // Starter på den første posten
const limit = 9;  // Antall poster som hentes hver gang forløkken kjøres

/*----Henter poster fra apien og oppretter nye diver med innholdet----*/
function fetchData() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${limit}`)
    .then((response) => {
        // Hvis responsen ikke er OK, kastes en feil med statuskoden
        if (!response.ok) {
            throw new Error("Feil status: " + response.status);
        }
        return response.json();
    })
    .then((posts) => {
        // Henter elementet hvor postene skal vises
        let container = document.getElementById("mainContainer");

        // Forløkke som går igjennom hver post som hentes, og oppretter en ny div
        posts.forEach((post) => {
            const div = document.createElement("div");
            const title = document.createElement("h4");
            title.textContent = post.title;
            const body = document.createElement("p");
            body.textContent = post.body;
            
            // Legger til tittelen og innholdet i diven
            div.appendChild(title);
            div.appendChild(body);
           
            container.appendChild(div); // Poster diven i mainContainer på side2
        });

        // Øker offset med limiten så nye poster hentes ved neste fetch
        offset += limit;
    })
}

/*-----Kjører fetchData når siden lastes inn------*/
fetchData();



/*---------------Sjekker om man er på bunnen av siden--------------*/
function atBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

/*------Eventlistener som kjører fetchData når man skroller til bunnen------*/
window.addEventListener('scroll', function () {
    if (atBottom()) {
        fetchData();
    }
}); 