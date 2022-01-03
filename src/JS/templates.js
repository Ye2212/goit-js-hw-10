export function showCountryList ({ flags, name }){
    return `
    <li class = country-item>
    <img class = country-list__flags src="${flags.svg}" alt="${name.official}" width=50/>
    <h2 class = country-list__name>${name.official}</h2>
    </li>
    `
}

export function showCountryCard ({ flags, name, capital, population, languiges}){
    return `
    <img class='country-flag' src='${flags.svg}' alt='${name.official}' width=100 />
    <h2 class='country-title'>${name.official}</h2>
        <p class='country-text'>Capital:</p>
        <span class='country-subtext'>${capital}</span>
        <p class='country-text'>Population:</p>
        <span class='country-subtext'>${population}</span>
        <p class='country-text'>Languiges:</p>
        <span class='country-subtext'>${languiges}</span>
    `

}