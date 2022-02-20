const apiURL = "https://randomuser.me/api/?";
const listElm = document.getElementById('list');
const searchTerm = document.getElementById('query');
let users = [];

const fetchUser = (params = "results=20") => {
  fetch(apiURL + params)
    .then(res => res.json())
    .then(data => {
      users = data.results;
      console.log(typeof(users))
      generateCard(users);
    });
};

fetchUser();

const displayCard = (users) => {
  let str="";
  if(users.length){
    generateCard(users);
    }
  else{
     str=`<div class="alert alert-danger" role="alert">
   The user is not found, my friend !
    </div>`
    listElm.innerHTML=str;
  }

};

const handleOnChange = e => {
  const params = "results=12&gender=" + e.value;
  fetchUser(params);
};

const handleOnType = e => {
  
  const foundUser = users.filter((item) => {
   // item?.name.first //nullish operator
    const userName = `${item.name.first} ${item.name.last}`.toLowerCase();
    if (userName.includes(e.value.toLowerCase())) { 
      
      return item
    }
  }
  );
  displayCard(foundUser);
}
const generateCard = (users)=>{
  let str="";
  str+=`<h3 class="text-center"> Number of users found <span class="count">${users.length}</span></h3>`

  users.forEach(e=>{
    str+=`
    <div class="col-md-6 col-lg-3 py-3">
    <div class="card h-100" style="width: 20rem;">
      <img src="${e.picture.large}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${e.name.title}. ${e.name.first} ${e.name.last}</h5>
        <p class="card-text">
        <ul class="list-unstyled">
        <li> <i class="fa-solid fa-phone text-center pt-2 mt-2"></i>
        ${e.phone}</li>
        <li>
        <i class="fa-solid fa-envelope text-center pt-2 mt-2"></i>${e.email}</li>
        <li><i class="fa-solid fa-location-dot text-center pt-2 mt-2"></i> ${e.location.city} ${e.location.state} ${e.location.postcode} , ${e.location.country} </li>
        </ul>
        </p>
      </div>
    </div>
  </div>
    `

  });
  listElm.innerHTML=str;
}