<template>
    <div class="outer">
        <div class="left">
            <div>
                <h1>NERD</h1>
                <span>Network Entity Reputation Database</span>
            </div>
            <div>
                <span>
                    Information about creating an account...
                </span>
            </div>
            <div>
                <span>Already have an account?</span>
                <button class="black">Log in</button>
            </div>
            
        </div>
        <div class="wrapper">
            <div class="normal-login">
                <h3>Create an account</h3>
                <div>
                    <label>Email</label>
                    <input type="email">
                </div>
                <div>
                    <label>Password</label>
                    <div class="password">
                        <input :type="this.passwordFieldType" v-model="password"> 
                        <span @click="switchVisibility()" class="icon">
                            <i class="fa fa-regular fa-eye"></i>
                        </span>   
                    </div>
                    <password-meter :password="password" />
                </div>
                <div>
                    <label>Confirm password</label>
                    <div class="password">
                        <input :type="this.passwordFieldType"> 
                        <span @click="switchVisibility()" class="icon">
                            <i class="fa fa-regular fa-eye"></i>
                        </span>   
                    </div>
                </div>
                <div>
                    <label>Intended purpose of use</label>
                    <select>
                        <option>Academic</option>
                        <option>Research</option>
                        <option>Security</option>
                    </select>
                </div>
                <button class="create">Create an account</button>
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
import { defineComponent, ref } from 'vue';
import PasswordMeter from 'vue-simple-password-meter';

export default defineComponent({
  components: {
    PasswordMeter,
  },
  setup() {
    const password = ref('');

    return {
      password,
    };
  },
  data() {
    return {
        passwordFieldType: "password",
    };
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    }
  },
});
</script>

<style scoped>
h3 {
    color: white;
    text-align: center;
}
.outer {
    padding-top: 10vh;
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

.providers-login label {
    text-align: center;
    padding-bottom: 10px;
}

.normal-login {
    width: 100%;
    margin-bottom: 20px;
}

.providers-login {
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
}

.normal-login > div {
    margin-bottom: 10px;
}

input, select {
    background-color: transparent;
    border-radius: 7px;
    border: 1px solid white;
    padding: 4px 10px;
    height: 20px;
    color: white;
}


select {
    height: 30px;
    /* position of the dropdown arrow */
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 1em;
}

input:focus {
    border: 1px solid #42b983;
}

button {
    background-color: transparent;
    border:#42b983 2px solid;
    border-radius: 12px;
    color: #42b983;
    height: 35px;
    margin-top: 15px;

    cursor: pointer;
}

.create {
    background: black; /* default color */

    /* "to left" / "to right" - affects initial color */
    background: linear-gradient(to left, transparent 50%, #42b9833b 50%) right;
    background-size: 200%;
    transition: .5s ease-out;
}

.create:hover {
    background-position: left;
}

.black {
    border: #00031c 2px solid;
    color: #00031c;
    width: 50%;
    background: black; /* default color */

    /* "to left" / "to right" - affects initial color */
    background: linear-gradient(to left, #42b983 50%, rgba(255, 255, 255, 0.658) 50%) right;
    background-size: 200%;
    transition: .5s ease-out;
}

.black:hover {
    background-position: left;
}

h1 {
    font-weight: 100;
    font-size: 40px;
    letter-spacing: 4px;
}
</style>