const fs = require("fs")

function JSON2CSV(JSON_dic, outputFile){

    var string_output = ""

    if (JSON_dic != {}){

        for (key in JSON_dic[0]){
        
            string_output += key + ","
    
        }
    
        string_output = string_output.slice(0,-1)
        string_output += "\n"
    
        for (JSON_data in JSON_dic){
    
            for (key in JSON_dic[JSON_data]){
    
                string_output += JSON_dic[JSON_data][key] + ","
    
            }
    
            string_output = string_output.slice(0,-1)
            string_output += "\n"
    
        }

    }

    fs.writeFile(outputFile, string_output, (err) => {
        if (err){
          console.log(err)
        }
    })

}

exports.JSON2CSV = JSON2CSV