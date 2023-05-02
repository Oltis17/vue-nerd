<template>
    <div style="padding-top: 40px;">
        <span class="skeleton-box table-row" v-for="index in 4" :key="index"></span>
    </div>
</template>

<style scoped>
.skeleton-box {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
}
.skeleton-box::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
  -webkit-animation: shimmer 2s infinite;
          animation: shimmer 2s infinite;
  content: "";
}
@-webkit-keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.table-row {
    margin-top: 5px;
    width: 90%;
    height: 350px;
    background-color: #dddbdd2e;
}

</style>