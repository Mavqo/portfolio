# Multi-stage Dockerfile for Astro Static Site
# Build cache invalidation: 2025-04-03-2238

# ==========================================
# Stage 1: Build (Node.js)
# ==========================================
FROM node:22-alpine AS builder

# Cache buster - cambia ad ogni build
ARG CACHE_BUST=1
ENV CACHE_BUST=$CACHE_BUST

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the static site
RUN npm run build

# ==========================================
# Stage 2: Serve with Nginx
# ==========================================
FROM nginx:alpine

# Install envsubst for variable substitution
RUN apk add --no-cache gettext

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port (Railway will override with $PORT)
EXPOSE 80

# Start nginx with envsubst to replace $PORT
CMD envsubst '\${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
