async function getAllFunction() {
    try {
        const res = await fetch(`http://localhost:3000/albums`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
async function postFunction(test) {
    try {
        const res = await fetch(`http://localhost:3000/albums`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: test,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function putFunction(test, id) {
    try {
        const res = await fetch(`http://localhost:3000/albums/${id}`, {
            method: 'PUT',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: test,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteFunction(id) {
    try {
        const res = await fetch(`http://localhost:3000/albums/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

let albums = [];
let selectedAlbumId = 0;
const albumList = document.getElementById("lista");
const information = document.getElementById("information");
const addButton = document.getElementById("showAlbumAddButton");
const addField = document.getElementById("addAlbum");
const datas =document.getElementById("datas")

let inputFieldsString = `<label for="albumNameInput" class="inputLabel">Album neve:</label>
            <input type="text" id="albumNameInput">
            <br>
            <label for="bandNameInput" class="inputLabel">Banda neve:</label>
            <input type="text" id="BandNameInput">
<br>
            <label for="numberOfSongsInput" class="inputLabel">Zeneszámok száma:</label>
            <input type="number" id="numberOfSongsInput" min="1">
<br>
            <label for="lengthInput" class="inputLabel">Hossza:</label>
            <input type="number" id="lengthInput" min="1">
<br>
            <p id="message"></p>`;

window.onload = async function () {
    albums = await getAllFunction();
    information.style.display = "none";
    addField.style.display = "none";
    if(albums.length > 0)
    {
    createList();
    }
    else
    {
        albumList.style.display = "none";
    }
}

function createList() {
    albumList.style.display = "block"
    addButton.style.display = "block"
    let listString = "";
    listString += "<ol>"
    for (let i = 0; i < albums.length; i++) {
        listString += `<li id=${albums[i].id}>${albums[i].name}</li>`;
    }

    albumList.innerHTML = listString
    addEventListenerToLi()
}

function addEventListenerToLi() {
    const listElements = document.getElementsByTagName("li")
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].addEventListener("click", (event) => { selectedAlbumId = event.target.id })
        listElements[i].addEventListener("click", writeInformation)
    }
}

async function writeInformation() {
    albumList.style.display = "none";
    addButton.style.display = "none";
    information.style.display = "block";
        if( datas.innerHTML !="")
        {
            datas.innerHTML="";
        }
        let album ;
        for(let i = 0; i< albums.length; i++)
        {
            if(albums[i].id == selectedAlbumId)
            {
                album = albums[i];
                break;
            }
        }
    datas.innerHTML += `
            <button id="back" onclick="closeInformation()"> Vissza </button>
   <p class="data">album neve: ${album.name}</p>
    <p class="data">bande neve: ${album.band}</p>
    <p class="data">album zenéinek száma: ${album.numberOfSongs} darab</p>
    <p class="data">album hossza: ${album.length} perc</p>
        <p id='updateField'><label for="albumNameInput" class="inputLabel">Album neve:</label>
            <input type="text" id="albumNameInput" value='${album.name}'>
            <br>
            <label for="bandNameInput" class="inputLabel" >Banda neve:</label>
            <input type="text" id="BandNameInput" value='${album.band}'>
<br>
            <label for="numberOfSongsInput" class="inputLabel" >Zeneszámok száma:</label>
            <input type="number" id="numberOfSongsInput" min="1" value='${album.numberOfSongs}'>
<br>
            <label for="lengthInput" class="inputLabel" >Hossza:</label>
            <input type="number" id="lengthInput" min="1" value='${album.length}'>
<br>
            <p id="message"></p>
    <button id="albumUpdateButton" onclick="updateAlbum()">Album módosítása</button> <button id="albumDeleteButton" onclick="deleteAlbum()">Album törlése</button>` 
}

function displayAddAlbumField() {
    addButton.style.display = "none";
    albumList.style.display = "none";
    addField.style.display = "block";
    addField.innerHTML =`<button id="back" onclick="closeInformation()"> Vissza </button>`+ inputFieldsString + `<button id="AlbumAddButton" onclick="addAlbum()">Album hozzáadása</button>`
}


async function addAlbum() {
    albumList.style.display = "none";
const name = document.getElementById("albumNameInput").value
const band = document.getElementById("BandNameInput").value
const numberOfSongs = document.getElementById("numberOfSongsInput").value
const length = document.getElementById("lengthInput").value

    if (name != undefined && name.trim().length > 0 && band != undefined && band.trim().length > 0 && numberOfSongs != undefined && numberOfSongs > 0 && length != undefined && length > 0) {
        for(let i = 0; i < albums.length; i++)
        {
            if(name.trim() == albums[i].name)
            {
                document.getElementById("message").innerHTML = "Album ilyen névvel már létezik!"
                return
            }
        }
        let test = {
            "name": `${name.trim()}`,
            "band": `${band.trim()}`,
            "numberOfSongs": parseInt(numberOfSongs),
            "length" : parseInt(length)
        }
        await postFunction(JSON.stringify(test));
        albums = await getAllFunction();
       createList()
       addButton.style.display = "block";
    addField.style.display = "none";
    addField.innerHTML = ""
    }
    else {
        document.getElementById("message").innerHTML = "Adjon meg minden adatot(a számadatok nem lehetnek 0 vagy az alattiak)!"
    }
}

async function deleteAlbum() {
    await deleteFunction(parseInt(selectedAlbumId));
    datas.innerHTML = "";
        information.style.display = "none";
    albums = await getAllFunction();
    if(albums.length == 0)
    {
        albumList.style.display = "none"
        addButton.style.display = "block"
    }
    else
    {
   createList()
}
}

async function updateAlbum() {
    const name = document.getElementById("albumNameInput").value
    const band = document.getElementById("BandNameInput").value
    const numberOfSongs = document.getElementById("numberOfSongsInput").value
    const length = document.getElementById("lengthInput").value

    if (name != undefined && name.trim().length > 0 && band != undefined && band.trim().length > 0 && numberOfSongs != undefined && numberOfSongs > 0 && length != undefined && length > 0) {
        for(let i = 0; i < albums.length; i++)
            {
                if(name.trim() == albums[i].name)
                {
                    document.getElementById("message").innerHTML = "Album ilyen névvel már létezik!"
                    return
                }
            }
        
        let test = {
           "name": `${name.trim()}`,
            "band": `${band.trim()}`,
            "numberOfSongs": parseInt(numberOfSongs),
            "length" : parseInt(length)
        }
        await putFunction(JSON.stringify(test), selectedAlbumId);
        albums = await getAllFunction();
        datas.innerHTML = "";
        information.style.display = "none";
        createList()

    }
    else {
        message.innerHTML = "Adjon meg minden adatot(a számadatok nem lehetnek 0 vagy az alattiak)!"
    }
}

function closeInformation()
{
    if(albums.length == null || albums.length == 0)
    {
        albumList.style.display = "none"
        datas.innerHTML = "";
        addField.style.display = "none"
        information.style.display = "none";
        addButton.style.display = "block"
        
    }
    else
    {
    createList()
    datas.innerHTML = "";
    addField.style.display = "none"
    information.style.display = "none";
    }
}