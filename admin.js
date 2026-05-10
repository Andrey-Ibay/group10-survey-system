
const { createClient } = supabase;
const db = createClient("https://yscicfmmwkikbdfvtwki.supabase.co", "sb_publishable_UZRIEjWtSTAZ1KflVlJVyA_2Ue2Dbuf");

async function checkAuth(){
    const {data} = await db.auth.getSession();

    if(!data.session){
        window.location.href = "login.html";
        return;
    }
}

//Uncheck when implemented login.html
//checkAuth();



//------------------------------BAR VISUALIZATIONS------------------------------
document.addEventListener("DOMContentLoaded", async () =>{
    const divData = document.querySelectorAll(".data-field");
    const line = document.querySelectorAll(".lines");
    //Fetch only the specific data specified in divData from the database
    
    //returns an array of promises, where each promise is the returned object
    //NOTE: a NodeList is not an array, therefore cannot be used with map()
    //      which is why you must convert it to an array first.

    const data = Array.from(divData).map(async (question) => {
        const questionData = await db.from("health_survey")
                        .select("*", {count: "exact", head: true})
                        .eq(question.dataset.row, question.dataset.item);

        return questionData;
    })
    
    //converts the promises from data into actual array of objects
    const receivedData = await Promise.all(data);
    //array of objects into arrays
    const dataCount = receivedData.map(data => data.count);
    //array where each element represents the average of each data.
    const averages = dataCount.map(count => count / dataCount.length);

    //Accesses every "line" in the html file
    const renderedLine = line.forEach(element => element.style.strokeDashoffset = averages[0]); 
    
    console.log(averages);
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