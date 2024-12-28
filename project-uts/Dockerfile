# Gunakan image Node.js resmi
FROM node:22

# Set working directory di dalam container
WORKDIR /

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file aplikasi ke dalam container
COPY . .

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "app.js"]
