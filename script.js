let input = document.querySelector("input");
let search_btn = document.querySelector("button");
let search_history = document.querySelector("#search-history");
let display_data = document.querySelector(".getData");
let img = document.querySelector("img");
let heading = document.querySelector("h2");
let content = document.querySelector("p");
let topHead = document.querySelector("#top");

// ApiKey

const apiKey = "pQSeYLqCXkSQRaSEFZrj2yP7w1urQZEQPm7RSxRi";

// On Automatic Reload
window.addEventListener("load", () => {
  let currentDate = new Date().toISOString().split("T")[0];
  let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const image = data.url;
      const title = data.title;
      const Description = data.explanation;

      topHead.innerHTML = `NASA Picture of the Day`;
      img.src = image;
      heading.innerHTML = title;
      content.innerHTML = Description;
    });
});

// On manual Search
search_btn.addEventListener("click", () => {
  let inputDate = input.value;
  let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${inputDate}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const image = data.url;
      const title = data.title;
      const Description = data.explanation;

      topHead.innerHTML = `Picture on ${inputDate}`;
      img.src = image;
      heading.innerHTML = title;
      content.innerHTML = Description;
    });

  // localStorage.setItem("NewDate", `${inputDate}`);
  saveSearch(inputDate);
  addHistory();
});

// Save searches
function saveSearch(inputDate) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(inputDate);
  localStorage.setItem("searches", JSON.stringify(searches));
}

// Add History

function addHistory() {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  search_history.innerHTML = "";

  var listItem = document.createElement("li");
  listItem.innerText = searches;
  search_history.appendChild(listItem);
}
