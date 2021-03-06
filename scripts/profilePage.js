const focusInputDisplay = () => {
    document.querySelector(".input-li-item").style.backgroundColor = "white"
}

const focusMobileInputDisplay = () => {
    document.querySelector(".input-li-item-mobile").style.backgroundColor = "white"
}

const blurInputDisplay = () => {
    document.querySelector(".input-li-item").style.backgroundColor = "#24292e"
}

const blurMobileInputDisplay = () => {
    document.querySelector(".input-li-item-mobile").style.backgroundColor = "#24292e"
}

document.querySelector(".main-menu-navigation-mobile").style.display = "none"
document.querySelector(".profile-image-small").setAttribute("src", `${JSON.parse(window.localStorage.getItem("userData")).data.user.avatarUrl}`)
document.querySelector(".profile-image-small-phone").setAttribute("src", `${JSON.parse(window.localStorage.getItem("userData")).data.user.avatarUrl}`)
document.querySelector(".profile-image-main").setAttribute("src", `${JSON.parse(window.localStorage.getItem("userData")).data.user.avatarUrl}`)
document.querySelector(".profile-image-main-mobile").setAttribute("src", `${JSON.parse(window.localStorage.getItem("userData")).data.user.avatarUrl}`)
document.querySelector(".user-name").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.name
document.querySelector(".user-login").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.login
document.querySelector(".login-mobile").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.login
document.querySelector(".user-bio").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.bio
document.querySelector(".user-name-mobile").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.name
document.querySelector(".user-login-mobile").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.login
document.querySelector(".user-bio-mobile").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.bio
document.querySelector(".number-of-repos").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.repositories.nodes.length
document.querySelector(".number-of-repositories").innerHTML = JSON.parse(window.localStorage.getItem("userData")).data.user.repositories.nodes.length
document.querySelector(".main-search").addEventListener("focus", focusInputDisplay)
document.querySelector(".main-search-mobile").addEventListener("focus", focusMobileInputDisplay)
document.querySelector(".main-search").addEventListener("blur", blurInputDisplay)
document.querySelector(".main-search-mobile").addEventListener("blur", blurMobileInputDisplay)

const toggle = () => {
    document.querySelector(".main-menu-navigation-mobile").style.display = document.querySelector(".main-menu-navigation-mobile").style.display == "none" ? "block" : "none"
}

document.querySelector(".nav-toggle").addEventListener("click", toggle)

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const repositoryList = JSON.parse(window.localStorage.getItem("userData")).data.user.repositories.nodes

const repositoryListRender = (item) => {
    const dateUpdated = item.updatedAt.split(/\D/)
    const today = new Date()

    const repositoryListItem = `<li class="project-container">
        <div class="mini-container">
        <h3 class="repo-name">${item.name}</h3>
        <p class="star-paragraph"><span class="star-image-icon"><img src="../images/star-line.png" alt="" ></span>Star</p>
        </div>
        <p class="repo-description">${item.description ? item.description : ""}</p>
        <p class="project-subitem"><span class="programming-language-colour" style="background-color: ${item.primaryLanguage ? item.primaryLanguage.color : ""};"></span><span class="repo-language">${item.primaryLanguage ? item.primaryLanguage.name : ""}</span></p>
        <p class="project-subitem repo-num-of-stars"><span class="fork-icon-container"><img src="../images/github-fork.png" alt="" ></span>${item.stargazerCount}</p>
        <p class="project-subitem repo-num-of-forks"><span class="star-icon-container"><img src="../images/star-line.png" alt="" ></span>${item.forkCount}</p>
        <p class="project-subitem repo-last-updated">Updated on ${dateUpdated[2][0] == 0 ? dateUpdated[2][1] : dateUpdated[2]} ${monthNames[parseInt(dateUpdated[1]) - 1]}${today.getFullYear() == dateUpdated[0] ? "" : `, ${dateUpdated[0] + ""}`}</p>
        </li>`

    document.querySelector(".repository-list-container").innerHTML += repositoryListItem
}

repositoryList.forEach(repositoryListRender)