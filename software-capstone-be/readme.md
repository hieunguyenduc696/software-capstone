# Backend for the Capstone Project

## How to run the code while developing (run the Typescript source, without compiling to Javascript)

1. From the root directory of the Github, use command prompt to browse to **software-capstone-be/**:
   `cd software-capstone-be/`

2. Use the below command to run the Typescript codes in **./src/**:
   `npm run dev`

## How to run the build code (the TS source will be compiled to JS, and run with the compiled JS source)

1. From the root directory of the Github, use command prompt to browse to **software-capstone-be/**:
   `cd software-capstone-be/`

2. Run the below command to run the build:
   `yarn start`

# API Documentation

## Admin

### Create Exam

#### Send [jpg, png] files for Exam' Reading Passage' Thumbnail

```
   POST /reading-skill/resource/reading-passage/thumbnail
```

```javascript
   POST /reading-skill/resource/reading-passage/thumbnail HTTP/1.1
   Host: 127.0.0.1:8090
   Content-Length: 182
   Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

   ----WebKitFormBoundary7MA4YWxkTrZu0gW
   Content-Disposition: form-data; name=""; filename="file"
   Content-Type: <Content-Type header here>

   (data)
   ----WebKitFormBoundary7MA4YWxkTrZu0gW
```

##### Success response
```javascript
   {
      "code": 0,
      "message": "The files has been saved successfully",
   }
```
##### Error response
```javascript
   {
      "code": 1,
      "message": "Something went wrong from the backend",
   }

   {
      "code": 2,
      "message": "Upload failed. ${overlimitFiles} ${"are"|"is"} over the file size limit of ${FILE_SIZE_IN_MB} MB",
   }

   {
      "code": 3,
      "message": "Upload failed. Only ${allowedExtensions} files allowed",
   }
```
