const fs = require("path");
const path = requrie("path");

let folder = document.getElementById("search").value;
const directory = path.join(__dirname, folder);

function list_files() {
  fs.readdir(directory, (error, files) => {
    let files = document.getElementById("list-files");
    if (error) files.append("li").innerHtml = error;

    files.forEach(file => {
      files.append("li").innerHtml = file;
    });
  });
}

console.log("fron end working");
