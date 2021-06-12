const supertest = require('supertest')
const app = require('./app.js')
const API = supertest(app)
describe("Github API", ()=> {
    it('GET /test API', async () => {
        const response = await API.get('/test')
        if(response && response.body && response.body.name) {
            expect(response.body.name).toBe("Anup")
        } else {
            throw new Error('Expected object not recieved')
        }
    })

    it('GET /github/createWebhook API', async () => {
        const response = await API.get('/github/createWebhook')
        console.log(response.body)
        if(response && response.body) {
            expect(response.body).toBe("Webhook created")
        } else {
            throw new Error('Expected object not recieved')
        }
    })
    it('POST /github/webhookListenerForGithub --> api that listens to webhook to protect master branch', ()=> {
        const response = await API.get('/github/webhookListenerForGithub')
        //response.body.expect('Hello')
        if(response && response.body) {
            expect(response.body).toBe("Valid Webhook recieved, updated branch rules for master branch")
        } else {
            throw new Error('Expected object not recieved')
        }
    })
})

