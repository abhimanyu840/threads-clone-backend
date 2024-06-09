import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../services/user";

const queries = {
    getUserToken: async (_: any, payload: GetUserTokenPayload) => {
        const token = await UserService.getUserToken({ ...payload });
        return token;
    },
    getLoggedInUser: async (_: any, params: any, context: any) => {
        try {
            if(context && context.user){
                const user = UserService.getUserByID(context.user.id);
                return user;
            }
        } catch (error) {
            throw new Error("Oops! Some Error occurred")
        }
    }
};

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const { firstName, lastName, email, password } = payload
        const res = await UserService.createUser({ firstName, lastName, email, password })
        return res?.id
    }
};

export const resolvers = { queries, mutations };