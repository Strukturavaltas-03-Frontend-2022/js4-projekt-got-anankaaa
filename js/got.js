const loadCharacterData = () => {
    return fetch('./json/got.json')
        .then(resp => resp.json())
}

const getAliveCharacters = (array) => {
    return array.filter(character => !character.dead)
}

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

let aliveCharacters = getAliveCharacters(await loadCharacterData());
let sortedCharacters = aliveCharacters.sort(compare);

const showDetails = (character) => {
    const sidePicture = document.querySelector(".sidePicture");
    sidePicture.src = character.picture;
    const name = document.querySelector(".name");
    name.innerHTML = character.name;
    const house = document.querySelector(".house");

    if(character.house) {
        house.src = `./assets/houses/${character.house}.png` 
    } else {
        house.src = './assets/houses/unknown.png'
    }

    const pitureDescription = document.querySelector(".pitureDescription");
    pitureDescription.innerHTML = character.bio;

}

const searchButton = document.querySelector(".searchButton");
const searchBar = document.querySelector(".searchBar")



const search = () => {
    const searchText = searchBar.value.toLowerCase().trim();
    let foundCharacter = false;
    for(let i = 0; i < sortedCharacters.length; i += 1){
        if(sortedCharacters[i].name.toLowerCase() === searchText) {
            showDetails(sortedCharacters[i]);
            foundCharacter = true;
            break;
        } 
    } 
    if(!foundCharacter) {
        alert("Character not found");
    }
    searchBar.value = "";
}

searchButton.addEventListener('click', search)
searchBar.addEventListener('keydown', (event) => {
    if (event.isComposing || event.keyCode === 13) {
        search();
    }
})


const init = () => {
    let mainPictureContainer = document.querySelector(".mainPictureContainer");
    sortedCharacters.forEach((character, idx) => {

        let portrait = document.createElement('div');
        portrait.classList.add('portraitContainer')
        let image = document.createElement('img');
        image.src = character.portrait;
        portrait.appendChild(image)
        let name = document.createElement('div');
        name.innerHTML = character.name;
        portrait.appendChild(name);
        mainPictureContainer.appendChild(portrait);

        portrait.addEventListener('click', () => {
            showDetails(character);
        });
    });
}    

init();
