# Intro
This sample project is intended to be used with aws worker tier and sqs as message queuing service. Altough feel free to change it and use it however you want.  

This package includes running chrome in a docker env and a express server who receives post request on root path.
It visits the url provided in the post object, extracts an pdf from it and saves it to s3.  

**You'll also find a .ebextentions folder. There is a simple conf to change the timeout of the nginx proxy server that is between sqs deamon and your docker container. You can delete it or change the values.**

This is done for task that take longer that one minute (default conf). 

### Example json post object
```json
{
    "url":"https://somelink.com",
   "timestamp":1517482327,
   "bucket":{  
      "name":"bucketName",
      "path":"path",
      "key":"filename"
   },
}
```

**`Build and run docker`**
* sudo docker build -t generatepdf:v1 .
* sudo docker run 
    -e AWS_ACCESS_KEY_ID=ACCESS KEY 
    -e AWS_SECRET_ACCESS_KEY=SECRET KEY 
    -e AWS_DEFAULT_REGION=Region 
    -e PORT=80 

**`Bundle package for deployment`**
* Install dev dep or just install bestZip global
* npm run zip (Install dev dep)