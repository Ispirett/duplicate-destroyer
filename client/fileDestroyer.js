// 1: when file is clicked check to check to see if there are any dupicates

//: add event listener on li tags

//: use for loop to search the current directory
//: find duplicates, use regex for this
//: display how many files match the critiria

function show_duplicated_files(path) {
    fs.readdir((errors, files) => {
        console.log(files);
    });
}