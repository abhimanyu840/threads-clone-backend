import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import createApolloGraphqlServer from './graphql';
import UserService from './services/user';



const init = async () => {

    const app = express()
    const PORT = Number(process.env.PORT) || 9000


    // Specify the path where we'd like to mount our server

    app.get('/', (req, res) => {
        res.json({ message: 'Server is up' })
    })

    const gqlServer = await createApolloGraphqlServer()
    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(gqlServer, {
        //@ts-ignore
        context: async ({ req }) => {
            const token = req.headers['token']
            try {
                const user = UserService.decodeJWTToken(token)
                return ({ user })
            } catch (error) {
                return {};
            }
        }
    }));

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })
}

init();