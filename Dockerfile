# The public website (production). Built on the server by the POS stack: `./pos.sh build site`.
# Pages are prerendered during the build, so public settings are build args: change one, then rebuild.
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_SITE_ENV=production
ARG NEXT_PUBLIC_GA_ID=
ARG NEXT_PUBLIC_META_PIXEL_ID=
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ARG GOOGLE_SITE_VERIFICATION=
ARG BING_SITE_VERIFICATION=
ARG META_DOMAIN_VERIFICATION=
ARG FACEBOOK_APP_ID=
ENV NEXT_PUBLIC_SITE_ENV=$NEXT_PUBLIC_SITE_ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY GOOGLE_SITE_VERIFICATION=$GOOGLE_SITE_VERIFICATION BING_SITE_VERIFICATION=$BING_SITE_VERIFICATION META_DOMAIN_VERIFICATION=$META_DOMAIN_VERIFICATION FACEBOOK_APP_ID=$FACEBOOK_APP_ID NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Keeps the full node_modules: `next start` reads next.config.ts.
FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --chown=node:node --from=build /app ./
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
