export const Login = {
    namespaced: true,
    state: () => ({ 
        userSrno : 0,
        userId : "",
    }),
    mutations: {
        setUserSrno(state, userSrno){
            state.userSrno = userSrno;
        },
        setUserId(state, userId){
            state.userId = userId;
        },
    },
    getters: {
        getUserSrno : (state) =>{
            return state.userSrno
        },
        getUserId : (state) =>{
            return state.userId
        },
    }
};