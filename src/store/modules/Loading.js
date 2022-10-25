export const Loading = {
    namespaced: true,
    state: () => ({ 
        LoadingStatus : false
    }),
    mutations: {
        startSpinner(state){
            state.LoadingStatus = true;
        },
        endSpinner(state){
            state.LoadingStatus = false;
        }
    },
    getters: {
        loadingStatus : (state) =>{
            return state.LoadingStatus
        },
    }
};