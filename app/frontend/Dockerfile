FROM node:16.14-alpine
WORKDIR /app-frontend
# COPY package.json .
COPY . .
RUN npm install
EXPOSE 3000
# ENTRYPOINT [ "npm", "run" ]
CMD [ "npm", "start" ]

# FROM node:16.14-alpine

# WORKDIR /app-frontend

# COPY . .

# RUN npm install

# EXPOSE 3000

# ENTRYPOINT [ "npm", "start" ]
