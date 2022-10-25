<!-- Spinner.vue -->
<template>
    <div class="loding-area" v-if="loading"></div>
    <div class="loading" v-if="loading">

            <div class="load">
                <img src="@/assets/images/loading.gif" alt="loading...">
            </div>
        
    </div>
</template>
<script>
export default {
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
<style>
.loding-area {
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    display: block;
    opacity: 0.2;
    background-color: #000;
    text-align: center;
    z-index: 99;
}
.loding-bar {
    display: inline-block;
    position: absolute;
    width: 64px;
    height: 64px;
    top: 47%;
    left: 47%;
    z-index: 100;
}
/* .loding-bar div {
    display: inline-block;
    position: absolute;
    left: 6px;
    width: 13px;
    background: #42b883;
    animation: loding-bar 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loding-bar div:nth-child(1) {
    left: 6px;
    animation-delay: -0.24s;
}
.loding-bar div:nth-child(2) {
    left: 26px;
    animation-delay: -0.12s;
}
.loding-bar div:nth-child(3) {
    left: 45px;
    animation-delay: 0;
}
@keyframes loding-bar {
    0% {
        top: 6px;
        height: 51px;
    }
    50%,
    100% {
        top: 19px;
        height: 25px;
    }
} */
</style>
