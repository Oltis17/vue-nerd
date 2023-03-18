<template>
    <div>
        <span class="skeleton-box top-of-table"></span>
        <span class="skeleton-box table-row" v-for="index in 13" :key="index"></span>
    </div>
</template>

<style>
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

.top-of-table {
    margin-top: 20px;
    width: 98%;
    height: 40px;
    background-color: #dddbdda9;
}
.table-row {
    margin-top: 3px;
    width: 98%;
    height: 50px;
    background-color: #dddbdd2e;
}

</style>