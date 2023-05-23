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
- Puppeteer
- Husky (Git Hook)
- SASS
- Env-CMD
- Yarn
- AWS SDK SES
- Mongoose (ODM)
- Joi (Request Parameter validation)
- react-reveal (Animation)
- react-countup (Animation)
- GOOGLE API
- Moment
- BCrypt (Password Hashing)

# Steps to run manually
| Step  | Instructions                                | Description                                                                                               |
| ----- |:--------------------------------------------|:--------------------------------------------------------------------------------------------------------- |
| 1     | > yarn install | This command will install the dependencies. |
| 2     | > yarn dev-build | This command will build the complete module. Once it completed you will find a new folder called app-dist in your folder hierarchy |
| 3     | > yarn watch-ui OR yarn watch-server | These commands will run the build and re-start. |
| 4     | > yarn dev-start | This command will run the development server. |
| 5     | > docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo:4.4.6 | This command can be used to spin up a mongo container in your local docker. Then change the config value MONGODB_HOST to container_ip. |
| 5     | run application launcher | Register external system user by following the "Manual Test" and get system token. Hit localhost:8080/api-dev/devLaunch on the browser. Use the token you got and launch the system. |

# Steps to run with Docker-Compose
| Step  | Instructions                                | Description                                                                                               |
| ----- |:--------------------------------------------|:--------------------------------------------------------------------------------------------------------- |
| 1     | docker compose --env-file .env.dev -f docker-compose-dev.yml up --build | Access the project folder with the terminal and run the command. This command will build the Docker image of the application and will start the application container. Besides that, it will initiate a MongoDB container in the local Docker.|
| 2     | check console | Check the console to get the health route. Also you can check the API spec for more details on routs. |
| 3     | connect MongoDB | You can use a tool like Mongo Compass to connect the docker Mongo container. |

# Steps to run in windows
| Step  | Instructions                                                                                     |
| ----- |:-------------------------------------------------------------------------------------------------|                                                     
| 1     | Create Mongo Connection using 'mongodb://localhost:27017/emays_service_db' in Mongo Compass |
| 2     | In emays-website/app/config/config.ts replace this "DB: { MONGO_URL: MONGO_URL || 'mongodb://root:123456@localhost:27017/emays_service_db?authSource=admin' } " with DB: { MONGO_URL: MONGO_URL || 'mongodb://localhost:27017/emays_service_db' }," Rest all the steps are same as mentioned above.|

# Dev guide
- make sure your Node version is >=14
- fix all ES-Lint issue before commit the code (auto check has been enabled with git hooks)
- implement new unit tests for BFF functions and check unit test issues before commit (auto check will be enabled soon) 
- integrate Jest Snapshot unit test cases for finalized UI components
- focus about proper error handling for business logic in frontend and backend
- follow design patterns at first place

# Architecture
- Monolithic
