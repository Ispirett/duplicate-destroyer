console.log("front end working");

const fs = require("fs");
const path = require("path");

const homePath = process.env.HOME; //get home path from computer

let dupParent = document.getElementById("dup-parent");

function handleError(error, index) {
    let errorMsg = error.toString().split(":")[index];
    document.getElementById("error").innerHTML = errorMsg;
    setTimeout(() => {
        document.getElementById("error").innerHTML = "";
    }, 3000);
}

function deletePreviousSearch(id) {
    let element = document.getElementById(id);
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

function deleteFile(path, file) {
    //Reaffirms if the user is sure about deleting the file
    if(confirm(`file is going to be deleted ${path + "/" + file}`))
    {
        try {
            handleFileToDelete =
                process.platform == "win32" ? path + "\\" + file : path + "/" + file;
            console.log(handleFileToDelete);

            fs.unlink(handleFileToDelete,(err)=>{
                listFiles();
                dupParent.style.display ='none'
            });

        } catch (error) {
            alert(error);
        }
    }
}

function showDuplicatedFiles(path, clickedFileName) {
    deletePreviousSearch("duplicated-list-files");
    fs.readdir(path, (errors, files) => {
        //console.log(files);
        let parent = document.getElementById("duplicated-list-files");
        // Check file name against other file names and return duplicated files.
        files.forEach(file => {
            let li = document.createElement("li");
            li.classList.add("file-name");
            console.log(file.match(clickedFileName));

            // When file is clicked delete item.
            li.onclick = () => {
                deleteFile(path, file);
            };

            if (file.includes(clickedFileName)) {
                parent.appendChild(li).innerHTML = file;
            }
        });
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
            li.onclick = function(e) {
                // handle duplicates
                clickedFileName = e.target.innerHTML;
                showDuplicatesModal();
                showDuplicatedFiles(directory, clickedFileName);
            };

            filesContainer.appendChild(li).innerHTML = file;
        });
    });
}

const listFiles = () => {
    // Start point
    deletePreviousSearch("list-files");
    searchField();
    let folder = document.getElementById("search").value; // get user folder name
    let directory = path.join(homePath, folder); // join folder to home path
    readDirectory(directory);
};

// TODO place in separate file

function showDuplicatesModal() {

    let dupModal = document.getElementById("files-modal");
    let closeBtn = document.getElementById("close-btn");

    dupParent.style.display = "block";
    dupModal.style.display = "block";

    closeBtn.onclick = function() {
        dupParent.style.display = "none";
        dupModal.style.display = "none";
        console.log("working");
    };
}