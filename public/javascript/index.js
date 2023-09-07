const charactersAPI = new APIHandler('http://localhost:8000');
const container = document.querySelector(".characters-container")

function characterAppendToContainer(name, occupation, weapon, cartoon) {
  const characterInfoDiv = document.createElement("div");
  characterInfoDiv.className = "character-info";

  const nameDiv = document.createElement("div");
  nameDiv.className = "name";
  nameDiv.innerHTML = `Name: ${name}`;

  const occupationDiv = document.createElement("div");
  occupationDiv.className = "occupation";
  occupationDiv.innerHTML = `Occupation: ${occupation}`;

  const  cartoonDiv = document.createElement("div");
  cartoonDiv.className = "cartoon";
  cartoonDiv.innerHTML = `Cartoon: ${cartoon}`;

  const weaponDiv = document.createElement("div");
  weaponDiv.className = "weapon";
  weaponDiv.innerHTML = `Weapon: ${weapon}`;

  characterInfoDiv.appendChild(nameDiv);
  characterInfoDiv.appendChild(occupationDiv);
  characterInfoDiv.appendChild(cartoonDiv);
  characterInfoDiv.appendChild(weaponDiv);

  container.appendChild(characterInfoDiv);

}

function removeCharacterInfo() {
  const characterInfoElement = document.querySelector('.character-info');
  if (characterInfoElement) {
    characterInfoElement.remove();
  }
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then((allCharacters)=>{
     console.log(allCharacters.data)
      const getFullList = allCharacters.data
       container.innerHTML = " "

      getFullList.forEach(character  => {
        console.log(character)
        const { name, occupation, weapon, cartoon } = character
        characterAppendToContainer(name, occupation, weapon, cartoon)
      })

    })
    .catch(error => console.error('Error while getFullList', error))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.getElementById("fetchOne-input").value
     charactersAPI.getOneRegister(characterId)
    .then((character)=>{
     console.log(character)
       const oneList = character.data
       container.innerHTML = " "

  
       const { name, occupation, weapon, cartoon } = oneList
        characterAppendToContainer(name, occupation, weapon, cartoon)
      

    })
    .catch(error => console.error('Error while getOneRegister', error))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const characterId = document.getElementById("deleteOne-input").value
    if (characterId.trim() === "") {
      throw new Error('Character ID is empty');
      return;
    }
    charactersAPI.deleteOneRegister(characterId)
   .then((character)=>{
    console.log(character)
      const deleteOne = character.data
      // container.innerHTML = " "

 
      const { name, occupation, weapon, cartoon } = deleteOne
      removeCharacterInfo(name, occupation, weapon, cartoon)
     

   })
   .catch(error => console.error('Error while getOneRegister', error))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    const name = document.getElementById("edit-name").value;
    const characterId = document.getElementById("edit-id").value;

    const occupation = document.getElementById("edit-occupation").value;
    const weapon = document.getElementById("edit-weapon").value;
    const cartoon = document.getElementById("edit-cartoon").checked;
    const characterInfo = {
      characterId,
        name,
        occupation,
        weapon,
        cartoon
    };
    charactersAPI.updateOneRegister (characterId, characterInfo)
   .then((character)=>{
    console.log(character)
    
      const { name, occupation, weapon, cartoon } = character
      characterAppendToContainer(name, occupation, weapon, cartoon)
     

   })
   .catch(error => console.error('Error while updateOneRegister', error))
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    const name = document.getElementById("create-name").value;
    const occupation = document.getElementById("create-occupation").value;
    const weapon = document.getElementById("create-weapon").value;
    const cartoon = document.getElementById("create-cartoon").checked;
    // container.innerHTML = " "
    const characterInfo = {
      name,
      occupation,
      weapon,
      cartoon,
  };
      
    charactersAPI.createOneRegister(characterInfo)
    .then((character)=>{
  
  
        const { name, occupation, weapon, cartoon } = character
        characterAppendToContainer(name, occupation, weapon, cartoon)
   

    })
    .catch(error => console.error('Error while createOneRegister', error))
  });
});
