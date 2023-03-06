# Emays UI Application
Emays UI Application enable the following features to customers.
 - Bring the desired shopping cart items to your door step to try them out before buy them

This repository consists of a React UI and its Immediate Backend.

# Technical Stack & External Dependencies

- ES-Lint
- Vite Bundler
- React
- Carbon/React
- Node Express
- TypeScript
- EJS
- Jest
- Husky (Git Hook)
- SASS
- Env-CMD
- Yarn

# Steps to run manually
| Step  | Instructions                                | Description                                                                                               |
| ----- |:--------------------------------------------|:--------------------------------------------------------------------------------------------------------- |
| 1     | > yarn install | This command will install the dependencies. |
| 2     | > yarn dev-build | This command will build the complete module. Once it completed you will find a new folder called app-dist in your folder hierarchy |
| 3     | > yarn watch-ui OR yarn watch-server | These commands will run the build and re-start. |
| 4     | > yarn dev-start | This command will run the development server. |
| 5     | run application launcher | Hit localhost:8080/api-dev/devLaunch on the browser. |

# Dev guide
- make sure your Node version is >=14
- fix all ES-Lint issue before commit the code (auto check has been enabled with git hooks)
- implement new unit tests for BFF functions and check unit test issues before commit (auto check will be enabled soon) 
- integrate Jest Snapshot unit test cases for finalized UI components
- focus about proper error handling for business logic in frontend and backend
- follow design patterns at first place

# Architecture
- Monolithic