const apiURL = "https://randomuser.me/api/?";
const listElm = document.getElementById('list');
const searchTerm = document.getElementById('query');
let users = "";
const fetchUser = (params = "results=12") => {
  fetch(apiURL + params)
    .then(res => res.json())
    .then(data => {
      let str = "";
      users = data.results;
      users.map(users => {
        str += `
    <div class="col-md-6 col-lg-3 py-3">
    <div class="card h-100" style="width: 20rem;">
      <img src="${users.picture.large}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${users.name.title}. ${users.name.first} ${users.name.last}</h5>
        <p class="card-text">
        <ul class="list-unstyled">
        <li> <i class="fa-solid fa-phone text-center pt-2 mt-2"></i>
        ${users.phone}</li>
        <li>
        <i class="fa-solid fa-envelope text-center pt-2 mt-2"></i>${users.email}</li>
        <li><i class="fa-solid fa-location-dot text-center pt-2 mt-2"></i> ${users.location.city} ${users.location.state} ${users.location.postcode} , ${users.location.country} </li>
        </ul>
        </p>
      </div>
    </div>
  </div>
    `;
      });

      listElm.innerHTML = str;
    });
};
fetchUser();

const displayCard = (users) => {
  let str="";
  if(users){
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
      listElm.innerHTML=str;
    })
   
  }
};

const handleOnChange = e => {
  const params = "results=12&gender=" + e.value;
  fetchUser(params);
};

const handleOnType = e => {
  if(e.value===""){
   let str=`<div class="alert alert-danger" role="alert">
   The search bar is empty, my friend !
 </div>`
 listElm.innerHTML=str;
  }
  let user=[];
  const foundUser = users.filter((item) => {
   // item?.name.first //nullish operator
    const userName = `${item.name.first} ${item.name.last}`.toLowerCase();
    if (userName.includes(e.value.toLowerCase())) { 
      user.push(item);
      displayCard(user);
    }
  }
  );
}
