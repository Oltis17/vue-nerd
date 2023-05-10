<template>
    <div class="outer">
        <div class="left">
            <div>
                <h1>NERD</h1>
                <span>Network Entity Reputation Database</span>
            </div>
            <div>
                <span>Don't have an account yet?</span>
                <button class="black" @click="$router.push('/create-account')">Create an account</button>
            </div>
            
        </div>
        <div class="wrapper">
            <div class="normal-login">
                <h3>Log in</h3>
                <div>
                    <label>Email</label>
                    <input type="email" v-model="email">
                </div>
                <div>
                    <label>Password</label>
                    <div class="password">
                        <input :type="this.passwordFieldType" v-model="password"> 
                        <span @click="switchVisibility()" class="icon">
                            <i class="fa fa-regular fa-eye"></i>
                        </span>   
                    </div>
                    <span class="forgot" @click="this.$refs.myRefForgot.open()">Forgot password?</span>
                    
                </div>
                <button class="login" @click="login()" v-if="!loading">
                    Log in
                </button>
                <div style="width: 100%; height: 45px; display: flex; justify-content: center; align-items: center;" v-if="loading">
                    <clip-loader :loading="true" :color="color" :size="small"></clip-loader>
                </div>
                
            </div>
            
            <div class="providers-login">
                <label>or use providers:</label>
                <span class="logos">
                    <a :href="getG('/')"><i class="fa fa-brands fa-google"></i></a>
                    <a href="/nerd/api/v2/oauth/twitter/url"><i class="fa fa-brands fa-twitter"></i></a>
                    <a :href="getGit()"><i class="fa fa-brands fa-github"></i></a>
                    <a href="/nerd/api/v2/oauth/edugain/url"><b>EduGain</b></a>
                </span>
            </div>
        </div>
    </div>
    
    <vue-modality ref="myRefForgot" title="Forgotten password" centered :ok-loading="loading2" @cancel="this.$refs.myRefForgot.hide()" @ok="forgotPass()">
        <div>Please, provide your email address and we will send you a link to reset your password:</div>
        <div class="forgot">
            <input type="email" v-model="forgotEmail">
        </div>
    </vue-modality>
    <vue-modality ref="myRefSuccess" title="Email sent" centered success hide-cancel @ok="this.$refs.myRefSuccess.hide()">
        Email with a link to reset your password was succesfully sent to your email address: {{ forgotEmail }}.
    </vue-modality>
    <vue-modality ref="myRefError" title="Warning" centered error hide-ok @cancel="this.$refs.myRefError.hide()">
        {{ message }}
    </vue-modality>
</template>

<script>
import * as api from '../api';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import VueModalityV3 from 'vue-modality-v3';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { getGitHubUrl } from '../utils/getGitHubUrl';

export default {
  data() {
    return {
        passwordFieldType: "password",
        email: null,
        password: null,
        loading: false,
        loading2: false,
        forgotEmail: null,
        message: null,
    };
  },
  components: {
    ClipLoader,
    VueModality: VueModalityV3,
  },
  methods: {
    async twitter() {
        const twitterUrl = await api.getTwitterUrl();
        window.location.href = twitterUrl;
    },
    getG(from) {
        return getGoogleUrl(from);
    },
    getGit() {
        return getGitHubUrl();
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    async login() {
        if (this.email === null || this.password === null) {
            this.message = "Bot fields are required!"
            this.$refs.myRefError.open();
            return;
        }

        this.loading = true;
        let tokens = null;
        try {
            tokens = await api.login(this.email, this.password);
        } catch (e) {
            this.message = e.message;
            this.$refs.myRefError.open();
            this.loading = false;
            return;
        }
        // set access token Locally and to API calls
        api.setAccessToken(tokens[0]);
        api.setAxiosAccessToken(tokens[0]);
        api.setRefreshToken(tokens[1]);

        // get user info and store them locally
        let userInfo = null;
        try {
            userInfo = await api.me();
        } catch (e) {
            this.message = e;
            this.$refs.myRefError.open();
            this.loading = false;
            return;
        }
        console.log(userInfo);
        this.$store.commit('setUserInfo', userInfo);

        this.loading = false;

        //redirect to main page
        this.$router.push("/");
    },
    async forgotPass() {
        if (this.forgotEmail === null) {
            this.message = "Please fill in a valid email address."
            this.$refs.myRefError.open();
        }
        this.loading2 = true;

        try {
            await api.passReset(this.forgotEmail);
        } catch (e) {
            this.message = "User with this email address not found.";
            this.$refs.myRefError.open();
            this.loading2 = false;
            return;
        }

        this.loading2 = false;

        this.$refs.myRefSuccess.open();
        this.$refs.myRefForgot.hide();

    }
  }
};
</script>

<style scoped>

@media (max-width: 800px) {
    .outer {
        flex-direction: column;
        align-items: center;
        padding-top: 3vh !important;
        height: 80vh;
        overflow: scroll !important;
    }

    .left {
       border-radius: 12px 12px 0 0 !important;
       width: 90% !important;
    }
    .wrapper {
       border-radius: 0 0 12px 12px !important;
       width: 90% !important;
    }
}

.wrapper input {
        height: 30px;
    }

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
    color: rgb(255, 255, 255);
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

.login {
    background: black; /* default color */

    /* "to left" / "to right" - affects initial color */
    background: linear-gradient(to left, transparent 50%, #42b9833b 50%) right;
    background-size: 200%;
    transition: .5s ease-out;
}

.login:hover {
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

.forgot {
    font-size: small;
    color: #42b983;
    cursor: pointer;
}


.button_slide {
  box-shadow: inset 0 0 0 0 #42b983;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
  margin-bottom: 10px;
}

.slide_right:hover {
  box-shadow: inset 400px 0 0 0 #42b983;
}

.forgot input {
    color: #00031c;
    width: 300px;
    padding: 6px 12px;
    font-size: 16px;
    border: 1px solid black;
    margin-top: 10px;
}

a {
    color: #42b983;
}

</style>