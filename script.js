const apiURL= "https://randomuser.me/api/?";
const listElm = document.getElementById('list');

const fetchUser=(params="results=12")=>{
 fetch(apiURL+params)
 .then(res=>res.json())
 .then(data=>{
   let str="";
   const users=data.results;
   users.map(users=>{
    str+=`
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
    `
   })

   listElm.innerHTML=str;
 });
};
fetchUser();


const handleOnChange = e=>{
  const params ="results=12&gender="+e.value;
  fetchUser(params);
}