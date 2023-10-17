# use fertile image to enable cmd access and other features
FROM node:14 as build
# create folder structure with the appropriate permission
RUN  mkdir -p /home/node/app && chown -R node:node /home/node/app
# change the current directory to app
WORKDIR /home/node/app
# copy important folders & files
COPY --chown=node:node ["global-bundle.pem", "package.json", ".env.dev", "server.ts", "tsconfig.json", "vite.config.js", ".env-cmdrc.json", "app.ts", "yarn.lock", "./"]
COPY --chown=node:node app ./app
COPY --chown=node:node public ./public
# change user
USER node
# install dependencies and compile typescript
RUN yarn install && yarn build
# remove unnecessary folders and files
RUN rm -r ./public
RUN rm -r ./app
RUN rm tsconfig.json server.ts app.ts

# use minimal image for the final image construction
FROM node:alpine as main
COPY --from=build /home/node/app /
EXPOSE $NODE_DOCKER_PORT
CMD ["yarn", "start"]