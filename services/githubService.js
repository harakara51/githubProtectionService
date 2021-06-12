const axios = require('axios')
require('dotenv').config()
const ngrok = require('ngrok');
const githubAPIObject = require('./githubAPIobject')
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
            let putData = githubAPIObject.changeRepoProtectionObj(data);
            console.log("changing repo protection")
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
            let putData = githubAPIObject.createIssueObj(obj);
            console.log("changing repo protection")
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
        let result;
        try
        {   
            console.log("making a PUT request to github API to make branch protection changes") 
            result = await axios.put(url, data, {
                    headers: githubAPIObject.HeaderPreview
                });
           // console.log(result.status)
        }catch(error){
           // console.log(error)
            console.log(Object.keys(error), error.message);
            console.log("failed to make put request to github to update branch protection")
        }
        return result;
    }

    // reusable fuction to POST to github API
    static async postToGithubAPI(url, data){
      let result;
        try
        {    
            result = await axios.post(url, data, {
                    headers: headers.githubAPIObject.HeaderPreview
                });
        }catch(error){
            console.log(error)
            console.log(Object.keys(error), error.message);
            console.log("failed to make put request to github to update branch protection")
        }
        return result;
    }
     // function to create a github webhook
     static async createWebhook(){
      let url = `https://api.github.com/orgs/${process.env.GITHUB_ORGANIZATION}/hooks`
      // setup negrok locally
      let  ngrokUrl = await ngrok.connect({addr: 4567});
      ngrokUrl = ngrokUrl +'/github/webhookListenerForGithub';
      console.log("ngrok url is set at: ", ngrokUrl);
      let result;
      try
      {    
          result = await axios.post(url, githubAPIObject.createWebhookObj, {
                  headers: githubAPIObject.Header
            });
      } catch(error){
          console.log(error.response.data)
         // console.log(Object.keys(error), error.message);
          console.log("failed to make organization webhook")
      }
      return result;
  }   
}