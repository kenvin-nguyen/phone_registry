var csv = require("fast-csv");

readCSV = function(filename){
    var dataArr = [];
    return new Promise((resolve,reject) =>{
        return csv.fromPath(filename, {headers: true})
        .on("data", function(data){
            if(!data.hasOwnProperty('PHONE_NUMBER') || !data.hasOwnProperty('ACTIVATION_DATE') || !data.hasOwnProperty('DEACTIVATION_DATE')){
                return reject({message:'missing field'});
            };
            dataArr.push(data);
        })
        .on("end", function(){
            // group dta by PHONE_NUMBER
            let groupByPhone = dataArr.reduce(function (r, a) {
                r[a.PHONE_NUMBER] = r[a.PHONE_NUMBER] || [];
                r[a.PHONE_NUMBER].push(a);
                return r;
            }, {});

            var finalResult = [];
            for (const key in groupByPhone) {
                // case 1: if have only single record for one phone number
                if(groupByPhone[key].length == 1){
                    let item = groupByPhone[key][0];
                    finalResult.push({PHONE_NUMBER: item.PHONE_NUMBER, REAL_ACTIVATION_DATE: item.ACTIVATION_DATE});
                }
                else {
                    groupByPhone[key].sort((a, b) =>{
                        if(a.PHONE_NUMBER === b.PHONE_NUMBER){
                            return Date.parse(a.ACTIVATION_DATE) - Date.parse(b.ACTIVATION_DATE)
                        }
                    });

                    let validItem = groupByPhone[key][0];
                    let currentItem = groupByPhone[key][0];
                    groupByPhone[key].splice(0, 1);

                    // loop over array and find if next item.DEACTIVATION_DATE > current item.ACTIVATION_DATE
                    // => reset validItem
                    // reset current item
                    groupByPhone[key].map(i => {
                        if(Date.parse(i.ACTIVATION_DATE) > Date.parse(currentItem.DEACTIVATION_DATE)){
                            validItem = i;
                        }
                        currentItem = i;
                    });
                    finalResult.push({PHONE_NUMBER: validItem.PHONE_NUMBER, REAL_ACTIVATION_DATE: validItem.ACTIVATION_DATE});
                }

            }

            // export data
            csv
            .writeToPath("output.csv", finalResult, {headers: true})
            .on("finish", function(){
                console.log("done process data!"); 
            });
            return resolve();
        });
    })
.catch(err =>{ 
    throw err
});
    
}

module.exports = {
    readCSV
}
