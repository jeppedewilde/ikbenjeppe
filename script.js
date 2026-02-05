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

// Image change on click
const buttons = document.querySelectorAll('.square')

buttons.forEach(button => {
  buttons.addEventListener('click', function() {
    const img = this.querySelector('img')
    
    const original = this.getAttribute('data-original-src')
    const alt = this.getAttribute('data-alt-src')

    if (img.src.includes(original)) {
      img.src = alt;
    } else {
      img.src = original
    }
  })
})

