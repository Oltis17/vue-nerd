<template>
     <div>
        <h2>Your account was created successfully!</h2>
        <button class="btn" @click="$router.push('/')">Continue to main page</button>
    </div>
</template>

<style scoped>
div {
  padding-top: 50px;
  color: white;
}

button {
    background-color: transparent;
    border:#42b983 2px solid;
    border-radius: 12px;
    color: #42b983;
    height: 35px;
    margin-top: 15px;
    padding: 7px 12px;

    cursor: pointer;
}

.btn {
    background: black; /* default color */

    /* "to left" / "to right" - affects initial color */
    background: linear-gradient(to left, transparent 50%, #42b9833b 50%) right;
    background-size: 200%;
    transition: .5s ease-out;
}

.btn:hover {
    background-position: left;
}

</style>