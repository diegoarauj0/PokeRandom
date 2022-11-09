var Random = parseInt(Math.random() * 649)

setTimeout(() => {
    GerarPokemon(Random)
.then((pokemon) => {
    document.querySelector('div#img_pokemon').appendChild(pokemon.svg.tag)
    document.querySelector('div#area-carregando').style.display = 'none'
    document.querySelector('p#nome_pokemon').innerHTML = pokemon.name
})
.catch((err) => {
    window.location.reload()
})
}, 500);

function GerarPokemon(id) {
    return new Promise((resolve,reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            let PokeData = {}
            
            let svgurl = json.sprites.other.dream_world.front_default
            let svgimagem = document.createElement('img')
            svgimagem.setAttribute('src', svgurl)


            PokeData.svg = {}
            PokeData.svg.url = svgurl
            PokeData.svg.tag = svgimagem

            gifurl = Object.values(Object.values(json.sprites.versions)[4])[0].animated.front_default
            let gifimagem = document.createElement('img')
            gifimagem.setAttribute('src', gifurl)


            PokeData.gif = {}
            PokeData.gif.url = gifurl
            PokeData.gif.tag = gifimagem

            PokeData.name = json.name
            
            resolve(PokeData)
        })
        .catch((err) => {
            reject(err)
        })

    })
}