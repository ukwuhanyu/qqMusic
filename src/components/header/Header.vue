<template>
  <div>
    <div class="header">
      <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt="" srcset="">
      <a href="javascript:;">下载APP</a>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus" scoped>
.header{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 5px 5px rgba(0,0,0,.02);
  background: #fff;
  width: 100%;
  height: 0.8rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img{
    display: block;
    height: 0.35rem;
  }
  a{
    display: block;
    min-width: 0.4rem;
    height: 0.25rem;
    line-height: 0.25rem;
    padding: 0 0.1rem;
    text-align: center;
    font-size: 0.14rem;
    color: #000;
    border: solid 1px rgba(0,0,0,.3);
    border-radius: 0.25rem;
  }
}
</style>
