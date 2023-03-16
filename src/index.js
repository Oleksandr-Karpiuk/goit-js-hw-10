import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

/*
Подія focus і зчитувати input '#search-box' target.value з debounce 300,
запит на бекенд по URL з name = input.target.value,
результати рендер в список li (цікаво чи є десь розмітка, чи створити самому, чи є в бекенді).
*/
