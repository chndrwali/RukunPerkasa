This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/chndrwali/RukunPerkasa.git
   ```

2. Install dependencies using npm

   ```bash
   npm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Configure your .env file with your secret

   ```env
   DATABASE_URL =
    NEXTAUTH_SECRET=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    STRIPE_SECRET_KEY=
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
    STRIPE_WEBHOOK_SECRET=
   ```

5. Generate prisma client

   ```bash
   npx prisma generate
   ```

6. Push the database schema

   ```bash
   npx prisma db push
   ```

7. Start the development server

   ```bash
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Where do I deploy this?

- For the Nextjs application, I deploy it on [Vercel](https://vercel.com/)
- And for the NoSQL database I deploy it on [MongoDB Atlas](https://www.mongodb.com/)

# Tools and Frameworks Used in This Project

- [MongoDB Atlas](https://www.mongodb.com/): Cloud-based database.
- [NextAuth.js](https://next-auth.js.org/): User authentication.
- [Google Cloud Platform](https://console.cloud.google.com/welcome/new): Google authentication provider.
- [Prisma](https://www.prisma.io/): Object Relational Mapping tool.
- [Tailwind CSS](https://tailwindcss.com/): Styling framework.
- [Stripe](https://stripe.com/): Handling payment processes.
- [Firebase Storage](https://console.firebase.google.com/) Storage for save image.

# Dummy Data for Stripe Visa

- **Credit Card Number:** 4242 4242 4242 4242
- **Expires:** 04/44
- **CVC:** 444
