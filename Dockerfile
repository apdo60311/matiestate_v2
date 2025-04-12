# syntax=docker/dockerfile:1
FROM node:alpine as compile_time

WORKDIR /app

COPY package*.json ./
RUN npm install --prod

COPY . . 

RUN npm run build

FROM node:alpine as runtime

RUN addgroup -S matiestategroup && adduser -S matiestateuser -G matiestategroup

WORKDIR /app

COPY --from=compile_time --chown=matiestateuser:matiestategroup ./app/dist ./dist
COPY --from=compile_time --chown=matiestateuser:matiestategroup ./app/node_modules ./node_modules
COPY --from=compile_time --chown=matiestateuser:matiestategroup ./app/package*.json ./

COPY --chown=matiestateuser:matiestategroup .env ./

USER matiestateuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3\
    CMD [ "wget --no-verbose --tries=1 --spider http://localhost:4000/ || exit 1" ]

CMD [ "npm", "run", "start" ]
