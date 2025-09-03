import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express();
const PORT = Number(process.env.PORT) || 8000;

const gqlserver = new ApolloServer({
    typeDefs: `
     type Query {
       hello: String
       say(name: String): String
     }
    `,
    resolvers: {
        Query:{
            hello: () => `Hello World`,
            say: (_, { name }: { name: string }) => `Hello ${name}`
        }
    }
});

await gqlserver.start();

app.get('/', (req,res) => {
    res.json({message:'server is up and running'});
});

app.use('/graphql', express.json(), expressMiddleware(gqlserver));

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
}
init();