const tempratureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const weatherField = document.querySelector(".weather3 span");
const emojiField = document.querySelector(".weather3 img");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");

form.addEventListener("submit", search);

let target = "pune";
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=867a397cb4854705a00143620230108&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;
    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found");
  }
};

function updateDom(temprature, city, time, emoji, text) {
  
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());
  
  // console.log(exactDay);
  // console.log(exactTime);
  // console.log(exactDate);
  
  tempratureField.innerHTML = temprature;
  cityField.innerHTML = city;
  dateField.innerHTML = `${exactTime} - ${exactDay} ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerHTML = text;
}

fetchData(target);

// Function to search the location
function search(e) {
  e.preventDefault();

  target = searchField.value;

  fetchData(target);
}

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturdat";

    default:
      return "Don't Know";
  }
}
