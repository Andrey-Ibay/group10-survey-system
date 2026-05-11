
const { createClient } = supabase;
const db = createClient("https://yscicfmmwkikbdfvtwki.supabase.co", "sb_publishable_UZRIEjWtSTAZ1KflVlJVyA_2Ue2Dbuf");

async function checkAuth(){
    const {data} = await db.auth.getSession();

    if(!data.session){
        window.location.href = "login.html";
        return;
    }
}

//uncomment when you are going to use it.
//checkAuth();



//------------------------------BAR VISUALIZATIONS------------------------------

document.addEventListener("DOMContentLoaded", async () =>{
    const divData = document.querySelectorAll(".data-field");
    const divDataAge = document.querySelectorAll(".data-field-age");
    const questionRespondentDisplay = document.querySelectorAll(".num-rsp");
    const percentageDisplay = document.querySelectorAll(".percent");
    const ageRespondents = document.querySelectorAll(".num-rsp-age");
    const agePercentage = document.querySelectorAll(".percent-age");
    const line = document.querySelectorAll(".lines");
    const maleNum = document.querySelector(".male-num");
    const femaleNum = document.querySelector(".female-num");
    const overviewRsp = document.querySelector("#responses");
    const overviewSick = document.querySelector("#sick");
    const overviewSymptom = document.querySelector("#mostsymptom");

    //total number of respondents
    const { count: totalRespondents } = await db.from("health_survey")
                                                .select("*", { count: "exact", head: true})

    overviewRsp.textContent = totalRespondents;

    //Display of symptoms and sickness
    const symptoms = await Promise.all([
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .contains("symptoms", ["fever"]),
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .contains("symptoms", ["cough"]),
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .contains("symptoms", ["fatigue"]),
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .contains("symptoms", ["loss_of_taste_smell"]),
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .contains("symptoms", ["others"]),
    ]);

    //turns results into an array
    const symptomsArray = symptoms.map(s => s.count);
    
    //Reference array for labelling
    const symptomNames = ["Fever", "Cough", "Fatigue", "Loss of taste/smell", "Others"];
    //Rendering the most common symptom
    overviewSymptom.textContent = symptomNames[symptomsArray.indexOf(Math.max(...symptomsArray))];

    //Fetches the total number of people who are sick (checks if symptoms is not empty)
    const { count: totalSickPeople } = await db.from("health_survey")
                                                .select("*", {count: "exact", head: true})
                                                .not("symptoms", "is", null);

    overviewSick.textContent = totalSickPeople;
    
    //Fetches data for age groups
    const ages = await Promise.all([
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .lte("age", 12),
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .lte("age", 19)
            .gt("age", 12),
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .lte("age", 59)
            .gt("age", 19),
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .gt("age", 59),   
    ]);
    
    //Calculate percentage
    function agePercent(index){
        const result = (ages[index].count / totalRespondents) * 100;
        return result;
    }

    //Rendering Ages
    divDataAge.forEach((element, ageGroup) => element.style.setProperty("--progress", `${agePercent(ageGroup)}%`))
    ageRespondents.forEach((e, index) => e.textContent = ages[index].count);
    agePercentage.forEach((e, index) => e.textContent = `${agePercent(index).toFixed(1)}%`);
    
    //Fetch only the specific data specified in divData from the database
    
    //returns an array of promises, where each promise is the returned object
    //NOTE: a NodeList is not an array, therefore cannot be used with map()
    //      which is why you must convert it to an array first.

    const data = Array.from(divData).map(async (question) => {
        //If the element expects an array
        if(question.dataset.type === "array"){
            return db.from("health_survey")
                        .select("*", {count: "exact", head: true})
                        .contains(question.dataset.row, [question.dataset.item]);

        }
        return db.from("health_survey")
                    .select("*", {count: "exact", head: true})
                    .eq(question.dataset.row, question.dataset.item);

    })
    
    //converts the promises from data into actual array of objects
    const receivedData = await Promise.all(data);

    //Converts the nodelists into an array
    const nodeListConversion = Array.from(divData);
    const respondentElements = Array.from(questionRespondentDisplay);
    const percentElements = Array.from(percentageDisplay);
    
    
    //array of objects into arrays (each element now represents total count)
    const dataCount = receivedData.map(data => data.count);
    //array where each element represents the average of each data.
    const averages = dataCount.map(count => count / totalRespondents);
    //make it suitable for percentage use.
    const percentage = averages.map(a => a * 100);
    console.log(totalRespondents)
    //Accesses every "line" in the html file
    const renderedLine = line.forEach(element => element.style.strokeDashoffset = averages[0]); 
    
    //Rendering
    nodeListConversion.forEach((e, index) => e.style.setProperty('--progress', `${percentage[index]}%`))
    respondentElements.forEach((e, index) => e.textContent = dataCount[index]);
    percentElements.forEach((e, index) => e.textContent = `${percentage[index].toFixed(1)}%`);
    
    
    //Number of males and females
    const [males, females] = await Promise.all([
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .eq("sex", "male"),
        db.from("health_survey")
            .select("*", {count: "exact", head: true})
            .eq("sex", "female")
    ])

    maleNum.textContent = males.count;
    femaleNum.textContent = females.count;
});


//------------------------------DOWNLOAD DATASET-------------------------------

async function prepareExport() {
    const fetchHealth = await fetchHealthData();
    exportCSV(fetchHealth, "health_dataset.csv");
};

function exportCSV(responseData, filename){
    //Headers
    const headers = Object.keys(responseData[0]);
    //Row
    const valuesPerResponse = responseData.map(response => Object.values(response));

    //CSV File body
    //Contains 2 arrays, the header and the body
    const rowsCSV = [headers.join(","),
        ...valuesPerResponse.map(value => value.map(data => 
            Array.isArray(data) ? data.join(" | ") : String(data ?? "").replaceAll(",", "")
        ).join(","))].join("\n")
    
    //console.log(valuesPerResponse.map(value => value.map(data => Array.isArray(data) ? data.join(" | ") : data) + "\n"))
    console.log(rowsCSV);

    //a downloadable blob
    const blob = new Blob([rowsCSV], {type: "text/csv"});
    const url = URL.createObjectURL(blob);

    //download trigger
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.download = filename;
    aTag.click();

    //cleanup
    URL.revokeObjectURL(url);
}