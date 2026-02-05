// API get name
const apiURL = 'https://fdnd.directus.app/items/person/296'
const parentElement = document.querySelector('.name')

// zwengel het script aan....
startLoading(parentElement)
fetchJson(apiURL)
    .then(({ data }) => {
        parseCustomString(data.custom)
        writeHTML(parentElement, parseCard(data))
        stopLoading(parentElement)
})

// alle gebruikte functies
   // parse the passed string to JSON and return it
function parseCustomString(string) {
    return JSON.parse(string)
}

// write the passed HTML to the the passed target element
function writeHTML(target, html) {
    target.innerHTML = html
}

// add the loading class to the passed element
function startLoading(target){
    target.classList.add('loading')
}

// remove the loading class from the passed element
function stopLoading(target){
        target.classList.remove('loading')
}

function parseCard(userData) {
    return `
    <article>
        <h1>${userData.name}</h1>
    </article>
    `
}

async function fetchJson(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error)
}

// const circles = document.querySelectorAll('.circle');

// circles.forEach(circle => {
//     circle.addEventListener('click', function() {
//         console.log("RAAK! Ik heb op een bubbel geklikt.");
//         this.classList.toggle('paused');
//     });
// });

const diveButton = document.getElementById('dive-btn');
const counterElement = document.getElementById('counter');

const circles = document.querySelectorAll('.circle');
const totalCircles = circles.length; 

let score = 0;

circles.forEach(circle => {
    circle.addEventListener('mouseenter', function() { 
        
        if (this.classList.contains('pop')) return;

        score++;
        counterElement.innerText = score;

        if (score === totalCircles) {
            diveButton.style.display = 'block';
        }

        this.classList.add('pop');

        setTimeout(() => {
            this.style.visibility = 'hidden';
        }, 4000);
    });
});