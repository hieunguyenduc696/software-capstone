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

## Test the DB run INSERT correctly API

```
   GET /reading-skill/admin/test/test-db
```
### Success response
```javascript
{
   {"insertionIds":[31,32,33,34,35,36,37,38,39,40]} 
}
```

Try 'SELECT * FROM paragraph' for checking if the insertion actually work

## Test the DB run UPDATE correctly API

```
   GET /reading-skill/admin/test/test-update
```
### Success response
```javascript
{
    "updateParagraphEntity": {
        "paragraph_id": 23,
        "section_id": null,
        "wallpaper": "test_update",
        "title": "test_update",
        "content": "test_update"
    }
}
```
- Change the "paragraph_id" property of "updateParagraph" variable of "testUpdateParagraph(...)" in "modules/readingSkill/controller/test_controller.ts" with an existed id of an paragraph
- After the below step, Try 'SELECT * FROM paragraph WHERE id = ${paragraph_id}' for checking if the update actually work

## Test the DB run DELETE correctly API

```
   GET /reading-skill/admin/test/test-delete
```
### Success response
```javascript
{
    "deleteCount": 9
}
```
- Change the "startId" and "size" variables of "testDeleteParagraph(...)" in "modules/readingSkill/controller/test_controller.ts". This api will delete all the paragraph which has id from [startId, startId + 1, .... startId + size - 1]
- After the below step, Try 'SELECT * FROM paragraph' for checking if the deletion actually work

## Admin

### Get Test with Pagination
```
    GET /reading-skill/admin/test/?limit=10&page=1
```
| Param     | Datatype |         Note         |
| --------- | -------- | -------------------- |
| limit     | number   | required, 1-indexing |
| page      | number   | required, 1-indexing |


##### Success response
```javascript
   {
    "message": "Found 2 test(s)",
    "code": 0,
    "data": {
        "total": 2,
        "count": 2,
        "tests": [
            {
                "test_id": 1,
                "title": "TEST1",
                "test_type": 0,
                "test_level": 0
            },
            {
                "test_id": 2,
                "title": "TEST2",
                "test_type": 0,
                "test_level": 0
            }
        ]
    }
}
```
##### Error response
```javascript
   {
      "code": 1,
      "message": "Something went wrong from the backend",
   }
```


### Create Test

#### Create Multiple Tests without files

```
   POST /reading-skill/admin/test/create
```

```javascript
  {
    "data": [
        {
            "title": "TEST1",
            "test_type": 0,
            "test_level": 0,

            "sections": [
                {
                    "section_index": 1,
                    "section_type": 0,

                    "paragraph": {
                        "wallpaper": "image_url",
                        "title": "paragraph title",
                        "content": "paragraph content"
                    },

                    "templates": [
                        {
                            "template_type_id": 0,

                            "template_index": 1,
                            "title": "TEST template title",
                            "content": "TEST content",
                            "expand_clumn": null,

                            "questions": [
                                {
                                    "question_index": 1,
                                    "content": "Test question",
                                    "options": "{'test': 'hehehehe'}",
                                    "score": 1,

                                    "answers": [
                                        {
                                            "content": "this is the answers",
                                            "options": "{'some_options': 'hehehe'}"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        {
            "title": "TEST2",
            "test_type": 0,
            "test_level": 0,

            "sections": [
                {
                    "section_index": 1,
                    "section_type": 0,

                    "paragraph": {
                        "wallpaper": "image_url",
                        "title": "paragraph title",
                        "content": "paragraph content"
                    },
                    
                    "templates": [
                        {
                            "template_type_id": 0,

                            "template_index": 1,
                            "title": "TEST template title",
                            "content": "TEST content",
                            "expand_clumn": null,

                            "questions": [
                                {
                                    "question_index": 1,
                                    "content": "Test question",
                                    "options": "{'test': 'hehehehe'}",
                                    "score": 1,

                                    "answers": [
                                        {
                                            "content": "this is the answers",
                                            "options": "{'some_options': 'hehehe'}"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

##### Success response
```javascript
   {
      "message": "The test(s) are saved successfully",
      "code": 0,
      "data": [
         {
               "createTestId": 15
         },
         {
               "createTestId": 16
         }
      ]
   }
```
##### Error response
```javascript
   {
      "code": 1,
      "message": "Something went wrong from the backend",
   }
```

#### Send [jpg, png] files for Reading Test Paragraph' Wallpaper

```
   POST /reading-skill/resource/paragraph/wallpaper
```

```javascript
   POST /reading-skill/resource/paragraph/wallpaper HTTP/1.1
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
      "data": [
        {
            "original_name": "3.jpg",
            "new_name": "e471ab5d-38e7-41de-a821-e181e46b9b12.jpg"
        },
        {
            "original_name": "42668_laptop_hp_14s_dq5053tu_6r9m6pa__2_.jpg",
            "new_name": "6e593590-83c6-48e5-938a-6b3d1e1e3f76.jpg"
        }
    ]
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
