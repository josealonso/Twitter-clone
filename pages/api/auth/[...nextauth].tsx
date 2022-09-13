import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // add more providers here
    ],
    callbacks: {
        async session({ session, user, token }) {
            let tag = session.user?.name !== undefined ? session.user.name : undefined;
            if (tag) {
                tag
                    .split(" ")
                    .join("")
                    .toLocaleLowerCase();
            }
            session.user?.name !== undefined ? token.sub : undefined;
            // session?.user?.name = token.sub;
            return session;
        },
    },
});
