# Node.js 20 Alpine version base image ekak use karanawa
FROM node:20-alpine

# nodemon global widihata install karanawa (development walata auto restart wenna)
RUN npm install -g nodemon

# Container ekata working directory eka set karanawa
WORKDIR /app

# Project eke files okkoma container ekata copy karanawa
COPY . .

# Project dependencies install karanawa (package.json eken)
RUN npm install

# Container eka use karana port eka (backend server port)
EXPOSE 5000

# Container start wenakota run wena command eka
CMD ["npm", "run", "start"]