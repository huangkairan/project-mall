<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  props:{
    // message:{
    //   type:String,
    //   default: ''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return {
      message: '',
      isShow: false
    }
  },
  methods:{
    show(message,duration){
      this.message = message;
      this.isShow = true;
      //  console.log('333');
  
      setTimeout(() => {
        this.message = '';
        this.isShow = false;
      }, duration);
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.8);
    color: #fff;
    border-radius: 30px;
    padding: 4px 10px;
    z-index: 999;
  }
</style>