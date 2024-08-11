# Use Node.js LTS (Long Term Support) as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /code

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your Next.js project files into the container
COPY . .

# Build the Next.js application
# RUN npm run build

# Expose the port that Next.js runs on
EXPOSE 3070

# Start the Next.js application in development mode
CMD ["npm", "run", "dev"]