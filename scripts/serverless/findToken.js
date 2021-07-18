const fetch = require("node-fetch")
const { token } = process.env

exports.handler = async () => {
      const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      return {
        statusCode: 200,
        body: result
      }
}