const loadCharacterData = () => {
    return fetch('./json/got.json')
        .then(resp => resp.json())
}

const getAliveCharacters = (array) => {
    return array.filter(character => !character.dead)
}

let characters = await loadCharacterData();
let aliveCharacters = getAliveCharacters(characters);


const compare = (a, b) => {
    let aLastName = a.name.split(" ").at(-1);
    let bLastName = b.name.split(" ").at(-1);
    if (aLastName < bLastName) {
        return -1;
    } else if (aLastName > bLastName) {
        return 1;
    } else {
        return 0;
    }
}

let sortedCharacters = aliveCharacters.sort(compare);


