import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import CountryApi from './js/fetchCountries';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;
const countryApiService = new CountryApi();

refs.input.addEventListener('input', debounce(onInput, 300));

function onInput() {
  const searchQuery = refs.input.value;
  console.log(searchQuery);
  countryApiService.fetchCountries(searchQuery).then(country => {
    renderInfo(country);
  });
}

function renderInfo(country) {
  console.log(country);
}

/*
Подія focus і зчитувати input '#search-box' target.value з debounce 300,
запит на бекенд по URL з name = input.target.value,
результати рендер в список li (цікаво чи є десь розмітка, чи створити самому, чи є в бекенді).
*/
