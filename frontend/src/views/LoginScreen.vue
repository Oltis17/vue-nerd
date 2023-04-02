<template>
    <div class="outer">
        <div class="left">
            <div>
                <h1>NERD</h1>
                <span>Network Entity Reputation Database</span>
            </div>
            <div>
                <span>Don't have an account yet?</span>
                <button class="black">Create an account</button>
            </div>
            
        </div>
        <div class="wrapper">
            <div class="normal-login">
                <h3>Log in</h3>
                <div>
                    <label>Email</label>
                    <input type="email">
                </div>
                <div>
                    <label>Password</label>
                    <div class="password">
                        <input :type="this.passwordFieldType"> 
                        <span @click="switchVisibility()" class="icon">
                            <i class="fa fa-regular fa-eye"></i>
                        </span>   
                    </div>
                    <span class="forgot">Forgot password?</span>
                    
                </div>
                <button class="button_slide slide_right">Log in</button>
            </div>
            
            <div class="providers-login">
                <label>or use providers:</label>
                <span class="logos">
                    <span><i class="fa fa-brands fa-google"></i></span>
                    <span><i class="fa fa-brands fa-twitter"></i></span>
                    <span><i class="fa fa-brands fa-github"></i></span>
                    <span><b>EduGain</b></span>
                </span>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
        passwordFieldType: "password",
    };
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    }
  }
};
</script>

<style scoped>
h3 {
    color: white;
    text-align: center;
}
.outer {
    padding-top: 15vh;
    display: flex;
    max-width: 800px;
    margin: auto;
}
.wrapper {
    padding: 30px;
    border-radius: 0 12px 12px 0;
    background-color: rgba(128, 128, 128, 0.325);
    display: flex;
    flex-direction: column;
    width: 40%;
    align-items: center;
}

.logos {
    color: #42b983;
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: auto;
}

.logos span {
    cursor: pointer;
}

.providers-login label {
    text-align: center;
    padding-bottom: 10px;
}

.normal-login, .providers-login {
    width: 100%;
}

.password {
    position: relative;
}

.password .icon {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    z-index: 1;
}

.left {
    border-radius: 12px 0 0 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #42b983;
    padding: 30px;
    width: 60%;
}


.left div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wrapper div {
    text-align: left;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 10px;
}

input {
    background-color: transparent;
    border-radius: 7px;
    border: 1px solid white;
    padding: 4px 10px;
    height: 20px;
    color: white;
}

input:focus {
    border: 1px solid #42b983;
}

button {
    background-color: transparent;
    border:#42b983 2px solid;
    border-radius: 0px;
    color: #fbfbfb;
    height: 30px;
    margin-top: 15px;
    cursor: pointer;
}

.black {
    border: #00031c 2px solid;
    color: #00031c;
    width: 50%;
}

h1 {
    font-weight: 100;
    font-size: 40px;
    letter-spacing: 4px;
}

.forgot {
    font-size: small;
    color: #42b983;
}


.button_slide {
  box-shadow: inset 0 0 0 0 #42b983;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.slide_right:hover {
  box-shadow: inset 400px 0 0 0 #42b983;
}

</style>