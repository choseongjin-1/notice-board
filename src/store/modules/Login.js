export const Login = {
    namespaced: true,
    state: () => ({ 
        userSrno : 0
    }),
    mutations: {
        setUserSrno(state, userSrno){
            state.userSrno = userSrno;
        },
    },
    getters: {
        getUserSrno : (state) =>{
            return state.userSrno
        },
    }
};