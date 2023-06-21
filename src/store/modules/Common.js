export const Common = {
    namespaced: true,
    state: () => ({ 
        alertParam : {
            isOpen : false
        }
    }),
    mutations: {
        showAlert(state, param){
            state.alertParam = param
            console.log("store??", state.alertParam);
        },
        closeAlert(state){
            state.alertParam.isOpen = false
            state.alertParam.msg = ""
            state.alertParam.positiveFn = () => {}
            state.alertParam.negativeFn = () => {}
        }
    },
    getters: {
        getAlert : (state) =>{
            return state.alertParam
        },
    }
};