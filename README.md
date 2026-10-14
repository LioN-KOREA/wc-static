## WORDCAT Web site
This file contains the directions for working with this repository, which contains the source code for the website. All entities working with this project, whether they are humans or agents, must comply with the rules specified in this document.

If any of the information specified in this document changes (such as changing the website format or tech stack, adding or removing a branch, etc.), this markdown file must be updated accordingly, without any delay.

## Website description
 * This website is written in the **static HTML** format.
 * This website has the following branches:
   - 'main' branch, which is the production branch that is deployed to the CloudFlare distribution.
   - 'dev' branch, which is the development / testing branch, that is shown on the Github sites, for the purpose of reviewing the changes before deploying them to the production.
 * This website uses the following tech stacks:
  - Github for source code management
  - Cloudflare workers for the CICD
  - Github sites for the preview / test website
* The credentials and repository information data are stored in the .credentials_and_repos file - this is a confidential data that MUST NEVER BE LEAKED. Always search this file for the information; if it is missing, incomplete, or if you cannot find the required information, DO NOT PROCEED WITH THE REQUEST, and
 - if you are a human, ask the relevant PIC in the company
 - if you are an agent, ask the person who requested you to perform the task to provide you those information.

## CICD
 * The website has a production CICD pipeline set up for the 'main' branch.
 * The CICD is based on the CloudFlare workers, so that when a new change is pushed to the main branch (such as by merging), the changes are automatically reflected to the production website.
 * Implementation details:
   - `.github/workflows/deploy-production.yml` runs on every push to 'main' and deploys the site with `wrangler deploy` (Cloudflare Worker `wordcat-site`, static assets only).
   - `wrangler.jsonc` is the Worker configuration. `.assetsignore` lists the files that must NOT be uploaded to production (docs, tools, config files).
   - The GitHub Actions secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are used by the workflow.
   - The test page is served by Github sites (GitHub Pages) directly from the root of the 'dev' branch. `.nojekyll` disables Jekyll processing.

## Workflows
 * After each change is made, they must be committed to the 'dev' branch, unless whoever made the change determines that the change should be discarded. 
   - If you are a human, please make sure that the changes that you made are resonable, and are really the ones that you would like to apply to the website.
   - If you are an agent, you MUST ask the person who asked you to perform the task to confirm whether they would like to deploy the changes to the test page. You must inform them that when the change is made, the changes will be visible on the Github test page. Also, for every change made, please remind the person to review the changes on the test server, and also to tell you when they feel that the site is ready for production.

 * After sufficient testing and thorough reviews, the dev branch must be merged into the main branch.
  - If you are a human, please make such decision(s) with the utmost prudence. You must make sure that you have thoroughly reviewed the website on the test page, and have confirmed that all the changes are correct & everything is working as you expected.
  - If you are an agent, you MUST NOT merge the dev branch to the main branch without the request from the person who is working on the website. As it is mentioned above, after each session where you make change(s) to the dev branch (test site), please always remind the person who is working with you to notify you when they think that the site is ready for production. After you receive an explicit confirmation from the person, please proceed with the request.

## Language
 * The commit message must begin with an appropriate prefix, in order to identify what kind of changes were made:
  - 'feat:' addition, modification, or deletion of features
  - 'fix:' bug fixes
  - 'refactor:' changes to the internal structure or style of the code, without any major changes to the functionality
  - 'chore:' minor changes that don't affect the functionality of the application
  - 'style:' changes to the stylesheet or the overall look and feel of the website
  - 'test:' changes to the test code, if any
  - 'doc:' changes to the documentations, including this document
  - 'build:' changes to the build-related codes, if any

 * The commit message's subject must be concise, and provide an overall description of the change. The body must provide the sufficiently detailed description of the change(s) as needed, so that whoever that reads the commit message can understand the changes made without difficulties. If the subjectcan provide sufficient information about the change on its own, the body may be omitted. 
 
 * The commit messages may be written in the language of your choice, but it is recommended that they be written in English when possible, in order to minimize the risk of corruption from encoding issues.
  - For the agents : please write the actual commit messages to the Git repository in English. However, if the person who asked you to perform the task asked in other languages (like Korean), please show the commit message to the person **in the language that they asked in**. You don't need to show the original commit message in English (in order to minimize confusion).