let modeSwitch = document.querySelector('.mode');
let navbar = document.querySelector('#my-nav');
let main_body = document.querySelector('.main');
let search = document.querySelector('.search-prompt');
let myselect = document.querySelector('#slct')
let section = document.querySelector('.section-3')
let countryDeatilsDiv = section.querySelectorAll('.country-details')

let mode = false;


function switchmodes() {
    navbar.classList.toggle('dark-mode')
    main_body.classList.toggle('body-color')
    search.classList.toggle('search-prompt-mode')
    myselect.classList.toggle('myselect')
    console.log(section)    // Use querySelectorAll to select all elements with class name "country-details"
    let countryDetailsElements = section.querySelectorAll('.country-details');
    let countryDetailsText1 = section.querySelectorAll('.myspans2');
    let allListItems = section.querySelectorAll('.country-item')
    console.log(countryDetailsElements)
    // Loop through the selected elements
    countryDetailsElements.forEach(function (element) {
        element.classList.toggle('country-details-dark')
    });
    countryDetailsText1.forEach(function (element) {
        element.classList.toggle('myspans-dark')
    });
    allListItems.forEach(function (element) {
        element.classList.toggle('dark-li')
    });
}
modeSwitch.addEventListener('click', function () {
    mode = true;
    switchmodes()

});

function createCountryListItem(country) {

    const countriesDetails = document.createElement('div')
    const listItem = document.createElement('li');
    listItem.classList.add('country-item');
    countriesDetails.classList.add('country-details');
    const countryFlag = document.createElement('img');
    countryFlag.src = country.flags.png;
    countryFlag.alt = country.name;
    const countryName = document.createElement('h3');
    countryName.textContent = country.name;

    const countryPopulation = document.createElement('p');
    const populationText = document.createElement('span'); // Create a span for population text
    populationText.classList.add('myspans1')
    populationText.textContent = 'Population: ';
    countryPopulation.appendChild(populationText);

    const populationValue = document.createElement('span'); // Create a span for population value
    populationValue.classList.add('myspans2');
    populationValue.textContent = country.population;
    countryPopulation.appendChild(populationValue);

    const countryCapital = document.createElement('p');
    const capitalText = document.createElement('span'); // Create a span for population text
    capitalText.classList.add('myspans');
    capitalText.textContent = 'Capital: ';
    countryCapital.appendChild(capitalText)

    const capitalValue = document.createElement('span'); // Create a span for population value
    capitalValue.classList.add('myspans2');
    capitalValue.textContent = country.capital;
    countryCapital.appendChild(capitalValue);

    const countryRegion = document.createElement('p');
    const regionText = document.createElement('span'); // Create a span for population text
    regionText.classList.add('myspans');
    regionText.textContent = 'Region: ';
    countryRegion.appendChild(regionText)

    const regionValue = document.createElement('span'); // Create a span for population value
    regionValue.classList.add('myspans2');
    regionValue.textContent = country.region;
    countryRegion.appendChild(regionValue);


    countriesDetails.appendChild(countryName);
    countriesDetails.appendChild(countryPopulation);
    countriesDetails.appendChild(countryRegion);
    countriesDetails.appendChild(countryCapital);
    listItem.appendChild(countryFlag);
    listItem.append(countriesDetails)
    return listItem;
}


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Use the data from the local JSON file
        const regionSelect = document.getElementById('slct');
        const uniqueRegions = [];

        // Loop through the countries data
        for (const country of data) {
            const region = country.region;
            // Check if the region is already added to the uniqueRegions array
            if (!uniqueRegions.includes(region)) {
                uniqueRegions.push(region);

                // Create an option element for each unique region
                const option = document.createElement('option');
                option.value = region;
                option.textContent = region;
                // Append the option to the select element
                regionSelect.appendChild(option);
            }
        }


        const countryList = document.getElementById('country-list');

        // Function to create a country list item

        // Loop through the countries data and create country list items
        for (const country of data) {
            const countryListItem = createCountryListItem(country);
            countryList.appendChild(countryListItem);
        }
        // ...

        // Function to filter countries by region
        function filterCountriesByRegion(region) {
            // Clear the existing country list
            countryList.innerHTML = '';

            // Filter the countries based on the selected region
            const filteredCountries = data.filter(country => country.region === region);

            // Loop through the filtered countries and create country list items
            for (const country of filteredCountries) {
                const countryListItem = createCountryListItem(country);
                countryList.appendChild(countryListItem);
            }
        }

        // Event listener for the region select element
        regionSelect.addEventListener('change', (event) => {
            if (mode == true) {
                switchmodes()
            }
            const selectedRegion = event.target.value;
            if (selectedRegion === 'all') {
                // If "all" is selected, display all countries
                for (const country of data) {
                    const countryListItem = createCountryListItem(country);
                    countryList.appendChild(countryListItem);
                }
            } else {
                // Filter countries based on the selected region
                filterCountriesByRegion(selectedRegion);
            }
        });

        function filterCountriesByName(searchText) {
            // Clear the existing country list
            countryList.innerHTML = '';

            // Filter the countries based on the search text
            const filteredCountries = data.filter(country =>
                country.name.toLowerCase().includes(searchText.toLowerCase())
            );

            // Loop through the filtered countries and create country list items
            for (const country of filteredCountries) {
                const countryListItem = createCountryListItem(country);
                countryList.appendChild(countryListItem);
            }
        }

        // Event listener for the search input element
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (event) => {

            const searchText = event.target.value;
            filterCountriesByName(searchText);
        });
        console.log(mode)

    })
    .catch(error => {
        console.error('Error reading local JSON file:', error);
    });
















