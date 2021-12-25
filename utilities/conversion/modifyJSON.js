const jsonfile = require('jsonfile')

// One use script : add key in ranking_links json if needed

var data = require("../../data/json/ranking_links.json")

for (key in data){

    data[key] = {
        "link":data[key],
        "update":0
    }

}

console.log(data)

const file = "./data/json/ranking_links.json"
const obj = data
    
jsonfile.writeFile(file, obj, { spaces: 4 }, function (err) {
    if (err) console.error(err)
})

console.log("done")