///// API get data /////
getname()
 
async function getname() {
    const baseUrl = 'https://fdnd.directus.app';
    const endpoint = '/items/person/296';
 
    const URL = baseUrl + endpoint
 
    let response = await fetch(URL)
    console.log(response);
 
    let personInfo  = await response.json();
    console.log(personInfo);
 
    const article = document.querySelector('article');
    article.insertAdjacentHTML("beforeend",`<h1>${personInfo.data.name}</h1>`);

    const dataFields = document.querySelectorAll('.custom-data');

    if (dataFields.length >= 3) {
    dataFields[0].insertAdjacentHTML("beforeend", 
      `<span>${personInfo.data.nickname}</span>` 
    );

    dataFields[1].insertAdjacentHTML("beforeend", 
      `<span>${personInfo.data.birthdate}</span>`
    );

    dataFields[2].insertAdjacentHTML("beforeend", 
      `<span>${personInfo.data.bio}</span>`
    );

    makeTextWavy('.slide.one h2, .slide.one p, .slide.two h2, .slide.two p, .slide.two h3, .custom-data span, .slide.three h2, .slide.three p');
    }
  }

///// dive button appears after all  circles are popped /////
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
        }, 150);
    });
});

///// flipping card feature /////
document.getElementById('dive-btn').addEventListener('click', () => {
  document.getElementById('card').classList.toggle('flipped');
});

///// wavy text effect /////
function makeTextWavy(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        if (element.innerText.trim() !== "") {
            element.innerHTML = element.innerText
                .split('')
                .map((letter, i) => {
                    if(letter === ' ') return `<span style="--i:${i}">&nbsp;</span>`;
                    return `<span style="--i:${i}">${letter}</span>`;
                })
                .join('');
            
            element.classList.add('wavy-active');
        }
    });
}

///// random movie selector /////
enableRandomMovie();

async function enableRandomMovie() {
    const baseUrl = 'https://fdnd.directus.app';
    const endpoint = '/items/person?filter[fav_movie][_nnull]=true'; 
 
    const URL = baseUrl + endpoint;
 
    let response = await fetch(URL);
    console.log("Movie response:", response); 
 
    let movieData = await response.json();
    console.log("Movie data:", movieData); 
    
    const allStudents = movieData.data;

    const button = document.querySelector('#random-movie-btn');
    const resultBox = document.querySelector('#random-result');

    if (button) {
        button.addEventListener('click', function() {
            
            const randomIndex = Math.floor(Math.random() * allStudents.length);
            
            const randomPerson = allStudents[randomIndex];

            const displayName = randomPerson.name;

            resultBox.innerHTML = `
                <p>${displayName}</p>
                <p class="custom-data">
                    ${randomPerson.fav_movie}
                </p>
            `;

            makeTextWavy('#random-result p');
        });
    }
}

///// bar progress feature /////
let currentWidth = 0; 

const progressBtn = document.querySelector('#progress-btn');
const progressBar = document.querySelector('#myBar');

if (progressBtn) { 
    progressBtn.addEventListener('click', () => {
        
        if (currentWidth === 100) {
            currentWidth = 0;
            progressBar.style.height = "0%";
            
            progressBar.style.backgroundColor = ""; 
            
            progressBtn.innerText = "Make progress"; 
            
        } else {
            currentWidth += 20; 

            if (currentWidth > 100) {
                currentWidth = 100;
            }

            progressBar.style.height = currentWidth + "%";
            
            if (currentWidth === 100) {
                progressBtn.innerText = "Reload";
                progressBar.style.backgroundColor = "gold";
            }
        }
    });
}