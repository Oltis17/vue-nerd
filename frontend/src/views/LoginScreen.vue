<template>
    <div class="wrapper">
        <div>
            <label>Email</label>
            <input type="email">
        </div>
        <div>
            <label>Password</label>
            <input type="password" placeholder="password">
        </div>
        
    </div>
</template>

<style>
.wrapper {
    padding: 30px;
    border-radius: 12px;
    background-color: rgba(128, 128, 128, 0.325);
    width: 300px;
    display: flex;
    flex-direction: column;
}

.wrapper div {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: left;
}

input {
    background-color: transparent;
    border-radius: 7px;
    border: 1px solid #42b983;
    padding: 4px;
    height: 20px;
}

input:focus {
    border: 3px solid #42b983;
}

</style>