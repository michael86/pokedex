const userInput = document.querySelector('#user-input');
const image = document.querySelector('#poke-img');
const description = document.querySelector('#description');
const pokeId = document.querySelector('#id');
const pokeMoves = document.querySelector('#moves');

userInput.addEventListener('submit', async function(e){
    e.preventDefault();

    const pokemon = this.elements[0].value;
    if(pokemon.length === 0) return;

    const pokeData = await getPokemon(pokemon);
    const pokeDesc = await getPokemonDescription(pokeData.species.url)
    setImage(pokeData.sprites);
    setDesc(pokeDesc);
    setId(pokeData.id);
    setMoves(pokeData.moves);
});

const getPokemon = async (pokemon) => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        return res.data;
    } catch (e) {
        console.log('Error getting pokemon', e);
    };
};

const setImage = sprites => {
    const url = sprites.other.dream_world.front_default ? sprites.other.dream_world.front_default : sprites.back_default;
    image.src = url;
};

const getPokemonDescription = async url => {
    try {
        const res = await axios.get(url);
        return res.data.flavor_text_entries[0].flavor_text;
    } catch (e) {
        console.log('Error getting pokemon description', e);
    };
}

const setDesc = desc => {
    description.innerText = desc.replace(/\r?\n|\r/g, " ").replace('', ' ');
};

const setId = id => {
    pokeId.innerText = id;
};

const setMoves = moves => {

    pokeMoves.innerHTML = '';

    for (let i = 0; i<=6; i++) {
        const move = moves[i].move.name
        const entry = document.createElement('li');
        entry.append(move);
        pokeMoves.append(entry);
    }

};