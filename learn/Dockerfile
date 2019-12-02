FROM node:10.12.0
ARG graphcms_token
ARG graphcms_base_url
ARG node_env
ARG google_analytics_token
ARG site_url
ARG generate_sitemaps
ARG google_analytics_cookie_domain
ENV GRAPHCMS_TOKEN=$graphcms_token
ENV GRAPHCMS_BASE_URL=$graphcms_base_url
ENV NODE_ENV=$node_env
ENV GOOGLE_ANALYTICS_TOKEN=$google_analytics_token
ENV SITE_URL=$site_url
ENV GENERATE_SITEMAPS=$generate_sitemaps
ENV GOOGLE_ANALYTICS_COOKIE_DOMAIN=$google_analytics_cookie_domain
WORKDIR /edmit-learn
COPY . /edmit-learn
RUN yarn install
RUN yarn build
RUN ls -aln /edmit-learn/public