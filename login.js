async function adminLogin(email, password){
    const { data, error } = await db.auth.signInWithPassword({
        email,
        password
    });

    if(error){
        alert("Invalid");
        return;
    }

    window.location.href = "admin.html";
}