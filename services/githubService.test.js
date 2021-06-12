const githubService = require('./githubService')

describe("Github Service", ()=> {
    let data ={}
    data.repository.name = 'cicada3';
    data.sender.login ='harkara51'
    data.data.repository.full_name ='sebastian52/cicada3'
    data.organization.login = 'sebastian52'

    it('test get user profile service', async () => {
        const response = await githubService.getUserProfile();
        if(response) {
            expect(response.login).toEqual("harakara51");
        } else {
            throw new Error('Expected object not recieved')
        }
    })
    
    it('test function that the webhook calls', async () => {
        
       
        const response = await githubService.createRepo(data);
        if(response) {
            expect(response).toEqual("got data");
        } else {
            throw new Error('Expected object not received')
        }
    })
    it('test change protection function of master branch', async () => {
        const repoName = 'sebastian52/cicada3'
        const response = await githubService.changeRepoProtection(repoName);
        if(response) {
            expect(response.status).toEqual(200);
        } else {
            throw new Error('Expected object not recieved')
        }
    })
    it('test issue creation', async () => {

        const response = await githubService.createGithubIssue(data);
        if(response) {
            expect(response.status).toEqual(201);
        } else {
            throw new Error('Expected object not recieved')
        }
    })

    it('test webhook creation', async () => {
        const response = await githubService.createWebhook();
        if(response) {
            expect(response.status).toEqual(201);
        } else {
            throw new Error('Expected object not recieved')
        }
    })
})

