import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
});

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryInfoRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');

function cleanMarkup(ref) {
  ref.innerHTML = '';
}

inputRef.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(e) {
  const countryInput = e.target.value.trim();

  if (!countryInput) {
    cleanMarkup(countryListRef);
    cleanMarkup(countryInfoRef);
    return;
  }

  fetchCountries(countryInput)
    .then(data => {
      if (data.length > 10) {
        cleanMarkup(countryListRef);
        cleanMarkup(countryInfoRef);
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      renderMarkup(data);
    })
    .catch(error => {
      cleanMarkup(countryListRef);
      cleanMarkup(countryInfoRef);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderMarkup(data) {
  if (data.length === 1) {
    cleanMarkup(countryListRef);
    const markupInfo = createInfoMarkup(data);
    countryInfoRef.innerHTML = markupInfo;
  } else {
    cleanMarkup(countryInfoRef);
    const markupList = createListMarkup(data);
    countryListRef.innerHTML = markupList;
  }
}

function createListMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.svg}" alt="${name.official}" width="60" height="40">${name.official}</li>`
    )
    .join('');
}

function createInfoMarkup(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.svg}" alt="${name.official}" width="200" height="100">
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
}
