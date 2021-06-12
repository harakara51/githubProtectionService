const githubService = require('./githubService')

describe("Github Service", ()=> {
    

    it('test get user profile service', async () => {
        const response = await githubService.getUserProfile();
        if(response) {
            expect(response.login).toEqual("harakara51");
        } else {
            throw new Error('Expected object not recieved')
        }
    })
    
    it('test function that the webhook calls', async () => {
        
        let data ={repository:{name : 'cicada3' ,full_name :'sebastian52/cicada3'}, organization:{login:'sebastian52'}, sender:{login:"harakara51"} }
        const response = await githubService.createRepo(data);
        if(response) {
            expect(response).toEqual("got data");
        } else {
            throw new Error('Expected object not received')
        }
    })
    it('test change protection function of master branch', async () => {
        let data ={repository:{name : 'cicada3' ,full_name :'sebastian52/cicada3'}, organization:{login:'sebastian52'}, sender:{login:"harakara51"} }
        const response = await githubService.changeRepoProtection(repoName);
        if(response) {
            expect(response.status).toEqual(200);
        } else {
            throw new Error('Expected object not recieved')
        }
    })
    it('test issue creation', async () => {
        let data ={repository:{name : 'cicada3' ,full_name :'sebastian52/cicada3'}, organization:{login:'sebastian52'}, sender:{login:"harakara51"} }
        const response = await githubService.createGithubIssue(data);
        if(response) {
            expect(response.status).toEqual(201);
        } else {
            throw new Error('Expected object not recieved')
        }
    })

    it('test webhook creation', async () => {
        let data ={repository:{name : 'cicada3' ,full_name :'sebastian52/cicada3'}, organization:{login:'sebastian52'}, sender:{login:"harakara51"} }
        const response = await githubService.createWebhook();
        if(response) {
            expect(response.status).toEqual(201);
        } else {
            throw new Error('Expected object not recieved')
        }
    })
})

