A sample project for aws worker tier. 
This package includesadfs running chrome in a docker env.

**`INITIAL`**
- make sure you have nodejs 7.6+
- npm install

**`BUILD FOR LAMBDA`**
- npm run lambdaBuild
- upload build zip to s3 server + save location
- Deploy then on lambda trough s3 download.

**`LOCAL DOCKER TEST`**
* sudo docker build -t generatepdf:v1 .

* sudo docker run 
-e AWS_ACCESS_KEY_ID=ACCESS KEY 
-e AWS_SECRET_ACCESS_KEY=SECRET KEY 
-e AWS_DEFAULT_REGION=Region 
-e PORT=80 

