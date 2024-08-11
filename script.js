// script.js

function fetchPokemon() {
    const pokemonName = document.getElementById('pokemon-search').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('pokemon-name').textContent = capitalizeFirstLetter(data.name);
            document.getElementById('pokemon-type').textContent = data.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ');
            document.getElementById('pokemon-height').textContent = `${data.height / 10} m`;
            document.getElementById('pokemon-weight').textContent = `${data.weight / 10} kg`;
            document.getElementById('pokemon-bio').textContent = getAbilities(data.abilities);

            const pokemonImage = document.getElementById('pokemon-image');
            pokemonImage.src = data.sprites.front_default;
            pokemonImage.alt = data.name;
        })
        .catch(error => {
            document.getElementById('pokemon-name').textContent = "--";
            document.getElementById('pokemon-type').textContent = "--";
            document.getElementById('pokemon-height').textContent = "--";
            document.getElementById('pokemon-weight').textContent = "--";
            document.getElementById('pokemon-bio').textContent = "--";

            // Display custom image on error
            const pokemonImage = document.getElementById('pokemon-image');
            pokemonImage.src = 'https://i.pinimg.com/564x/fa/64/61/fa6461af3c6ae53488325d37959a306e.jpg';
            pokemonImage.alt = 'Pokemon Not Found';
            alert("Pokemon not found! Please try again.");
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getAbilities(abilities) {
    return abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ');
}
