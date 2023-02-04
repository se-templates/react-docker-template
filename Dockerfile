#FROM node:17-alpine as builder
#WORKDIR /app
#COPY package.json .
#COPY yarn.lock .
#RUN yarn install
#COPY . .
#RUN yarn build

#FROM nginx:1.19.0
#WORKDIR /usr/share/nginx/html
#RUN rm -fr ./*
#COPY --from=builder /app/build .
#ENTRYPOINT ["nginx", "-g", "deamon off;"]



# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package.json /react-app
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start