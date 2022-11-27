<template>
  <div id="footer-wrapper">
    <span>NERD by CESNET 2022</span>
    <span><a href="/about">About</a></span>
    <span>Privacy Policy</span>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer-wrapper {
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
}

#footer-wrapper span {
  cursor: pointer;
}

#footer-wrapper span:hover {
  color: white;
}
</style>
