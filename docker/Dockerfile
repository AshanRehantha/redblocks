
FROM node:20

LABEL version="1.0"
LABEL description="This is the base docker image for dl customer portal."
LABEL maintainer = ["iashanrehantha@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
COPY . .

EXPOSE 8787
EXPOSE 3000

CMD ["npm", "run", "start:dev"]