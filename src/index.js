import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries  } from './JS/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showCountryList, showCountryCard } from './JS/templates';
// import { countryListMarkup } from './templates/country-list.hbs'

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch (e){
    e.preventDefault();
let searchCountry = searchBox.value;
// console.log('searchCountry: ',searchCountry)
if(searchCountry.trim() === "") {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    return;
}
fetchCountries(searchCountry.trim())
.then(countries => {
    // console.log(countries)
    if(countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }

    if(countries.length >= 2  && countries.length <= 10) {
    const listMarkup = countries.map(country => showCountryList(country))
    countryList.innerHTML = listMarkup.join('');
    countryInfo.innerHTML = "";
    }

    if(countries.length === 1){
        const countryCardMarcup = countries.map(country => showCountryCard(country));
        countryList.innerHTML = "";
        countryInfo.innerHTML = countryCardMarcup.join('');
    }
})
.catch(error => {
    Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    return error;
})
}
