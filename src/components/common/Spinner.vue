<!-- Spinner.vue -->
<template>
    <div class="loding-area" v-if="loading"></div>
    <div class="spinner-container">
        <div class="spinner" />
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
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
}
.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #e0e0e0;
  border-bottom: 5px solid #fe9616;
  animation: spin 1s linear infinite;
  position: relative;
  text-align: center;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
