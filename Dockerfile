# ── Build stage ──
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Serve stage ──
FROM nginx:alpine AS serve

# Copy built assets to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# SPA fallback: redirect all routes to index.html
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    # Cache static assets aggressively \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|avif|woff2?)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
