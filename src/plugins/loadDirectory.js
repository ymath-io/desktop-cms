const fs =require('fs')
const path = require('path')
const homedir = require('os').homedir();
const directoryPath = path.join(homedir,'ymath-nuxt-tailwind', 'content')

console.log(__dirname)

export function compareFiles(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();
    if (a.isDir && !b.isDir){
        return -1
    }
    else if (!a.isDir && b.isDir){
        return 1
    }
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison;
}

export function walkDir(directoryPath, root=false){
    console.log("Indexing ",directoryPath)
    return fs.readdirSync(directoryPath,{withFileTypes: true}).map(item => {
        const isDir = item.isDirectory()
        let obj = {name:item.name,
            path:path.join(directoryPath,item.name),
            extension:path.extname(item.name),
            isDir
        }
        // this is where we can ignore and hide things
        if (isDir && ![".git",".schemeit","node_modules"].includes(item.name)){
            // we redo
            obj.children = []// walkDir(path.join(directoryPath,item.name)).sort(compareFiles)
        }
        else if (![".git",".schemeit",".DS_Store","node_modules"].includes(item.name)) {
            obj.file = item.name.split('.')[1] // file type
            if (root && item.name.toLowerCase() === 'readme.md') item.active = true;
            obj.content = fs.readFileSync(path.join(directoryPath,item.name),'utf-8');
        }
        return obj
    })
}
