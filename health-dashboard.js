const today = new Date();
const date = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

document.querySelector(".today-date").innerText = date;