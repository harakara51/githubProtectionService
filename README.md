# githubProtectionService
A simple web service written in node.js that protects  master branch when a new repository is created

To get started, first clone this repo
<h1>Set environment variables </h1>
For the web service to work, you need to inject some variable related to your github account. This can be done by creating a .env file and filling it with appropriate data
    GITHUB_TOKEN=####YOUR GITHUB TOKEN#####
    GITHUB_USERNAME=####YOUR GITHUB USERNAME#####
    GITHUB_ORGANIZATION=####YOUR GITHUB ORGANIZATION#####

You can use the .env-example as a reference, but remember <b> to not commit your credentials </b>
Now that the variable are set, we are all good to start the web service

<h1> To start web service </h1>
In terminal, go to where this project is cloned
type npm install to install node dependences:
    <b> npm install</b>

To start web service, type in npm start you should see the line below: 
    <b> npm start</b>
    Example  app listening at http://localhost:4567

<h1> Create web hook and point to web service </h1>
You can either setup the webhook manually or use the web service
To create it manually, you get further documention here

To create the webhook using the webservice, on your browser or tool like postman, hit the following api:
http://localhost:4567/github/createWebhook

You can verify if the webhook has been created, by going to organization settings and clicking on webhooks

<h1> Testing web service </h1>
In terminal, go to where this project is cloned

To start web service, type in npm test. You should 

<b1> warning test, will recreate the webhook, update branch protection and create a new issue depending on the variable passed in <b1>




