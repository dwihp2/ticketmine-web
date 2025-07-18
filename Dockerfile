# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --production

# Copy all source files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port (default Next.js port)
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
