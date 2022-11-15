const baseURL = 'http://localhost:3000/posts'
let postCollect = document.getElementById('post-collection')
let posts = []

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#create-post")
  const postContainer = document.querySelector(".container")
  const form = document.querySelector('.add-post-form')
  let dl = document.querySelector("#dlmode")
  let addPost = false;

  form.addEventListener('submit', submitPost)

  document.addEventListener("click", (event) => {
    if(event.target.matches('.goated-btn')) {
      addGoats(event)
    } else if (event.target.matches('.fire-btn')) {
      addOnFire(event)
    } else if (event.target.matches('.laughs-btn')) {
      addLaughs(event)
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


  dl.addEventListener('click', () => {
    if (dl.innerText=="Dark Mode🌙") {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.toggle("dark-mode")
      dl.textContent="Light Mode☀️"
    } else if (dl.textContent=="Light Mode☀️"){
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.toggle("dark-mode")
      dl.textContent="Dark Mode🌙"
    }
  })


  function renderPosts(post){
    const table = document.createElement("table");
    table.classList.add("card");
    table.id = post.id
    const trFirst = document.createElement("tr");
    const tdFirst = document.createElement("td");
    tdFirst.classList.add("left-side-btns");
    tdFirst.rowSpan=4
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
    tdFirst.append(goat, fire, laughs);
    const tdSecond = document.createElement("td");
    tdSecond.classList.add("titles");
    tdSecond.textContent = post.title
    trFirst.append(tdFirst, tdSecond);
    const trSecond = document.createElement("tr");
    const tdThird = document.createElement("td");
    tdThird.classList.add("message");
    const div = document.createElement("div");
    div.textContent = post.message
    tdThird.append(div);
    trSecond.append(tdThird);
    const trThird = document.createElement("tr");
    const tdFourth = document.createElement("td");
    tdFourth.classList.add("post-tags")
    tdFourth.textContent = post.tag
    trThird.append(tdFourth)
    const trFourth = document.createElement("tr")
    const tdFifth = document.createElement("td")
    tdFifth.classList.add("date")
    tdFifth.textContent = tdFifth.date;
    trFourth.append(tdFifth)
    table.append(trFirst, trSecond, trThird, trFourth);
    postCollect.appendChild(table);
  }

  function retrievePosts() {
    fetch(baseURL)
    .then(response => response.json())
    .then((data) => {
      posts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      posts = data.forEach(post => renderPosts(post))
    })
  }

  function submitPost(event) {
    event.preventDefault()
    const [title, message, tag, date] = event.target

    fetch(baseURL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        title: title.value,
        message: message.value,
        tag: tag.value,
        date: new Date().toJSON().slice(0, 10),
        goat: 0,
        fire: 0,
        laughs: 0,

      })
    })
    .then(resp => resp.json())
    .then(resp => renderPosts(resp))
    .catch(error => ("There is an error with the code.", error))
    title.value = ""
    message.value = ""
    tag.value = ""
    date.value = ""
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

  function addLaughs(event) {
    event.preventDefault()
    let more = parseInt(event.target.innerText) + 1

    fetch(`http://localhost:3000/posts/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "laughs": more    
      })
    })
    .then(resp => resp.json())
    .then((data => {
      event.target.innerText = `${more}😂`
    }))
  }
})