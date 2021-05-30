const usernameInputField = document.querySelector("#username")
const submitButton = document.querySelector("#submit-button")
const form = document.querySelector("form")

let user;

const token = "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"

const getUserData = async () => {
    try {
        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `bearer ${token}`
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
          window.localStorage.setItem('userData', JSON.stringify(result))
          console.log(JSON.parse(window.localStorage.getItem("userData")).errors)
          JSON.parse(window.localStorage.getItem("userData")).errors ? document.querySelector(".error-message-container").style.display = "flex" : location.href = "/profilePage.html"
    } catch(err) {
        console.log(err)
    }
    }

const formSubmission = (event) => {
    event.preventDefault()
    getUserData()
}

const removeErrorMessage = () => {
    document.querySelector(".error-message-container").style.display = "none"
}

//Form Submission Handlers
form.addEventListener("submit", formSubmission)
submitButton.addEventListener("click", getUserData)
document.querySelector(".close-message").addEventListener("click", removeErrorMessage)