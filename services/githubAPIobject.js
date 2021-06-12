require('dotenv').config()
const githubAPIObject ={};
githubAPIObject.createWebhookObj = (ngrokUrl)=> {
    let data ={
        org: process.env.GITHUB_ORGANIZATION,
        name: 'web',
        config: {
        url: ngrokUrl,
        content_type: 'json',
        },
        events: [
            "repository"
        ],
    }
    return data;
  }

  githubAPIObject.createIssueObj = (data)=>{
    let apiObj ={
        owner: data.organization.login,
        repo: data.repository.name,
        title: 'Changed Master Branch protection',
        labels: ['documentation'],
        assignees: [data.sender.login],
        body : `@${data.sender.login} following branch restriction and protection on main branch has been made
                enforce_admins: true
                dismiss_stale_reviews: true,
                require_code_owner_reviews: true,
                required_approving_review_count: 2`
        }
    return apiObj;
    }
    githubAPIObject.changeRepoProtectionObj = (data)=>{
        let apiObj ={
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
        return apiObj;
        }
  githubAPIObject.Header = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${process.env.GITHUB_TOKEN}`
  }

  githubAPIObject.HeaderPreview = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.luke-cage-preview+json',
    'Authorization': `token ${process.env.GITHUB_TOKEN}`
  }

  module.exports =githubAPIObject;