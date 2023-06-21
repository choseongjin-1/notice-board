<template>
    <div v-if="store.getters['Common/getAlert'].isOpen" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                {{ store.getters['Common/getAlert'].msg }}
            <slot></slot>
            <div class="buttons">
                <button class="button is-primary" @click="clickConfirm">확인</button>
                <button class="button" v-show="store.getters['Common/getAlert'].type == 1" @click="clickCancel">취소</button>
            </div>
            </div>
        </div>
        <button class="modal-close is-large" @click="clickCancel"></button>
    </div>
  </template>
  
<script>
import { onMounted } from "vue";
import { useStore } from 'vuex';
  
export default {
    name : 'noticeAlert',
    components:{},
    setup(){

        const store = useStore()

        onMounted(() => {
        })

        //확인버튼
        const clickConfirm = () => {
            store.getters["Common/getAlert"].positiveFn()
        }
        //취소버튼
        const clickCancel = () => {
            store.getters["Common/getAlert"].negativeFn()
        }

        return {
            store : store,
            clickConfirm : clickConfirm,
            clickCancel : clickCancel,
        }
    }
  }
</script>
  
<style scoped>
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    width: 60%;
    max-width: 400px;
    margin: 20% auto;
  }
  
  .box {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  
  .buttons {
    margin-top: 20px;
    text-align: right;
  }
  
  .button {
    margin-left: 10px;
    background-color: #4caf50;
    border: none;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
  </style>