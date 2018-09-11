var logic_phone_registry = require('./logic_phone_registry');
var util = require('util'); 

console.log('>>>>>>>>>> tracking used memory');
console.log(util.inspect(process.memoryUsage()));
main = (filename)=>{
    return new Promise((resolve,reject) =>{
        if(!filename || filename == undefined || filename.split('.')[1] != 'csv'){
            return reject({message:'missing file name or wrong file extension(must be .csv)'});
        }
        
        return resolve(logic_phone_registry.readCSV(filename));
    })
    .catch(err => {
        throw err;
    });
}

if(!process.argv[2].includes('unit_test')){
    main(process.argv[2]);
}


module.exports = {
    main
}
