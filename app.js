//Stat object to store the state (the inputs).
const state = {};

//Function that takes input from the input fields and stores it in the state object.
const inputHandler = (event) => {
    //Handles checkbox inputs.
    if (event.target.type === "checkbox") {
        //Finds checkboxes with the same name.
        const checkBoxes = event.target.closest(".radio-group").querySelectorAll(`input[name="${event.target.name}"]:checked`);
        //Turns the checkboxes into an array
        const symptoms = Array.from(checkBoxes).map(checkbox => checkbox.value);
        state[event.target.name] = symptoms;
        return;
    }
    const stateKey = event.target.name;
    state[stateKey] = event.target.value;
};

//(test) Callback function to log the state object whenever it changes.
const logState = (mutationList, observer) => {
    for(const mutation of mutationList) {
        if (mutation.type === 'childList') {
            //loops through the state object.
            for(const key in state){
                //takes all input fields then updates the value.
                mutation.target.querySelectorAll(`input[name="${key}"]`).forEach(input => {
                    //if it is a checkbox, it will check the checkbox.
                    if(input.type === "checkbox"){
                        if(state[key].includes(input.value)) {
                            input.checked = true;
                        }
                    }else if(input.type === "radio"){
                        //if it is a radio button, it will check the radio button.
                        input.checked = input.value === state[key];
                    }else{
                        //retains the rest.
                        input.value = state[key];
                    }
                });
            }
            
        }
    }
};

//Function that puts the content on the screen based on the URL. If the URL is "/confirmation", it will render the confirmation section.
function renderContent(currentURL) {
    const cardsContainer = document.querySelector(".cards-container");
    
    //Points toward the template elements in the HTML.
    const sections = {
        confirmationSection: document.querySelector("#confirmationSection"),
        surveySection: document.querySelector("#surveySection"),
        surveySectionVendor: document.querySelector("#surveySectionVendor"),
    }

    //Checks the URL and renders the appropriate section.
    if (currentURL === "/confirmation") {
        const cloneConfirmation = document.importNode(sections.confirmationSection.content, true);
        //Actual rendering of the confirmation section.
        cardsContainer.replaceChildren(cloneConfirmation);
    } else if(currentURL === "/health.html") {
        const cloneSurvey = document.importNode(sections.surveySection.content, true);
        //Actual rendering of the survey section.
        cardsContainer.replaceChildren(cloneSurvey);
    } else if(currentURL === "/vendor.html") {
        const cloneSurvey = document.importNode(sections.surveySectionVendor.content, true);
        //Actual rendering of the survey section.
        cardsContainer.replaceChildren(cloneSurvey);
    }
    
    //listens for input in the cards container and calls the inputHandler function.
    cardsContainer.addEventListener("input", (event) => {
        inputHandler(event);
    });
    
    //Creates a MutationObserver to watch for changes in the cards container and calls the logState function whenever there is a change.
    const observer = new MutationObserver(logState);
    //Observes the cards container for changes in the child elements (when the content is rendered).
    observer.observe(cardsContainer, { childList: true});
    console.log(state);
};

//Pushes the URL to the browser and renders the content
const navigateToSection = (url) => {
    window.history.pushState({state}, "", url);
    renderContent(url);
};

//Event listener for the next button.
const navigate = (url) => {
    //Prevents the page from refreshing
    window.event.preventDefault();
    navigateToSection(url);
};

//Function for the Back button to go back to the previous page.
const goBack = () => {
    window.history.back();
}

//"popstate" is triggered when the user clicks the back or forward button. It will render the content based on the URL.
window.addEventListener("popstate", () => {
    renderContent(window.location.pathname);
});

//Renders the initial content on the page.
window.addEventListener("DOMContentLoaded", () => {
    renderContent(window.location.pathname);
});
