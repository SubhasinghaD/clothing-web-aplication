# ---------- builder ----------
FROM node:18-alpine AS builder
WORKDIR /app

# install deps
COPY package*.json ./
RUN npm ci

# copy source, set build-time env and build
COPY . .
ARG VITE_BACKEND_URL=http://backend:4001
RUN printf "VITE_BACKEND_URL=%s\n" "$VITE_BACKEND_URL" > .env.production
RUN npm run build

# normalize build output to /app/out (works for CRA/Vite outputs)
RUN set -eux; \
    if [ -d /app/build ]; then \
      mkdir -p /app/out && cp -r /app/build/* /app/out/; \
    elif [ -d /app/dist ]; then \
      mkdir -p /app/out && cp -r /app/dist/* /app/out/; \
    else \
      echo "ERROR: no build output found (neither /app/build nor /app/dist)"; \
      ls -la /app; \
      exit 1; \
    fi

# ---------- production ----------
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
