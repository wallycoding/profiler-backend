FROM node:17-slim
WORKDIR /application/profiler
COPY package.json .
RUN npm install
COPY . .
USER node
CMD ["npm", "run", "dev"]