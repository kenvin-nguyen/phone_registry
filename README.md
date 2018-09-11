This project develop and run on NodeJS version 8.11.1
1. open command terminal and browse to code folder
2. run command to install package: npm install
3. Run app by command script: npm run start
4. Run unit test by command script: npm run test

​Strategy and algorithm:

Step 1: use csv package to read data from csv field and push into array.

Step 2: group data by phone number and return an object with properties is phone number and value is array of data.

Step 3: for each key = phone number to find an actual activation date in child array and push result into return final array.

Step 4: write final data into output.csv.

=> ​time complexity = n log(k) (n = total record, k = total record in child group).

=> memory complexity for run app: 
  
  rss: 24600576,
  
  heapTotal: 10305536,
  
  heapUsed: 6477624,
  
  external: 143930

=> memory complexity for run unit test on 4 cases: 
  
  rss: 31772672,
  
  heapTotal: 18694144,
  
  heapUsed: 11541232,
  
  external: 515130
