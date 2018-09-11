var expect = require('chai').expect;
var csv = require("fast-csv");
var app = require('./app');

describe('Unit test', function() {
    describe('#read csv file', function() {
        it('should fail with missing field', function() {
            return app.main('phoneregister_miss_field.csv')
            .catch(err => {
                expect(err.message).eq('missing field');
            });
        });

        it('should pass with correct output data', function(done) {

            app.main('phoneregister.csv')
            .then(() => {
                return new Promise(function(resolve, reject){
                    setTimeout(function(){
                    resolve(checkData('output.csv'));
                    }, 3000)
                });
            })
            .then(data => {
                expect(data.length).gt(0);
                expect(data[0].REAL_ACTIVATION_DATE).eq('2016-06-01');
                expect(data[0]).all.keys('PHONE_NUMBER', 'REAL_ACTIVATION_DATE');
            })
            .catch(err => {
                throw err;
            });
            done();
        });

        it('should fail with invalid filename: incorrect-filename', function(done) {
            app.main('incorrect-filename')
            .catch(err => {
                expect(err.message).eq('missing file name or wrong file extension(must be .csv)');
            });
            done();
        });
    });
});

checkData = function(filename){
    return new Promise((resolve,reject) =>{
        var dataArr = [];
        csv.fromPath(filename, {headers: true})
        .on("data", function(data){
            dataArr.push(data);
        })
        .on("end", function(){
            return resolve(dataArr);
        });
    })
    .catch(err =>{ throw err});
}
    