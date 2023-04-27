# Surveillance Camera Management System (Simulation)

- [a web application]("https://surveillance-camera-management-system.vercel.app/") for managing a simulated network of surveillance cameras
in a building or facility.

## Features
- user can securely log in
- user can view past simulated surveillance footage
- user is alerted with motion and sound detection / offline 
- user can see where motion is ocurring / occured in recording 

## Getting Started

First, install dependencies by running:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Set the environment variables as specified in .env.example


Finally, open [http://localhost:3000](http://localhost:3000) with your browser!


### Stack:

- Next.js
  - Next-Auth
  - Prisma
- TypeScript
- Canvas API
- PostgreSQL
- AWS S3
- AWS CloudFront
- Jest and React Testing Library

Please Note:

- database not currently connected for deployment - still work in progress

### Stay Secure

Using this application to control a network of cameras, you will never miss any activity surrounding your property.

### Screenshots

![1](/docs/SMS_1.png?raw=true "1")
![1](/docs/SMS_2.png?raw=true "2")
![1](/docs/SMS_3.png?raw=true "3")