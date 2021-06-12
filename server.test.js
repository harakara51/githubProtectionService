const supertest = require('supertest')
const app = require('./server.js')
const API = supertest(app)
describe("Github API", ()=> {
    it('GET / --> REST API works, expect a String', async () => {
        // const response = await API.get('/test')
        // //response.body.expect('Hello')
        // if(response && response.body && response.body.name) {
        //     expect(response.body.name).toBe("Anup")
        // } else {
        //     throw new Error('Expected object not recieved')
        // }
    })

    it('GET /monitorProjects --> api for github webhook to protect master branch', ()=> {

    })

    it('GET /createWebhook --> api to create github webhook', ()=> {

    })
})

