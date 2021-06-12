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

    it('POST /github/createRepo monitorProjects --> api for github webhook to protect master branch', async ()=> {
        const data = {name: "hafu", dateCreated:"06/06/2021"}
        const response = await githubController.createRepoWebook(data)
        if(response) {
            expect(response).toEqual("got data");
        } else {
            throw new Error('Expected object not recieved')
        }
    })

    it('GET /createWebhook --> api to create github webhook', ()=> {

    })
})

