function searchBarToggle() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
let addPost = false;
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#create-post")
    const postContainer = document.querySelector(".container")
    const form = document.querySelector('.add-post-form')
    form.addEventListener('submit', submitPost)
    document.addEventListener("click", (event) => {
      if(event.target.matches('.goated-btn')) {
        addGoats(event)
      } else if (event.target.matches('.fire-btn')) {
        addOnFire(event)
      }
    })
    addBtn.addEventListener("click", () => {
        addPost = !addPost;
        if (addPost) {
            postContainer.style.display = "block";
        } else {
            postContainer.style.display = "none";
        }
    })
    retrievePosts()
})
const baseURL = 'http://localhost:3000/posts'
function renderPosts(post){
  const div = document.createElement("div");
  div.classList.add('card');
  const title = document.createElement('h2');
  title.textContent = post.title;
  const message = document.createElement('p');
  message.textContent = post.message;
  const goat = document.createElement('button');
  const fire = document.createElement('button');
  const laughs = document.createElement('button');
  goat.classList.add('goated-btn');
  fire.classList.add('fire-btn');
  laughs.classList.add('laughs-btn');
  goat.textContent = `${post.goat} 🐐`;
  fire.textContent = `${post.fire} 🔥`;
  laughs.textContent = `${post.laughs} 😂`;
  goat.id = post.id
  fire.id = post.id
  laughs.id = post.id
  const tag = document.createElement('span')
  tag.classList.add('post-tag');
  tag.textContent = post.tag
  div.append(title, message, tag, goat, fire, laughs);
  document.getElementById('post-collection').appendChild(div);
}

function retrievePosts() {
  fetch(baseURL)
  .then(response => response.json())
  .then(data => data.forEach(post => renderPosts(post)))
}

function submitPost(event) {
  event.preventDefault()
  const [title, message, tag] = event.target

  fetch(baseURL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      title: title.value,
      message: message.value,
      tag: tag.value,
      goat: 0,
      fire: 0,
      laughs: 0
    })
  })
  .then(resp => resp.json())
  .then(resp => renderPosts(resp))
  .catch(error => ("There is an error with the code.", error))
  title.value = ""
  message.value = ""
  tag.value = ""
}

function addGoats(event) {
  event.preventDefault()
  let more = parseInt(event.target.innerText) + 1

  fetch(`http://localhost:3000/posts/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "goat": more    
    })
  })
  .then(resp => resp.json())
  .then((data => {
    event.target.innerText = `${more}🐐`
  }))
}

function addOnFire(event) {
  event.preventDefault()
  let more = parseInt(event.target.innerText) + 1

  fetch(`http://localhost:3000/posts/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "fire": more    
    })
  })
  .then(resp => resp.json())
  .then((data => {
    event.target.innerText = `${more}🔥`
  }))
}