function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  function filterFunction() {
    let input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByClassName("tag");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
let addPost = false;
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#create-post")
    const postContainer = document.querySelector(".container")
    const form = document.querySelector('.add-post-form')
    addBtn.addEventListener("click", () => {
        addPost = !addPost;
        if (addPost) {
            postContainer.style.display = "block";
        } else {
            postContainer.style.display = "none";
        }
    })
})
const baseURL = 'http://localhost:3000/posts'
const postCollection = document.getElementById('post-collection')
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
  laughs.textContent = `${post.laughs}😂`;
  goat.id = post.id
  fire.id = post.id
  laughs.id = post.id
  div.append(title, message, goat, fire, laughs);
  postCollection.appendChild(div);
}