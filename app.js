const { createClient } = supabase;
const db = createClient("https://yscicfmmwkikbdfvtwki.supabase.co", "sb_publishable_UZRIEjWtSTAZ1KflVlJVyA_2Ue2Dbuf");

// -------------------------------SURVEY SIDE SCRIPT--------------------------

//Stat object to store the state (the inputs).
const state = {};

const confirmationUpdateHealth = (state) => {
    //Updates the confirmation section with the values from the state object.
    document.getElementById("username").textContent = state.user_name || "N / A";
    document.getElementById("age").textContent = state.age || "N / A";
    document.getElementById("dob").textContent = state.date_of_birth || "N / A";
    document.getElementById("emergency_contact").textContent = state.emergency_contact || "N / A";
    document.getElementById("gender").textContent = state.sex || "N / A";
    document.getElementById("address").textContent = state.address || "N / A";
    document.getElementById("last_medical_checkup").textContent = state.last_checkup || "N / A";
    document.getElementById("symptoms").textContent = state.symptoms ? state.symptoms.join(", ") : "N / A";
    document.getElementById("other_symptoms").textContent = state.other_symptoms || "N / A";
    document.getElementById("access").textContent = state.access || "N / A";
    document.getElementById("vaccination_status").textContent = state.vaccination_status?.replaceAll("_", " ") || "N / A";
    document.getElementById("medication").textContent = state.medication || "N / A";
    document.getElementById("smoking").textContent = state.smoking || "N / A";
    document.getElementById("conditions").textContent = state.conditions || "N / A";
    document.getElementById("alcohol").textContent = state.alcohol?.replaceAll("_", " ") || "N / A";
    document.getElementById("exercise").textContent = state.exercise?.replaceAll("_", " ") || "N / A";
    document.getElementById("sleep").textContent = state.sleep?.replaceAll("_", " ") || "N / A";
    document.getElementById("contact_contagious_14days").textContent = state.contact_contagious_14days || "N / A";
    document.getElementById("dengue_typhoid_6months").textContent = state.dengue_typhoid_6months || "N / A";
    document.getElementById("mental_health_2weeks").textContent = state.mental_health_2weeks?.replaceAll("_", " ") || "N / A";
    document.getElementById("additional_notes").textContent = state.additional_notes || "N / A";
};

const confirmationUpdateVendor = (state) => {
    //Updates the confirmation section with the values from the state object.
    document.getElementById("user_name").textContent = state.user_name || "N / A";
    document.getElementById("permit_num").textContent = state.permit_num || "N / A";
    document.getElementById("sanitary_permit_num").textContent = state.sanitary_permit_num || "N / A";
    document.getElementById("waste_management").textContent = state.waste_management ? state.waste_management.join(", ").replaceAll("_", " ") : "N / A";
    document.getElementById("waste_management_others").textContent = state.waste_management_others || "N / A";
    document.getElementById("sanitary_rating").textContent = state.sanitary || "N / A";
    document.getElementById("start_time").textContent = state.start_time || "N / A";
    document.getElementById("end_time").textContent = state.end_time || "N / A";
    document.getElementById("additional_notes").textContent = state.additional_notes || "N / A";
    document.getElementById("address").textContent = state.business_address || "N / A";
    document.getElementById("contact_num").textContent = state.contact_num || "N / A";
    document.getElementById("gender").textContent = state.sex || "N / A";
    document.getElementById("age").textContent = state.age || "N / A";
    document.getElementById("telephone_num").textContent = state.telephone_num || "N / A";
    document.getElementById("stall_num").textContent = state.stall_num || "N / A";
    document.getElementById("business_trade_name").textContent = state.business_trade_name || "N / A";
    document.getElementById("product_category").textContent = state.product_category || "N / A";
};

