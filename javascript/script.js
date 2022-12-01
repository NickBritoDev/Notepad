const popupBox = document.querySelector('.popup-box')
const closePopupBox = document.querySelector('#close')
const openPopup = document.querySelector('#open')
const addNote = popupBox.querySelector('button')
const title = popupBox.querySelector('input')
const description = popupBox.querySelector('textarea')

closePopupBox.addEventListener("click", (popupBox) => {
    document.querySelector('.popup-box').style.display = "none"
})

openPopup.addEventListener("click", (popupBox) => {
    document.querySelector('.popup-box').style.display = "block"
})

addNote.addEventListener("click", e => {
    e.preventDefault()
    let noteTitle = title.value,
    noteDescr = description.value

    if(noteDescr || noteTitle) {
        let date = new Date()
        console.log(date)
    }
})
