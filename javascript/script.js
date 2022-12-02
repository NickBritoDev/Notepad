const popupBox = document.querySelector('.popup-box')
const closePopupBox = document.querySelector('#close')
const openPopup = document.querySelector('#open')
const addNote = popupBox.querySelector('button')
const title = popupBox.querySelector('input')
const description = popupBox.querySelector('textarea')
const addBox = document.querySelector('.add-box')

const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

const notes = JSON.parse(localStorage.getItem("notes") || "[]")

closePopupBox.addEventListener("click", (popupBox) => {
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

        notes.push(noteInfo)
        localStorage.setItem("notes", JSON.stringify(notes))
        closePopupBox.click()
        showNotes()
    }
})

function showNotes(){
    notes.forEach((note) => {
        let liTag = `<li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.description}</span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <div class="settings">
                                    <i class="bi bi-three-dots"></i>
                                    <ul class="menu">
                                        <li><i class="bi bi-pen"></i>Edit</li>
                                        <li><i class="bi bi-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </div>
                        </li>`
        addBox.insertAdjacentHTML("afterend", liTag)
    } )
}
showNotes()