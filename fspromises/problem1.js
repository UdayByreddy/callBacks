const fs = require("fs").promises;
const path = require("path");

function main(currentPath) {
    let dir = path.join(currentPath, "randomJsonFiles");
    fs.mkdir(dir)
        .then(() => createFiles(dir, 5))
        .then(() => deleteFiles(dir))
        .then(() => console.log("Successfully created and deleted the files"))
        .catch((error) => console.log(error));
}

function createFiles(dir, numberOfFiles) {
    let arr = [];
    for (let i = 1; i <= numberOfFiles; i++) {
        let filePath = path.join(dir, `file${i}.json`);
        arr.push(
            fs.writeFile(filePath, "")
                .then(() => console.log(`file${i} created`))
        );
    }
    return Promise.all(arr); // Return the Promise.all for proper chaining
}

function deleteFiles(dir) {
    return fs.readdir(dir, "utf-8").then((files) => {
        let promises = files
            .filter((file) => path.extname(file) === ".json")
            .map((file) => fs.unlink(path.join(dir, file)));
        return Promise.all(promises);
    });
}

module.exports = main;
