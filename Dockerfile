### build image
FROM node:lts-bookworm-slim AS builder

ARG BUILD_LOCALE=all
ARG BUILD_SKIP=false

### copy files
COPY ./ /fly-docs/

RUN if [ "$BUILD_SKIP" = "true" ]; then \
        rm -rf /fly-docs/node_modules ; \
        rm -rf /fly-docs/docs ; \
        rm -rf /fly-docs/i18n ; \
        exit 0 ; \
    else \
        rm -rf /fly-docs/node_modules ; \
        apt-get update && apt-get install -y \
        --no-install-recommends \
        --no-install-suggests \
        ### non-specific packages
        git \
        sudo \
        ### node-canvas dependencies
        build-essential \
        libcairo2-dev \
        libpango1.0-dev \
        libjpeg-dev \
        libgif-dev \
        librsvg2-dev \
        ### clean up
        && apt-get -y autoremove \
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* ; \
        cd /fly-docs ; \
        npm install -g pnpm ; \
        pnpm install ; \
        if [ "$BUILD_LOCALE" = "all" ]; then \
            pnpm build ; \
        else \
            pnpm build --locale "$BUILD_LOCALE" ; \
        fi ;\
        exit 0 ; \
    fi

### final image
FROM nginx:stable-alpine-slim AS runner
RUN rm -rf /etc/nginx/conf.d/default.conf \
    && mkdir -p /web
COPY --from=builder /fly-docs/build/ /web/

WORKDIR /web
COPY ./scripts/nginx-web.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
