const express = require("express")
require('dotenv').config()
const githubController = require('./controllers/github')

function createServer() {
	const app = express()
	app.use(express.json())
    app.get('/test', function(req, res) {
        res.status(200).json({ name: 'Anup' });
      });
	app.get("/github/user", githubController.getUserProfile);
    app.get("/github/createWebhook", githubController.createOrganizationWebook);
    app.post("/github/webhookListenerForGithub", githubController.webHookListenerForOrg);
	return app
}

module.exports = createServer