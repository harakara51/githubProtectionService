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
    //create a api that listen to the webhook
    static async webHookListenerForOrg(req, res, next){
      try {
         console.log("github webhook response type is:  .. ", req.body.action)
         if(req.body.action=="created") {
            console.log("event type creating detected, making changes ....")
            const result = await GithubService.createRepo(req.body);
            if(!result){
               res.status(404).json("There are no github user profile found!")
            }
            res.status(200).json("Valid Webhook recieved, updated branch rules for master branch")
         } else {
            console.log("event is not related to repository creating, so not doing anything")
            res.send("Event is not related to repository creating, so not doing anything");
         }

      } catch (error) {
         console.log(error)
         if(res && res.status) {
          res.status(500).json({error: error})
         }

      }
  }

  static async createOrganizationWebook(req, res, next){
   try {
 
         console.log("Creating organization webhook ....")
         const result = await GithubService.createWebhook();
         if(!result){
            res.status(404).json("Something went wrong, unable to create webhook")
         }
         res.status(200).json("Webhook created")

   } catch (error) {
      console.log(error)
      if(res && res.status) {
       res.status(500).json({error: error})
      }

   }
}
 }
 