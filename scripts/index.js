const usernameInputField = document.querySelector("#username")
const submitButton = document.querySelector("#submit-button")
const form = document.querySelector("form")
const closeMessage = document.querySelector(".close-message")

let user;

const getUserData = async (event, context) => {
    const res = await fetch("/.netlify/functions/findToken")
    const result = await res.json()
    console.log(result)
    window.localStorage.setItem("userData", JSON.stringify(result))
    JSON.parse(window.localStorage.getItem("userData")).errors ? document.querySelector(".error-message-container").style.display = "flex" : location.href = "/profilePage.html"
}

//Form Submission Handlers
const formSubmission = (event) => {
    event.preventDefault()
    getUserData()
}

form.addEventListener("submit", formSubmission)
submitButton.addEventListener("click", getUserData)

//Error message close button handlers
const removeErrorMessage = () => {
    document.querySelector(".error-message-container").style.display = "none"
}

const removeErrorMessageWithKey = (event) => {
    if (event.keyCode === 13) {
        removeErrorMessage()
    }
}

closeMessage.addEventListener("click", removeErrorMessage)
closeMessage.addEventListener("keyup", removeErrorMessageWithKey)