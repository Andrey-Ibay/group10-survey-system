const { createClient } = supabase;
const db = createClient("https://yscicfmmwkikbdfvtwki.supabase.co", "sb_publishable_UZRIEjWtSTAZ1KflVlJVyA_2Ue2Dbuf");


const eyeDash = document.querySelector(".eye-dash");
const passwordField = document.querySelector(".input-password");
const inputField = document.querySelector(".input-email");
const loginContainer = document.querySelector(".login-container");
const loginIcon = document.querySelector(".pfp");
const mainContainer = document.querySelector(".main-container");
const closeButton = document.querySelector(".close-btn");
const loginButton = document.querySelector(".login-button");

async function adminLogin(){
    const email = inputField.value.trim();
    const password = passwordField.value.trim();
    const { data, error } = await db.auth.signInWithPassword({
        email,
        password
    });

    if(error){
        alert("Error: " + error.message);
        return;
    }

    window.location.href = "health-dashboard.html";
}


let loginToggle = false;

const changeIcon = () => {
    eyeDash.style.display.includes("flex") ? eyeDash.style.display = "none" : eyeDash.style.display = "flex";

    passwordField.type.includes("password") ? passwordField.type = "text" : passwordField.type = "password";
}

passwordField.addEventListener("focus", () => {
    eyeDash.style.top = "65.35%";
});

passwordField.addEventListener("blur", () => {
    eyeDash.style.top = "65.25%";
});

inputField.addEventListener("focus", () => {
    eyeDash.style.top = "65.35%";
});

inputField.addEventListener("blur", () => {
    eyeDash.style.top = "65.25%";
});

const toggleLogIn = () => {
    if (!loginToggle) {
        loginToggle = true;
        loginContainer.style.display = "flex";
        document.body.style.overflow = "hidden";

        mainContainer.style.filter = "blur(8px)";
        mainContainer.style.pointerEvents = "none";
        mainContainer.style.userSelect = "none";

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // This creates the sliding effect instead of a jump
        });
    } else {
        loginToggle = false;
        closeLogIn();
    }
}

const closeLogIn = () => {
    loginToggle = false;
    loginContainer.style.display = "none";
    document.body.style.overflow = "";

    mainContainer.style.filter = "";
    mainContainer.style.pointerEvents = "";
    mainContainer.style.userSelect = "";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const isVisible = window.getComputedStyle(loginContainer).display === "flex";
        const currentEmail = inputField.value.trim();
        const currentPass = passwordField.value.trim();

        if (isVisible && currentEmail !== "" && currentPass !== "") {
            loginAdmin();
        }
    }
});

const contactContainer = document.querySelector(".contact-container");
const contactNav = document.querySelector(".nav-contact");
const contactName = document.querySelector(".contact-name");
const contactMessage = document.querySelector(".contact-message");

function sendMail() {
    const currentName = contactName.value;
    const currentMessage = contactMessage.value;

    let params = {
        name: currentName,
        message: currentMessage
    }

    if (currentName === "") {
            contactName.classList.add("error-border");
    } else {
        contactName.classList.remove("error-border");
    }

    if (currentMessage === "") {
        contactMessage.classList.add("error-border");
    } else {
        contactMessage.classList.remove("error-border");
    }

    if (currentName !== "" && currentMessage !== "") {
            emailjs.send("service_31efqoe", "template_tci35nl", params)
        .then(function() {
            alert("Message Sent Successfully!");
        })
        .catch(function(error) {
            alert("Failed to send message");
            console.log(error);
        });

        setTimeout (() => {
            contactName.value = "";
            contactMessage.value = "";
        }, 1500)
    }
}

const closeContact = () => {
    contactContainer.style.display = "none";
}

const showContact = () => {
    contactContainer.style.display = "grid";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {

        const isRendered = window.getComputedStyle(contactContainer).display === "grid";

        const currentName = contactName.value;
        const currentMessage = contactMessage.value;

        if (isRendered && currentName !== "" && currentMessage !== "") {
            e.preventDefault();
            sendMail();
            return;
        }

        e.preventDefault();

        if (currentName === "") {
            contactName.classList.add("error-border");
        } else {
            contactName.classList.remove("error-border");
        }

        if (currentMessage === "") {
            contactMessage.classList.add("error-border");
        } else {
            contactMessage.classList.remove("error-border");
        }
    }
});

contactName.addEventListener("input", () => {
    let value = contactName.value;

    contactName.value = value.replace(/[0-9]/g, "");
});

contactName.addEventListener("focus", () => {
    contactName.classList.remove("error-border");
});

contactMessage.addEventListener("focus", () => {
    contactMessage.classList.remove("error-border");
});