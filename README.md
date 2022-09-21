This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

npx tailwindcss init -p

## Configure Google OAuth

To get your GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET, register your web app on firebase, and choose that project in Google Cloud Console.

Navigate to APIs & Services > Credentials > Edit Auth0 2.0 Client IDs

Inside you will find your CLIENT_ID and CLIENT_SECRET

Create a `.env.local` file and add the env inside it, as below

### Environment for development

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=http://localhost:3000/
```

### Environment for deployment on Vercel

The NEXTAUTH_URL is the domain you will get after you deploy the application to vercel. 

To deploy the application for production, you will need one more environment variable, namely JWT_SECRET.

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=https://twitter-clone-josealonso.vercel.app/
JWT_SECRET=a_long_string
```

**Ensure** that the above environment variables have the same value as those declared in Google Cloud Console.
