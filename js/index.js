document.addEventListener('DOMContentLoaded', () => {
    // assigning elements to variables in global scope to avoid writing code more than once hopefully
    // let form = document.getElementById('github-form').children;
    // let [searchField, submit] = form
    // console.log(searchField)
    // console.log(submit)
    // submittingUserName()
    // console.log(form)
  

// submits text that user enters to an accesorie function when the submit button is clicked
        const form = document.getElementById('github-form').children;
        let [search, submit] = form
        // console.log(searchField.innerText)
        
        submit.addEventListener('click', e => {
            e.preventDefault()
            const userList = document.getElementById('user-list')
            userList.innerHTML = ''
            const repoList = document.getElementById('repos-list')
            repoList.innerHTML = ''
            const searchField = search.value
            console.log(searchField)
            fetchinUsers(searchField)
            // console.log(e)
            document.getElementById('github-form').reset()
        })
    // }
    // submittingUserName()


// takes text that user enters and uses it to pull up seatch results that match using the github use api
    function fetchinUsers(searchField) {
        fetch(`https://api.github.com/search/users?q=${searchField}`)
        .then(resp => resp.json())
        .then(userSearch => {
            const userData = userSearch.items
            console.log(userData)
            addingUsersToPage(userData)
        })
    }

    // takes the results from searching for users and appends them to the dom so that user can see
    function addingUsersToPage(userData) {
        for (let user of userData) {
            // console.log(user)
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
            <img src='${user.avatar_url}' class='userImg'>
            <h2>Username: ${user.login}</h2>
            <a href='${user.url}'>Profile</a>
            <h3 id='userRepos'>Repos</h3>`
            userDiv.setAttribute('class', 'results')
            const userUl = document.getElementById('user-list');
            userUl.appendChild(userDiv)
            let userRepos = userDiv.querySelector('#userRepos');
            userRepos.style.cursor = 'pointer'
            userRepos.addEventListener('click', e => fetchinTheRepoData(user))
        }
    }
    // fetches the repo data for individual users
    function fetchinTheRepoData(user) {
        // console.log(user)
        fetch(`${user.repos_url}`)
        .then(resp => resp.json())
        .then(repoData => 
            listingTheRepoData(repoData))
    }

    function listingTheRepoData(repoData) {
        console.log(repoData)
        for (const repo of repoData) {
            let repoDiv = document.createElement('div')
            repoDiv.innerHTML = `
            <h3> ${repo.full_name} </h3>
            <a href='${repo.url}'> Visit Repo </a>`
            repoDiv.setAttribute('class', 'repoDiv');
            const reposUl = document.getElementById('repos-list')
            reposUl.appendChild(repoDiv);
        }
    }



/*
The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.

Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)

Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.

Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
*/

/*
add an event listener to the submit button that takes in userneme input from search field when submitted !

use that input to search the github api for users matching that username !

take the data that is returned from searching user api and create elements to display each user returned by the search results

when user clicks on displayed users from search, serach github api for that specific users repos

take thoes repos and create elements to display each repo on the page via the DOM
*/













})