//Function that takes input from the input fields and stores it in the state object.
const inputHandler = (event) => {
    //Handles checkbox inputs.
    if (event.target.type === "checkbox") {
        //Finds checkboxes with the same name.
        const checkBoxes = event.target.closest(".radio-group").querySelectorAll(`input[name="${event.target.name}"]:checked, textarea[name="${event.target.name}"], select[name="${event.target.name}"]`);
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
                mutation.target.querySelectorAll(`input[name="${key}"], textarea[name="${key}"], select[name="${key}"]`).forEach(input => {
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
function renderContent(currentURL, previousURL) {
    const cardsContainer = document.querySelector(".cards-container");
    
    //Points toward the template elements in the HTML.
    const sections = {
        confirmationSection: document.querySelector("#confirmationSection"),
        surveySectionHealth: document.querySelector("#surveySection"),
        surveySectionVendor: document.querySelector("#surveySectionVendor"),
        surveySectionFinished: document.querySelector("#finishSection")
    }

    //Checks the URL and renders the appropriate section.
    if (currentURL === "/confirmation") {
        const cloneConfirmation = document.importNode(sections.confirmationSection.content, true);
        //Actual rendering of the confirmation section.
        cardsContainer.replaceChildren(cloneConfirmation);
        if(previousURL === "/health.html"){
            confirmationUpdateHealth(state);
        }else if(previousURL === "/vendor.html"){
            confirmationUpdateVendor(state);
        }
    } else if(currentURL === "/health.html") {
        const cloneSurvey = document.importNode(sections.surveySectionHealth.content, true);
        //Actual rendering of the survey section.
        cardsContainer.replaceChildren(cloneSurvey);
    } else if(currentURL === "/vendor.html") {
        const cloneSurvey = document.importNode(sections.surveySectionVendor.content, true);
        //Actual rendering of the survey section.
        cardsContainer.replaceChildren(cloneSurvey);
    } else if(currentURL === "/finish"){
        const cloneSurvey = document.importNode(sections.surveySectionFinished.content, true);
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
const navigateToSection = (url, currentURL) => {
    window.history.pushState({state}, "", url);
    //url is the next section, currentURL is the previous section. This is used to determine which confirmation update function to call.
    renderContent(url, currentURL);
};

//Event listener for the next button.
const navigate = (url) => {
    //Scrolls to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
    //Stores the current URL before navigating to the next section.
    const currentURL = window.location.pathname;
    //Prevents the page from refreshing
    window.event.preventDefault();
    navigateToSection(url, currentURL);
};

//Function for the Back button to go back to the previous page.
const goBack = () => {
    window.history.back();
}

//Submitting survey data to the database.
async function submitHealthSurvey(){
    const {data, error} = await db.from("health_survey").insert([state]);

    if(error){
        console.error("Submit failed: ", error.message);
        return;
    }
    console.log("Submission Success.");
    navigate("/finish");
}

async function submitVendorSurvey(){
    const {data, error} = db.from("vendor_survey").insert([state]);

    if(error){
        console.error("Submit failed: ", error.message);
        return;
    }

    console.log("Submission Success.");
    navigate("/finish");
}

//Fetches full database inputs of health survey.
async function fetchHealthData(){
    //returns an array of objects
    const {data, error} = await db.from("health_survey")
                            .select("*")
                            .order("created_at", {ascending: false});
    if(error){
        console.error("Fetch failed: ", error.message);
        return;
    }

    console.log(data);
    return data;
}

//Fetches full database inputs of vendor survey.
async function fetchVendorData(){
    //returns an array of objects
    const {data, error} = await db.from("vendor_survey")
                            .select("*")
                            .order("created_at", {ascending: false});
    if(error){
        console.error("Fetch failed: ", error.message);
        return;
    }

    console.log(data);
    return data;
}

/*---------------------- NEW TEST FUNCTIONS -------------------------
//prepares and loads the data to dashboard.
async function loadDataToDashboard(){
    //arrays of objects
    const vendorData = await fetchVendorData();
    const healthData = await fetchHealthData();

    renderDashboard(healthData, "health-container");

}

const renderDashboard = (responseData, containerID) =>{
    const container = document.querySelector(`#${containerID}`);

    const header = Object.keys(responseData[0]);
    const value = responseData.map(key => Object.values(key))
    const table = document.createElement("table");
    const headRow = document.createElement("tr");
    const dataRow = document.createElement("tr");
    
    header.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        headRow.appendChild(th);
    });

    value.forEach(v => {
        const td = document.createElement("td");
        td.textContent = v;
        dataRow.appendChild(td);
    });
    
    table.appendChild(headRow);
    table.appendChild(dataRow)
    container.appendChild(table);

    console.log(table);

}
*/

//----------------------------LOG IN--------------------------------



//-------------------------------------------------------------------




//"popstate" is triggered when the user clicks the back or forward button. It will render the content based on the URL.
window.addEventListener("popstate", () => {
    renderContent(window.location.pathname);
});

//Renders the initial content on the page.
window.addEventListener("DOMContentLoaded", () => {
    renderContent(window.location.pathname);
});
