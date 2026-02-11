///// API get data /////
getname()

async function getname() {
  const baseUrl = 'https://fdnd.directus.app';
  const endpoint = '/items/person/296';

  const URL = baseUrl + endpoint

  // wait for the response from the API
  let response = await fetch(URL)

  // parse the response as JSON
  let personInfo = await response.json();

  // find article element and insert the name as a heading
  const article = document.querySelector('article');
  article.insertAdjacentHTML("beforeend", `<h1>${personInfo.data.name}</h1>`);

  // find all elements with the class "custom-data" and insert the nickname, birthdate, and bio into them
  const dataFields = document.querySelectorAll('.custom-data');

  // check if there are at least 3 elements with the class "custom-data" before inserting the data
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

    // apply the wavy text effect to these elements after inserting the data
    makeTextWavy('.slide.one h2, .slide.one p, .slide.two h2, .slide.two p, .slide.two h3, .custom-data span, .slide.three h2, .slide.three p');
  }
}

///// dive button appears after all  circles are popped /////
const diveButton = document.getElementById('dive-btn');
const counterElement = document.getElementById('counter');

// Get all circles and save as a list
const circles = document.querySelectorAll('.circle');
const totalCircles = circles.length;

// Score starts at 0
let score = 0;

// Go through each circle and add an event listener for mouse enter
circles.forEach(circle => {
  circle.addEventListener('mouseenter', function () {

    // If the circle is already popped, do nothing
    if (this.classList.contains('pop')) return;

    // Increase score and update counter
    score++;
    counterElement.innerText = score;

    // If all circles are popped, show the dive button
    if (score === totalCircles) {
      diveButton.style.display = 'block';
    }

    // Add the 'pop' class to trigger the pop animation 
    this.classList.add('pop');

    // After the animation duration, hide the circle
    setTimeout(() => {
      this.style.visibility = 'hidden';
    }, 150);
  });
});

///// flipping card feature /////
// Add event listener to the dive button to toggle the 'flipped' class on the card when clicked
document.getElementById('dive-btn').addEventListener('click', () => {
  document.getElementById('card').classList.toggle('flipped');
});

///// wavy text effect /////
function makeTextWavy(selector) {
  // Find all selected elements
  const elements = document.querySelectorAll(selector);

  // Go through each element
  elements.forEach(element => {
    // Check if the element has text content before applying the effect
    if (element.innerText.trim() !== "") {
      // Split the text into individual letters wrapped in span elements with a custom property for animation delay
      element.innerHTML = element.innerText
        .split('')
        .map((letter, i) => {
          if (letter === ' ') return `<span style="--i:${i}">&nbsp;</span>`;
          return `<span style="--i:${i}">${letter}</span>`;
        })
        .join('');

      // Add a class to trigger the CSS animation
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

  // wait for the response from the API
  let response = await fetch(URL);

  // parse the response as JSON
  let movieData = await response.json();

  // save the list of people with favorite movies
  const allStudents = movieData.data;

  // find the button and result box elements
  const button = document.querySelector('#random-movie-btn');
  const resultBox = document.querySelector('#random-result');

  if (button) {
    button.addEventListener('click', function () {

      // generate a random index to select a random person from the list
      const randomIndex = Math.floor(Math.random() * allStudents.length);

      // get the random person's data
      const randomPerson = allStudents[randomIndex];

      // display the random person's name and favorite movie in the result box
      const displayName = randomPerson.name;

      resultBox.innerHTML = `
                <p>${displayName}</p>
                <p class="custom-data">
                    ${randomPerson.fav_movie}
                </p>
            `;

      // apply the wavy text effect to the new content in the result box
      makeTextWavy('#random-result p');
    });
  }
}

///// bar progress feature /////
// variable to keep track of the current width of the progress bar
let currentWidth = 0;

// find the progress button and progress bar elements
const progressBtn = document.querySelector('#progress-btn');
const progressBar = document.querySelector('#myBar');

if (progressBtn) {
  progressBtn.addEventListener('click', () => {

    // if the progress bar is full, reset it to empty and change the button text back to "Make progress"
    if (currentWidth === 100) {
      currentWidth = 0;
      progressBar.style.height = "0%";

      progressBar.style.backgroundColor = "";

      progressBtn.innerText = "Make progress";

      // if the progress bar is not full, increase its width by 20% and update the button text and color if it reaches 100%
    } else {
      currentWidth += 20;

      // ensure the width does not exceed 100%
      if (currentWidth > 100) {
        currentWidth = 100;
      }

      // update the height of the progress bar based on the current width
      progressBar.style.height = currentWidth + "%";

      // if the progress bar is full, change the button text to "Reload" and the color to gold
      if (currentWidth === 100) {
        progressBtn.innerText = "Reload";
        progressBar.style.backgroundColor = "gold";
      }
    }
  });
}