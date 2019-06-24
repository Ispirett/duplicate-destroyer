console.log("fron end working");

const fs = require("fs");
const path = require("path");

const homePath = process.env.HOME; //get home path from computer

function handleError(error, index) {
    let errorMsg = error.toString().split(":")[index];
    document.getElementById("error").innerHTML = errorMsg;
    setTimeout(() => {
        document.getElementById("error").innerHTML = "";
    }, 3000);
}

function deletePreviousSearch() {
    let element = document.getElementById("list-files");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function searchField() {
    let folder = document.getElementById("search").value; // get user folder name
    let lower = folder.toLowerCase();
    let Capitalize = lower.charAt(0).toUpperCase() + folder.slice(1);
    console.log(Capitalize);
}

const listFiles = () => {
    // Start point
    searchField();
    let folder = document.getElementById("search").value; // get user folder name
    let directory = path.join(homePath, folder); // join folder to home path

    fs.readdir(directory, (error, files) => {
        deletePreviousSearch(); // delete prvious search
        if (error) return handleError(error, 2); // handle errors
        if (files.length === 0)
            return handleError("error:  No files in directory", 1); // empty directory

        let filesContainer = document.getElementById("list-files");
        files.forEach(file => {
            let li = document.createElement("li");
            filesContainer.appendChild(li).innerHTML = file;
        });
    });
};