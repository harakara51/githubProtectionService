const axios = require('axios')
module.exports = class GithubService{
    static async getUserProfile(){
        try {
            const profile = await axios.get('https://api.github.com/users/harakara51');
            return profile.data;
        } catch (error) {
            console.log(`Could not fetch user profile`)
            console.log(error)
        }
    }

    //function to change protection of master branch on new repository
    static async createRepo(data){
        try {
            console.log("in create repo function, changing protection of master branch on new repository")
            let result =await this.changeRepoProtection (data);
            await this.createGithubIssue (data)
            return result;
        } catch (error) {
            console.log(`Could not get webhook from user`)
            console.log(error)
        }
    }
    static async changeRepoProtection(data){
        try {
            let repoName = data.repository.full_name;
            let putData = {
                owner: data.organization.login,
                repo: data.repository.name,
                branch: 'branch',
                required_status_checks: {
                  strict: true,
                  contexts: [
                    'contexts'
                  ]
                },
                enforce_admins: true,
                required_pull_request_reviews: {
                  dismissal_restrictions: {
                    users: [
                      'users'
                    ],
                    teams: [
                      'teams'
                    ]
                  },
                  dismiss_stale_reviews: true,
                  require_code_owner_reviews: true,
                  required_approving_review_count: 2
                },
                restrictions: {
                  users: [
                    'users'
                  ],
                  teams: [
                    'teams'
                  ],
                  apps: [
                    'apps'
                  ]
                }
            }
            console.log("changing repo protection")
            console.log(repoName)
            const url = `https://api.github.com/repos/${repoName}/branches/main/protection`
            let result = await this.putToGithubAPI(url, putData)
            return result;
        } catch (error) {
            console.log(`Could not change branch protection`)
            console.log(error)
        }
    }
    //function to create a github issue when repo protection is changed
    static async createGithubIssue (data){
        try {
            let repoName = data.repository.full_name;
            let putData = {
                owner: data.organization.login,
                repo: data.repository.name,
                title: 'Changed Master Branch protection',
                labels: ['documentation'],
                assignees: [data.sender.login],
                body : `@${data.sender.login} following restriction has been made
                enforce_admins: true
                dismiss_stale_reviews: true,
                require_code_owner_reviews: true,
                required_approving_review_count: 2
                    `
                }
            console.log("changing repo protection")
            console.log(repoName)
            const url = `https://api.github.com/repos/${repoName}/issues`
            let result = await this.postToGithubAPI(url, putData)
            return result;
        } catch (error) {
            console.log(`Could not change branch protection`)
            console.log(error)
        }
    }
    // reusable fuction to PUT to github API
    static async putToGithubAPI(url, data){
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.luke-cage-preview+json',
            'Authorization': `token ${env.GITHUB_TOKEN}`
          }
          
        let result;
        try
        {    
            result = await axios.put(url, data, {
                    headers: headers
                });
           // console.log(result.status)
        }catch(error){
            console.log(error)
            console.log(Object.keys(error), error.message);
            console.log("failed to make put request to github to update branch protection")
        }
        return result;
    }

    // reusable fuction to POST to github API
    static async postToGithubAPI(url, data){
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.luke-cage-preview+json',
            'Authorization': `token ${env.GITHUB_TOKEN}`
          }
          
        let result;
        try
        {    
            result = await axios.post(url, data, {
                    headers: headers
                });
            //console.log(result.status)
        }catch(error){
            console.log(error)
            console.log(Object.keys(error), error.message);
            console.log("failed to make put request to github to update branch protection")
        }
        return result;
    }
     // function to create a github webhook
     static async createWebhook(){
      const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.luke-cage-preview+json',
          'Authorization': `token ${env.GITHUB_TOKEN}`
        }
      let url = `https://api.github.com/repos/${env.GITHUB_ORGANIZATION}/${repo}/hooks`
      let data = {
        org: env.GITHUB_ORGANIZATION,
        name: 'protectMasterBranch',
        config: {
          url: env.WEBSERVICE_URL,
          content_type: 'json',
          insecure_ssl: 'insecure_ssl',
        },
        events: [
          "push",
          "repositories"
        ],
        active: true,
      }
      let result;
      try
      {    
          result = await axios.post(url, data, {
                  headers: headers
              });
          //console.log(result.status)
      }catch(error){
          console.log(error)
          console.log(Object.keys(error), error.message);
          console.log("failed to make put request to github to update branch protection")
      }
      return result;
  }   
}