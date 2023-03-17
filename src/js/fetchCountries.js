export default class CountryApi {
  constructor() {
    this.queryParams = '?fields=name,capital,population,coatOfArms,languages';
  }

  fetchCountries(searchQuery) {
    return fetch(
      `https://restcountries.com/v3.1/name/${searchQuery}${this.queryParams}`
    )
      .then(response => response.json())
      .then(({ country }) => country)
      .catch(error => console.log(error));
  }
}
