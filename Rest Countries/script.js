let country = document.getElementById("country");
let center = document.querySelector(".center");
let second = document.querySelector(".second");

function generate(key, value) {
  let keyDiv = document.createElement("div");
  keyDiv.innerHTML = key;

  let valueDiv = document.createElement("div");
  if (key === "flags") {
    let img = document.createElement("img");
    img.src = value;
    valueDiv.appendChild(img);
  } else if (key === "maps") {
    let a = document.createElement("a");
    a.href = value;
    a.innerHTML = "Google Map";
    a.target = "_blank";
    valueDiv.appendChild(a);
  } else valueDiv.innerHTML = value;

  let items = document.createElement("div");
  items.classList.add("items");

  items.appendChild(keyDiv);
  items.appendChild(valueDiv);
  second.appendChild(items);
}

async function getAPIData() {
  let name = "bharat";
  if (country.value !== "") {
    name = country.value;
    country.value = "";
  }
  try {
    let response = await fetch("https://restcountries.com/v3.1/name/" + name);
    let data = await response.json();

    center.removeChild(second);
    second = document.createElement("div");
    second.classList.add("second");
    center.appendChild(second);

    data.forEach((country) => {
      generate("name", country.name.official);
      generate("capital", country.capital);
      generate("flags", country.flags.png);
      generate("area", country.area);
      generate("population", country.population);
      generate("region", country.region);
      generate("subregion", country.subregion);
      generate("continents", country.continents);
      generate("independent", country.independent);
      generate("landlocked", country.landlocked);
      generate("unMember", country.unMember);
      generate("timezones", country.timezones);
      generate("maps", country.maps.googleMaps);
      generate(
        "currencies",
        Object.values(Object.values(country.currencies)[0])
      );
      generate("languages", Object.values(country.languages));
    });
  } catch (error) {
    alert("Invalid Country Name");
  }
}

getAPIData();
