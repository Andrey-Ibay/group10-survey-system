const today = new Date();
const date = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

document.querySelector(".today-date").innerText = date;

const demoButtonVendor = document.querySelector(".demographics-button-vendor");
const demoButton = document.querySelector(".demographics-button");
const healthButtonVendor = document.querySelector(".business-info-button");
const healthButton = document.querySelector(".health-status-button");
const demoContainer = document.querySelector(".question-container-demo");
const demoContainerVendor = document.querySelector(".question-container-demo-vendor");
const healthContainers = document.querySelectorAll(".question-container");



const toggleActiveDemo = () => {
    demoButton.style.background = "#36B249";
    demoButton.style.color = "white";
    
    healthButton.style.background = "white";
    healthButton.style.color = "black";

    demoContainer.style.display = "grid"
    healthContainers.forEach(div => div.style.setProperty("display", "none", "important"));
}
const toggleActiveDemoVendor = () => {
    demoButtonVendor.style.background = "#36B249";
    demoButtonVendor.style.color = "white";
    
    healthButtonVendor.style.background = "white";
    healthButtonVendor.style.color = "black";

    demoContainerVendor.style.display = "grid"
    healthContainers.forEach(div => div.style.setProperty("display", "none", "important"));
}

const toggleActiveHealth = () => {
    demoButton.style.background = "white";
    demoButton.style.color = "black";
    
    healthButton.style.background = "#36B249";
    healthButton.style.color = "white";

    demoContainer.style.display = "none";
    healthContainers.forEach(div => div.style.setProperty("display", "grid", "important"));
}
const toggleActiveVendor = () => {
    demoButtonVendor.style.background = "white";
    demoButtonVendor.style.color = "black";
    
    healthButtonVendor.style.background = "#36B249";
    healthButtonVendor.style.color = "white";

    demoContainerVendor.style.display = "none";
    healthContainers.forEach(div => div.style.setProperty("display", "grid", "important"));
}


const healthNavButton = document.querySelector(".health-button");
const vendorNavButton = document.querySelector(".vendor-button");
const healthIcon = document.querySelector(".health-icon");
const vendorIcon = document.querySelector(".vendor-icon");
const healthDashboard = document.querySelector(".health-dashboard-container");
const vendorDashboard = document.querySelector(".vendor-dashboard-container");

const healthNavActive = () => {
    healthNavButton.style.background = "#36B249";
    vendorNavButton.style.background = "white";

    healthNavButton.style.color = "white";
    vendorNavButton.style.color = "black";

    healthIcon.src = "assets/health-icon-active.png";
    vendorIcon.src = "assets/vendor-icon.png";

    healthDashboard.style.display = ""
    vendorDashboard.style.display = "none";
}

const vendorNavActive = () => {
    healthNavButton.style.background = "white";
    vendorNavButton.style.background = "#36B249";

    healthNavButton.style.color = "black";
    vendorNavButton.style.color = "white";

    healthIcon.src = "assets/health-icon.png";
    vendorIcon.src = "assets/vendor-icon-active.png";

    healthDashboard.style.display = "none";
    vendorDashboard.style.display = "flex";
}

const cancelButton = document.querySelector(".cancel-button");
const yesButton = document.querySelector(".yes-logout-button");
const logoutConfirmContainer = document.querySelector(".logout-confirm-container");
const logoutButton = document.querySelector(".log-out-btn");

const toggleLogOut = () => {
    logoutConfirmContainer.style.display = "grid";
}

const cancelLogOut = () => {
    logoutConfirmContainer.style.display = "none";
}

const confirmLogOut = () => {
    window.location.href = "homepage.html";
}