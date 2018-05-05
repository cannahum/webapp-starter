FROM node:9.11.1-onbuild

# Create app directory
RUN mkdir /usr/app
RUN mkdir /usr/app/server

WORKDIR /usr/app/server

# Install app dependencies
COPY ./package.json /usr/app/server
COPY ./package-lock.json /usr/app/server


RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /usr/app/server

CMD [ "npm", "run", "start:dev" ]