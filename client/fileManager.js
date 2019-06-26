console.log("front end working");

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

function showDuplicatedFiles(path) {
    showDuplicatesModal();
    fs.readdir(path, (errors, files) => {
        console.log(files);
    });
}

function readDirectory(directory) {
    fs.readdir(directory, (error, files) => {
        if (error) return handleError(error, 2); // handle errors
        if (files.length === 0)
            return handleError("error:  No files in directory", 1); // empty directory

        let filesContainer = document.getElementById("list-files");
        files.forEach(file => {
            let li = document.createElement("li");
            li.classList.add("file-name");

            li.onclick = function() {
                // handle duplicates

                showDuplicatedFiles(directory);
            };

            filesContainer.appendChild(li).innerHTML = file;
        });
    });
}

const listFiles = () => {
    // Start point
    searchField();
    let folder = document.getElementById("search").value; // get user folder name
    let directory = path.join(homePath, folder); // join folder to home path
    readDirectory(directory);
};

// TODO place in separate file

function showDuplicatesModal() {
    let dupModal = document.getElementById("files-modal");
    let closeBtn = document.getElementById("close-btn");
    let Btn = document.getElementById("test");

    Btn.onclick = function() {
        dupModal.display = "block";
        console.log("show duplicates");
    };

    dupModal.style.display = "block";

    closeBtn.onclick = function() {
        dupModal.style.display = "none";
        console.log("working");
    };
}