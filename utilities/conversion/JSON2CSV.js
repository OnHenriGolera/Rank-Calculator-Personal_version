const fs = require("fs")

function JSON2CSV(JSON_dic, outputFile){

    // Initialisation
    var string_output = ""

    if (JSON_dic != {}){

        // Get keys (Name, Surname, Rank,...)
        for (key in JSON_dic[0]){
        
            string_output += key + ","
    
        }
        
        // Remove last ","
        string_output = string_output.slice(0,-1)
        //Next line
        string_output += "\n"
        
        // ForEach player in rank
        for (JSON_data in JSON_dic){
            
            // ForEach key in player
            for (key in JSON_dic[JSON_data]){
                
                // Adding data
                string_output += JSON_dic[JSON_data][key] + ","
    
            }

            // Remove last ","
            string_output = string_output.slice(0,-1)
            // Next line
            string_output += "\n"
    
        }

    }
    
    // Write data in CSV file
    if (fs.existsSync(outputFile)){
        fs.unlinkSync(outputFile)
    }
    fs.writeFileSync(outputFile,string_output) 

}

exports.JSON2CSV = JSON2CSV