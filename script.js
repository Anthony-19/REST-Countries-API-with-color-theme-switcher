const switch_theme = document.querySelector(".switch-theme");
const elements = [document.body, document.querySelector('header'), document.querySelector('input'), document.querySelector('.search--country i'), document.querySelector('.select-continent .bi-chevron-down'), document.querySelector('.select-continent button'), document.querySelector('.select-continent .continents'), document.querySelector('.back-button')];
switch_theme.addEventListener("click", () => {
  // document.body.classList.toggle('light-theme')
  //Note remember this // document.addEventListener('DOMContentLoaded'
  //OR
  elements.forEach((element) => {
    element.classList.toggle("light-theme");
    console.log(element)
  })
});

let button = document.querySelector("button");
button.addEventListener("click", () => {
  let continents = document.querySelector(".continents");
  continents.classList.toggle("visible");
});

const url = "./data.json";

const loadCountryApi = () => {
  return new Promise((resolve, reject) => {
    if (!url) {
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(`HTTP error! status: ${xhr.status}`));
      }
    };
  });
};

const getCountry = (countries) => {
  const countriesHTML = countries.map((country) => {
    return displayCountries(country);
  });
  const countriesDiv = document.querySelector(".countries");
  countriesDiv.innerHTML = countriesHTML.join("");

  const country = document.querySelectorAll(".country");

  Array.from(country).forEach((individalCountry, index) => {
    individalCountry.addEventListener("click", () => {
      const container2 = document.querySelector(".container-2");
      const container1 = document.querySelector(".container-1");
      const selectedCountry = countries[index];
      const countryHtml = displaySelectedCountry(selectedCountry);
      container2.innerHTML = countryHtml;
      console.log(container2.innerHTML = countryHtml);
      container2.style.display = "block";
      container1.style.display = "none";

      
      const backButton = document.querySelector(".back-button");
      backButton.addEventListener("click", () => {
        container2.style.display = "none";
        container1.style.display = "";
      });
    }); 
  });
};


const displayCountries = (country) => {
  return `
     <div class="country">
        <img src="${country.flag}" alt="${country.name}" class="country--flag">
        <div class="card--body">
            <h3>${country.name}</h3>
            <p class="population"><span> Population: </span>${country.population}</p>
            <p class="region"> <span> Region: </span>${country.region}</p>
            <p class="capital"> <span>Capital: </span>${country.capital}</p>
        </div>
    </div>
 `;
};

const displaySelectedCountry = (selectedCountry) => {
  return `
<div class="country-container">
    <button class="back-button">
        <i class="bi bi-arrow-left"></i>
        Back
    </button>
    <div class="country-content">
        <img src="${selectedCountry.flags.svg}" alt="${
    selectedCountry.name
  }" class="country--flag">
        <div class="country--details">
            <h3 class="country--name">${selectedCountry.name}</h3>
            <div class="country-info">
                <div class="info-column">
                    <p class="info-item  native-name"><strong>Native Name:</strong> ${
                      selectedCountry.nativeName
                    }</p>
                    <p class="info-item  population"><strong>Population:</strong> ${
                      selectedCountry.population
                    }</p>
                    <p class="info-item  currency"><strong>Currency:</strong> ${
                      selectedCountry.currencies[0].name
                    }</p>
                    <p class="info-item  region"><strong>Region:</strong> ${
                      selectedCountry.region
                    }</p>
                    <p class="info-item  western-region"><strong>Western region:</strong> ${
                      selectedCountry.subregion
                    }</p>
                    <p class="info-item  sub-regions"><strong>Sub Regions:</strong> ${
                      selectedCountry.subregion
                    }</p>
                    <p class="info-item  capital"><strong>Capital:</strong> ${
                      selectedCountry.capital
                    }</p>
                </div>
                <div class="info-column">
                    <p class="info-item top-level-domain"><strong>Top Level Domain:</strong> ${
                      selectedCountry.topLevelDomain
                    }</p>
                    <p class="info-item  currencies"><strong>Currencies:</strong> ${selectedCountry.currencies.map(
                      (currency) => {
                        return currency.name;
                      }
                    )}</p>
                    <p class="info-item language"><strong>Languages:</strong> ${selectedCountry.languages
                      .map((language) => language.name)
                      .join(", ")}</p>
                </div>
            </div>
            <div class="border-countries">
                <p class="border-countries-list"><strong>Border Countries:</strong></p>
                <ul>
                       ${
                         selectedCountry.borders &&
                         selectedCountry.borders.length > 0
                           ? selectedCountry.borders
                               .map(
                                 (borderCountry) => `
                                  <li class="border-country">${borderCountry}</li>
                                  `
                               )
                               .join(" ")
                           : '<li class="border-country">No border countries</li>'
                       }
                </ul>
            </div>
        </div>
    </div>
</div>
`;
};
loadCountryApi()
  .then((res) => {
    return JSON.parse(res);
  })
  .then((data) => {
    console.log(data);
    return getCountry(data);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

const searchCountry = document.querySelector("#search-country");
searchCountry.addEventListener("input", () => {
  const searchTerm = searchCountry.value.toLowerCase();
  const countries = document.querySelectorAll(".country");
  Array.from(countries).forEach((country) => {
    const countryName = country.textContent.toLowerCase();
    // if (countryName.indexOf(searchTerm) !== -1) {
    //     country.style.display = '';
    // }
    if (countryName.includes(searchTerm)) {
      country.style.display = "";
    } else {
      country.style.display = "none";
    }
  });
});

const filterRegion = document.querySelectorAll(".continents p");
const filterButton = document.querySelector(".filter-by-region");
filterRegion.forEach((region) => {
  region.addEventListener("click", () => {
    const regionName = region.textContent.toLowerCase();
    filterButton.textContent = region.textContent;
    const countries = document.querySelectorAll(".country");
    Array.from(countries).forEach((country) => {
      const countryRegion = country
        .querySelector(".region")
        .textContent.toLowerCase();
      if (countryRegion.includes(regionName)) {
        country.style.display = "";
      } else if (regionName === "all" || regionName === "filter by region") {
        country.style.display = "";
        filterButton.textContent = region.textContent;
      } else {
        country.style.display = "none";
      }
    });
  });
});
