// IMPORTANT - substitute your own backend url!
const API_BACKEND_URL0 = "https://week4-backend.vercel.app";  

const itemName = document.getElementById('inpName');
const itemDesc = document.getElementById('inpDescItem');

const btnAdd = document.getElementById('btnAdd');
const btnList = document.getElementById('btnList');

const itemList = document.getElementById('lstItems');


btnAdd.addEventListener('click', addItem );

btnList.addEventListener('click', listItems );


async function addItem() {

    let new_item_name = itemName.value;
    let new_item_desc = itemDesc.value;

    // could check that name,desc are not blank

    // call the back-end route that adds a record
    await fetch(`${API_BACKEND_URL0}/item`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_item_name,new_item_desc }),
    });

}

async function listItems() {
    // call the backend route that gets all records
    let resp = await fetch(`${API_BACKEND_URL0}/items`);
    let data = await resp.json();
    console.log(data);

    itemList.innerHTML = ""; // clear list

    for( item of data ) {
        let li = document.createElement('li');
        li.textContent = item.item_name + ' - ' + item.item_desc;
        itemList.appendChild(li);
    }

}

// IMPORTANT: fill in your own backend url vercel link
const API_BASE_URL = 'https://week4-backend.vercel.app';

async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;
  const urlDesc = document.getElementById("urlDesc").value;
  const response = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ longUrl,urlDesc }),
  });
  const data = await response.json();
  document.getElementById("result").innerText = `Short URL: ${API_BASE_URL}/${data.shortCode}`;
}


async function getUrls() {  
  const response = await fetch(`${API_BASE_URL}/urls`);
  const data = await response.json();
  const ul = document.querySelector('ul');
  
  ul.innerHTML = '';  // clear list 
  
  for( {shortcode,urldesc} of data) {
    let li = document.createElement('li');
    let anc = document.createElement('a');  // anchor tag

    anc.href = `${API_BASE_URL}/${shortcode}`;
    anc.text = urldesc;
    anc.target = "_blank";

    li.appendChild(anc);
    ul.appendChild(li);

  }
}

// IMPORTANT!! // replace with your own backend url
const API_BACKEND_URL = "https://week4-backend.vercel.app";  

let dateInput = document.getElementById('dateInput');
let timeInput = document.getElementById('timeInput');
let descInput = document.getElementById('inpDesc');

let btnBook = document.getElementById('btnBook');
let btnShow = document.getElementById('btnShow');

let msg = document.getElementById('message');


btnBook.addEventListener('click', bookAppoinment);
btnShow.addEventListener('click', showAppointments);


async function bookAppoinment() {

    // check inputs first
    if( dateInput.value.trim() === '') {
        msg.textContent = "You must select a date!";
        return;
    }
    if( timeInput.value.trim() === '') {
        msg.textContent = "You must select a time!";
        return;
    }
    if( descInput.value.trim() === '') {
        msg.textContent = "You must enter a brief description!";
        return;
    }



    let new_appt_datetime = `${dateInput.value} ${timeInput.value}:00`;
    let new_appt_desc = descInput.value;
    
    let resp = await fetch(`${API_BACKEND_URL}/appointment`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_appt_datetime, new_appt_desc }),
    });

    let data = await resp.json();

    console.log(data);    

    if(data?.success) {
        msg.textContent = "Your appointment has been booked!";
    } else {
        msg.textContent = "Error! Please try again.";
    }

    // clear values
    dateInput.value = '';
    timeInput.value = '';
    descInput.value = '';

    await showAppointments();
    
};


async function showAppointments() {
    let resp = await fetch(`${API_BACKEND_URL}/appointments`);
    let data = await resp.json();
    console.log(data);

    let ul = document.getElementById('lstBookings');
    ul.innerHTML = ""; // clear list

    for( appt of data ) {
        let li = document.createElement('li');
        li.textContent = appt.appt_datetime.replace('T',' ') + ' - ' + appt.appt_desc;
        ul.appendChild(li);
    }
    
}