const blackList = [
    "Nom :\n",
    "Prénom :\n",
    "Année de naissance :\n",
    "Club :\n",
    "Nombre de points :\n",
    "Rang :\n",
    "Nbre de points :\n"// Why in the world i have to use this... Every page is different
]

function cleanData(string, keys){

    // To clarify
    var actual_string = string

    // ForEach blacklist word, we delete it
    for (element in blackList){

        actual_string = actual_string.replace(blackList[element],"")

    }

    // We separate each part
    var splitted = actual_string.split("\n")
    var JSON_data = {}

    // Add it in JSON (it does help to CSV file)
    for (element in splitted) {

        JSON_data[keys[element]] = splitted[element].replace(/\s*$/,'')

    }

    return JSON_data

}

exports.cleanData = cleanData