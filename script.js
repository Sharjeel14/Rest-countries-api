let modeSwitch = document.querySelector('.mode');
let navbar = document.querySelector('#my-nav');
let main_body = document.querySelector('.main');
let search = document.querySelector('.search-prompt');
let myselect = document.querySelector('#slct')
let section2 = document.querySelector('.section-2')
let section3 = document.querySelector('.section-3')
let section4 = document.querySelector('.section-4')

let countryDeatilsDiv = section3.querySelectorAll('.country-details')

let mode = false;
const backDiv = document.querySelector('.back')
const backBtn = document.querySelector('.section4-btn')


backBtn.addEventListener('click', () => {
    section2.style.display = 'flex'
    section3.style.display = 'flex'
    const parentElement = document.getElementById('my-section');
    parentElement.innerHTML = ''
    backDiv.style.display = 'none'
})



function switchmodes() {
    navbar.classList.toggle('dark-mode')
    main_body.classList.toggle('body-color')
    search.classList.toggle('search-prompt-mode')
    myselect.classList.toggle('myselect')

    backBtn.classList.toggle('myselect')

    let countryDetailsText2 = section4.querySelectorAll('.myspans2');
    let section4Btn = document.querySelectorAll('.border-btn')
    // Use querySelectorAll to select all elements with class name "country-details"
    let countryDetailsElements1 = section3.querySelectorAll('.country-details');
    let countryDetailsElements2 = section4.querySelectorAll('.country-details');
    let countryDetailsText1 = section3.querySelectorAll('.myspans2');
    let allListItems = section3.querySelectorAll('.country-item')
    // Loop through the selected elements
    countryDetailsElements1.forEach(function (element) {
        element.classList.toggle('country-details-dark')
    });
    countryDetailsElements2.forEach(function (element) {
        element.classList.toggle('country-details-dark')
    });
    countryDetailsText1.forEach(function (element) {
        element.classList.toggle('myspans-dark')
    });
    countryDetailsText2.forEach(function (element) {
        element.classList.toggle('myspans-dark')
    });
    allListItems.forEach(function (element) {
        element.classList.toggle('dark-li')
    });

    section4Btn.forEach(function (element) {
        element.classList.toggle('dark-li')
    });

}
function switchmodesadd() {  // Use querySelectorAll to select all elements with class name "country-details"
    // Use querySelectorAll to select all elements with class name "country-details"
    let countryDetailsElements1 = section3.querySelectorAll('.country-details');
    let countryDetailsElements2 = section4.querySelectorAll('.country-details');
    let countryDetailsText1 = section4.querySelectorAll('.myspans2');
    let allListItems = section3.querySelectorAll('.country-item')
    // Loop through the selected elements
    countryDetailsElements1.forEach(function (element) {
        element.classList.add('country-details-dark')
    });
    countryDetailsElements2.forEach(function (element) {
        element.classList.add('country-details-dark')
    });
    countryDetailsText1.forEach(function (element) {
        element.classList.add('myspans-dark')
    });
    countryDetailsText2.forEach(function (element) {
        element.classList.add('myspans-dark')
    });
    allListItems.forEach(function (element) {
        element.classList.add('dark-li')
    });
}
modeSwitch.addEventListener('click', function () {
    mode = !mode;
    switchmodes()

});

