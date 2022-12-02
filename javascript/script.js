const popupBox = document.querySelector('.popup-box')
const closePopupBox = document.querySelector('#close')
const openPopup = document.querySelector('#open')
const addNote = popupBox.querySelector('button')
const popupTitle = popupBox.querySelector('header p')
const title = popupBox.querySelector('input')
const description = popupBox.querySelector('textarea')
const addBox = document.querySelector('.add-box')

const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

const notes = JSON.parse(localStorage.getItem("notes") || "[]")
let isUpdate = false, updateID

closePopupBox.addEventListener("click", (popupBox) => {
    isUpdate = false
    title.value = ""
    description.value = ""
    addNote.innerText = " Add Note"
    popupTitle.innerText = "Add A New Note"
    document.querySelector('.popup-box').style.display = "none"
})

openPopup.addEventListener("click", (popupBox) => {
    document.querySelector('.popup-box').style.display = "block"
})

addNote.addEventListener("click", e => {
    e.preventDefault()
    let noteTitle = title.value,
    noteDescr = description.value;

    if(noteDescr || noteTitle) {
        const date = new Date()
        const month = months[date.getMonth()]
        const day = date.getDay() - 3
        const year = date.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDescr,
            date: ` ${day} ${month} de ${year}`
        }

        if(!isUpdate){
            notes.push(noteInfo)
        } else {
            isUpdate = false
            notes[updateID] = noteInfo
        }

        localStorage.setItem("notes", JSON.stringify(notes))
        closePopupBox.click()
        showNotes()
    }
})

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.description}</span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <div class="settings">
                                    <ul class="menu">
                                        <li><i onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="bi bi-pen"></i></li>
                                        <li><i onclick="deleteNote(${index})" class="bi bi-trash"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </li>`
        addBox.insertAdjacentHTML("afterend", liTag)
    } )
}
showNotes()

function deleteNote(noteID){
    notes.splice(noteID, 1)
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes()
}

function updateNote(noteID, tit, desc){
    updateID = noteID
    isUpdate = true
    openPopup.click()
    title.value = tit;
    description.value = desc;
    addNote.innerText = "Update A Note"
    popupTitle.innerText = "Update A Note"
}