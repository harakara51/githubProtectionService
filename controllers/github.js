// all entrypoint/api for gihub goes here
const GithubService = require("../services/githubService");


module.exports = class GithubController{

    static async getUserProfile(req, res, next){
        try {

          const profile = await GithubService.getUserProfile();
          if(!profile){
             res.status(404).json("There are no github user profile found!")
          }
          console.log(profile)
          return profile
        } catch (error) {
           console.log(error)
           if(res && res.status) {
            res.status(500).json({error: error})
           }

        }
    }
    static async createRepoWebook(req, res, next){
      try {
         console.log("github webhook response is:  .. ")
        const result = await GithubService.createRepo(req.body);
        if(!result){
           res.status(404).json("There are no github user profile found!")
        }
        return result;
      } catch (error) {
         console.log(error)
         if(res && res.status) {
          res.status(500).json({error: error})
         }

      }
  }
 }
 