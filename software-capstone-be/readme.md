# Backend for the Capstone Project

## How to compile the Typescript to Javascript

1. From the root directory of the Github, use command prompt to browse to **software-capstone-be/**:
    `cd software-capstone-be/`

2. Use the below command to compile the **./src/** (which is written with Typescript), the output JS build will be placed on **./build/**:
    `npx tsc`

## How to run the code while developing (run the Typescript source, without compiling to Javascript)

1. From the root directory of the Github, use command prompt to browse to **software-capstone-be/**:
    `cd software-capstone-be/`

2. Use the below command to run the Typescript codes in **./src/**:
    `npm run dev`

## How to run the code with the compiled JS codes

1. From the root directory of the Github, use command prompt to browse to **software-capstone-be/**:
    `cd software-capstone-be/`

2. [Compile](#how-to-compile-the-typescript-to-javascript) the TS code to JS build

3. Run the below command to run the build:
    `npm start`