# ---------- builder ----------
FROM node:18-alpine AS builder
WORKDIR /app

# install deps
COPY package*.json ./
RUN npm ci

# copy source and build
COPY . .
# allow injecting VITE build-time env (default points to backend service network name)
ARG VITE_BACKEND_URL=http://backend:4001
# write a simple env file used by Vite during build (Vite picks VITE_* variables)
RUN printf "VITE_BACKEND_URL=%s\n" "$VITE_BACKEND_URL" > .env.production
RUN npm run build

# normalize build output to /app/out
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
