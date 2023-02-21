FROM node:18-bullseye-slim as base

# ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl


# Install all node_modules, including dev dependencies
FROM base as deps

RUN mkdir /app
WORKDIR /app

ADD package.json yarn.lock ./


RUN yarn install

# Setup production node_modules
# FROM base as production-deps

# RUN mkdir /app
# WORKDIR /app

# COPY --from=deps /app/node_modules /app/node_modules
# ADD package.json yarn.lock ./
# RUN yarn prune --production

# Build the app
FROM base as build

RUN mkdir /app
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules /app/node_modules
# COPY /.env /app/.env

# ADD prisma .
RUN yarn prisma generate

ENV NODE_ENV production
RUN yarn build

# final image
FROM base

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/public /app/public

ENV PORT 8080
ENV DATABASE_URL "file:./dev.db"
ENV SESSION_SECRET "dogscanflynow"
ENV NODE_ENV production

CMD ["yarn", "start"]