function createCountryListItem(country) {
    const countriesDetails = document.createElement('div')
    const listItem = document.createElement('li');
    listItem.classList.add('country-item');
    if (mode) {
        listItem.classList.add('dark-li')
    }
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
            let allCountries = document.querySelectorAll('.country-item')
            allCountries.forEach((myData, index) => {
                myData.addEventListener('click', function () {
                    backDiv.style.display = 'flex'
                    section2.style.display = 'none'
                    section3.style.display = 'none'
                    section4.style.display = 'block'

                    createSingleCountry(filteredCountries[index])
                })
            })
        }

        // Event listener for the region select element
        regionSelect.addEventListener('change', (event) => {
            const selectedRegion = event.target.value;
            console.log(selectedRegion)
            if (selectedRegion === 'all') {
                countryList.innerHTML = ''
                for (const country of data) {
                    const countryListItem = createCountryListItem(country);
                    countryList.appendChild(countryListItem);
                }
                let allCountries = document.querySelectorAll('.country-item')
                allCountries.forEach((myData, index) => {
                    myData.addEventListener('click', function () {
                        backDiv.style.display = 'flex'
                        section2.style.display = 'none'
                        section3.style.display = 'none'
                        section4.style.display = 'flex'

                        createSingleCountry(data[index])
                    })
                })
            } else {
                // Filter countries based on the selected region
                filterCountriesByRegion(selectedRegion);
            }

            if (mode) {
                switchmodesadd()
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
            let allCountries = document.querySelectorAll('.country-item')
            allCountries.forEach((myData, index) => {
                myData.addEventListener('click', function () {
                    backDiv.style.display = 'flex'
                    section2.style.display = 'none'
                    section3.style.display = 'none'
                    section4.style.display = 'flex'
                    console.log(filteredCountries[index])
                    createSingleCountry(filteredCountries[index])
                })
            })
            if (mode) {
                switchmodesadd()
            }
        }

        // Event listener for the search input element
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (event) => {

            const searchText = event.target.value;
            filterCountriesByName(searchText);
        });


        let allCountries = document.querySelectorAll('.country-item')
        allCountries.forEach((myData, index) => {
            myData.addEventListener('click', function () {
                backDiv.style.display = 'flex'
                section2.style.display = 'none'
                section3.style.display = 'none'
                section4.style.display = 'flex'
                myData = data[index]
                createSingleCountry(myData)
            })
        })
        function createSingleCountry(myData) {
            const parentElement = document.getElementById('my-section');
            parentElement.innerHTML = ''

            // Create the <li> element with the "country-item" class
            const listItem = document.createElement('li');
            listItem.classList.add('country-item');

            // Create the <img> element
            const flagImg = document.createElement('img');
            flagImg.src = myData.flags.png;
            flagImg.alt = myData.name;

            // Create the <div> element with the "country-details" class
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('country-details');

            // Create the <div> element with the "title" class
            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');

            // Create the <h2> element
            const titleHeading = document.createElement('h2');
            titleHeading.textContent = myData.name;

            // Append the <h2> element to the "title" div
            titleDiv.appendChild(titleHeading);

            // Create the <div> element with the "details" class
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('details');

            // Create the <div> element with the "country-name" class
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('country-name');

            // Create the paragraphs and spans for the country details
            const paragraphs = [
                { label: 'Native Name:', value: myData.nativeName },
                { label: 'Population:', value: myData.population },
                { label: 'Region:', value: myData.region },
                { label: 'Sub Region:', value: myData.subregion },
                { label: 'Capital:', value: myData.capital },
            ];
            paragraphs.forEach(({ label, value }) => {
                const paragraph = document.createElement('p');
                const span1 = document.createElement('span');
                span1.classList.add('myspans1');
                span1.textContent = label;
                const span2 = document.createElement('span');
                span2.classList.add('myspans2');
                span2.textContent = value;
                paragraph.appendChild(span1);
                paragraph.appendChild(span2);
                nameDiv.appendChild(paragraph);
            });

            // Append the <div> elements to the "details" div
            infoDiv.appendChild(nameDiv);

            // Create the <div> element with the "country-domains" class
            const domainsDiv = document.createElement('div');
            domainsDiv.classList.add('country-domains');

            // Create the paragraphs and spans for the country domains
            const domainParagraphs = [
                { label: 'Top Level Domain:', value: myData.topLevelDomain[0] },
                { label: 'Currencies:', value: myData.currencies[0].name },
                { label: 'Language:', value: myData.languages.map(lang => lang.name).join(', ') },
            ];

            domainParagraphs.forEach(({ label, value }) => {
                const paragraph = document.createElement('p');
                const span1 = document.createElement('span');
                span1.classList.add('myspans1');
                span1.textContent = label;
                const span2 = document.createElement('span');
                span2.classList.add('myspans2');
                span2.textContent = value;
                paragraph.appendChild(span1);
                paragraph.appendChild(span2);
                domainsDiv.appendChild(paragraph);
            });

            // Append the <div> elements to the "details" div
            infoDiv.appendChild(domainsDiv);

            // Create the <div> element with the "borders-country" class
            const bordersDiv = document.createElement('div');
            bordersDiv.classList.add('borders-country');

            // Create the paragraph and buttons for border countries
            const borderParagraph = document.createElement('p');
            const span1 = document.createElement('span');
            if (myData.borders === undefined) {

            } else {
                span1.classList.add('myspans1');
                borderParagraph.appendChild(span1);
                span1.textContent = 'Border Countries: ';


                myData.borders.forEach(border => {
                    const button = document.createElement('button');
                    button.classList.add('border-btn');
                    button.textContent = border;
                    borderParagraph.appendChild(button);
                    if (mode) {

                        button.classList.add('dark-li');
                    }
                });

            }
            // Append the paragraph to the "borders-country" div
            bordersDiv.appendChild(borderParagraph);

            // Append the created elements to the parent element
            listItem.appendChild(flagImg);
            listItem.appendChild(detailsDiv);
            detailsDiv.appendChild(titleDiv);
            detailsDiv.appendChild(infoDiv);
            detailsDiv.appendChild(bordersDiv);
            parentElement.appendChild(listItem);
            if (mode) {
                switchmodesadd()
            }
        }
    })
    .catch(error => {
        console.error('Error reading local JSON file:', error);
    });

















