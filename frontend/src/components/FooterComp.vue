<template>
  <div id="footer-wrapper">
    <span><a href="/">NERD by CESNET 2022</a></span>
    <span><a href="/about">About</a></span>
    <span><a href="/">Privacy Policy</a></span>
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
  color: rgba(255, 255, 255, 0.462);
}

#footer-wrapper span {
  cursor: pointer;
}

#footer-wrapper a:hover {
  color: rgb(184, 184, 184);
  border-bottom: 2px solid rgb(184, 184, 184);
}

#footer-wrapper a {
  color: white;
  text-decoration: none;
  border-bottom: 1px solid white;
}

a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.462);
}
</style>
