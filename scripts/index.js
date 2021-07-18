const usernameInputField = document.querySelector("#username")
const submitButton = document.querySelector("#submit-button")
const form = document.querySelector("form")
const closeMessage = document.querySelector(".close-message")

let user;

const tokenUrl = "/.netlify/functions/findToken"

const getUserData = async () => {
    try {
        const token = await fetch(tokenUrl)
        const parsedToken = await token.text()
        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `bearer ${parsedToken}`
            },
            body: JSON.stringify({
              query: `
              query {
                  user (login: "${usernameInputField.value}") {
                      name
                      url
                      avatarUrl
                      bio
                      login
                          repositories (last: 20) {
                                  nodes {
                                      name
                                      updatedAt
                                      description
                                      forkCount
                                      url
                                      stargazerCount
                                      primaryLanguage {
                                          name
                                          color
                                      }
                                  }
                          }
                  }
                }`
            })
          })
          const result = await res.json()
          window.localStorage.setItem("userData", JSON.stringify(result))
          JSON.parse(window.localStorage.getItem("userData")).errors ? document.querySelector(".error-message-container").style.display = "flex" : location.href = "/profilePage.html"
    } catch(err) {
        console.log(err)
    }
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