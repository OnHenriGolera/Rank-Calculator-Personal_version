const blackList = [
    "Nom :\n",
    "Prénom :\n",
    "Année de naissance :\n",
    "Club :\n",
    "Nombre de points :\n"
]

function cleanData(string, keys){

    var actual_string = string

    for (element in blackList){

        actual_string = actual_string.replace(blackList[element],"")

    }

    var splitted = actual_string.split("\n")
    var JSON_data = {}

    for (element in splitted) {

        JSON_data[keys[element]] = splitted[element].replace(/\s*$/,'')

    }

    return JSON_data

}

exports.cleanData = cleanData