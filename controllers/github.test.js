const githubController = require('./github.js')
const app = require('../server.js')
describe("Github Controller", ()=> {
    it('GET /gihub/user test get profile route in github Controller', async () => {
        const result = await githubController.getUserProfile()
        if(result) {
            expect(result.login).toEqual("harakara51");
        } else {
            throw new Error('Expected object not recieved')
        }
    })

    it('GET /gihub/createWebhook test get profile route in github Controller', async () => {
        const result = await githubController.createOrganizationWebook()
        if(result) {
            expect(result.login).toEqual("harakara51");
        } else {
            throw new Error('Webhook created')
        }
    })
    it('POST /github/webhookListenerForGithub monitorProjects --> api for github webhook to protect master branch', async ()=> {
        const data = {name: "hafu", dateCreated:"06/06/2021"}
        const response = await githubController.webHookListenerForOrg(data)
        if(response) {
            expect(response).toEqual("Valid Webhook recieved, updated branch rules for master branch");
        } else {
            throw new Error('Expected object not recieved')
        }
    })
})

