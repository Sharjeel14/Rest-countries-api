let modeSwitch = document.querySelector('.mode');
let navbar = document.querySelector('#my-nav');
let main_body = document.querySelector('.main');
let search = document.querySelector('.search-prompt');
let myselect = document.querySelector('#slct')
console.log(navbar)

modeSwitch.addEventListener('click', function () {
    navbar.classList.toggle('dark-mode')
    main_body.classList.toggle('body-color')
    search.classList.toggle('search-prompt-mode')
    myselect.classList.toggle('myselect')
});

function createCountryListItem(country) {
    const listItem = document.createElement('li');
    listItem.classList.add('country-item');


    const countryFlag = document.createElement('img');
    countryFlag.src = country.flags.png;
    countryFlag.alt = country.name;
    const countryName = document.createElement('h3');
    countryName.textContent = country.name;

    const countryPopulation = document.createElement('p');
    countryPopulation.textContent = `Population: ${country.population}`;

    const countryCapital = document.createElement('p');
    countryCapital.textContent = `Capital: ${country.capital}`;

    const countryRegion = document.createElement('p');
    countryRegion.textContent = `Region: ${country.region}`;

    listItem.appendChild(countryFlag);
    listItem.appendChild(countryName);
    listItem.appendChild(countryPopulation);
    listItem.appendChild(countryCapital);
    listItem.appendChild(countryRegion);
    return listItem;
}


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Use the data from the local JSON file
        console.log(data);
        const regionSelect = document.getElementById('slct');
        const uniqueRegions = [];

        // Loop through the countries data
        for (const country of data) {
            console.log(country)
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
    })
    .catch(error => {
        console.error('Error reading local JSON file:', error);
    });















