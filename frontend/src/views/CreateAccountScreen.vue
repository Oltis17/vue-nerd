<template>
    <div class="outer-wrapper">
        <div class="outer">
            <div class="left">
                <div>
                    <h1>NERD</h1>
                    <span>Network Entity Reputation Database</span>
                </div>
                <div>
                    <span>
                        By creating an account you can gain access to additional data.
                    </span>
                </div>
                <div>
                    <span>Already have an account?</span>
                    <button class="black" @click="$router.push('/login')">Log in</button>
                </div>
                
            </div>
            <div class="wrapper">
                <div class="normal-login">
                    <h3>Create an account</h3>
                    <div>
                        <label>Email</label>
                        <input type="email" v-model="email">
                    </div>
                    <div>
                        <label>Password</label>
                        <div class="password">
                            <input :type="this.passwordFieldType1" v-model="pass1"> 
                            <span @click="switchVisibility1()" class="icon">
                                <i class="fa fa-regular fa-eye"></i>
                            </span>   
                        </div>
                        <password-meter :password="pass1" @score="onScore"/>
                        <small v-if="score < 3" style="text-align: center; padding-top: 3px" >(Not strong enough)</small>
                        <small v-else style="text-align: center; padding-top: 3px">(Strong enough)</small>
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <div class="password">
                            <input :type="this.passwordFieldType2" v-model="pass2"> 
                            <span @click="switchVisibility2()" class="icon">
                                <i class="fa fa-regular fa-eye"></i>
                            </span>   
                        </div>
                    </div>
                    <div>
                        <label>Intended purpose of use</label>
                        <select v-model="purpose">
                            <option>Academic</option>
                            <option>Research</option>
                            <option>Security</option>
                        </select>
                    </div>
                    <button class="create" @click="create()" v-if="!loading">Create an account</button>
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
    </div>
    <!-- MODALS -->
    <vue-modality ref="myRefError" title="Warning" centered error hide-ok @cancel="this.$refs.myRefError.hide()">
        {{ message }}
    </vue-modality>
    <vue-modality ref="myRefSuccess" title="Account created" centered success hide-cancel @ok="this.$refs.myRefSuccess.hide()">
        {{ message }}
    </vue-modality>
</template>

<script>
import { defineComponent, ref } from 'vue';
import * as api from '../api';
import PasswordMeter from 'vue-simple-password-meter';
import VueModalityV3 from 'vue-modality-v3';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { getGitHubUrl } from '../utils/getGitHubUrl';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default defineComponent({
  components: {
    PasswordMeter,
    VueModality: VueModalityV3,
    ClipLoader,
},
  setup() {
    const pass1 = ref('');
    const score = ref(null);

    const onScore = (payload) => {
      score.value = payload.score;
    };

    return {
      email: null,
      pass1,
      pass2: null,
      purpose: null,
      error: false,
      message: null,
      onScore,
      score,
    };
  },
  data() {
    return {
        passwordFieldType1: "password",
        passwordFieldType2: "password",
        loading: false,
    };
  },
  methods: {
    getG(from) {
        return getGoogleUrl(from);
    },
    getGit() {
        return getGitHubUrl();
    },
    switchVisibility1() {
      this.passwordFieldType1 = this.passwordFieldType1 === "password" ? "text" : "password";
    },
    switchVisibility2() {
      this.passwordFieldType2 = this.passwordFieldType2 === "password" ? "text" : "password";
    },
    async create() {
        this.loading = true;
        if (this.email === null) {
            this.message = "Email is required.";
            this.$refs.myRefError.open();
            this.loading = false;
            return;
        }
        if (this.pass1.length === 0) {
            this.message = "Password is required.";
            this.$refs.myRefError.open();
            this.loading = false;
            return;
        }
        if (this.pass1 !== this.pass2) {
            this.message = "Passwords must match.";
            this.$refs.myRefError.open();
            this.loading = false;
            return;
        }
        if (this.purpose === null) {
            this.message = "You must select an intended purpose.";
            this.$refs.myRefError.open();
            this.loading = false;
            return;
        }
        if (this.score < 3) {
            this.message = "Provided password is too weak. Use capital letters, numbers and special characters or make your password longer.";
            this.$refs.myRefError.open();
            this.loading = false;
            return;
        }

        try {
            await api.register(this.email, this.pass1, this.purpose);
        } catch (e) {
            this.message = e.message;
            this.$refs.myRefError.open();
            return;
        }

        this.message = `Account successfully created. Please check yout inbox at: ${this.email} and verify your email address.`;
        this.$refs.myRefSuccess.open();
        this.loading = false;

    }
  },
});
</script>

<style scoped>

@media (max-width: 800px) {
    .outer {
        flex-direction: column;
        align-items: center;
        padding-top: 3vh !important;
    }

    .outer-wrapper {
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

    .wrapper > div {
        max-width: 400px;
    }

    h1 {
        margin-top: 10px;
        margin-bottom: 10px;
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

option {
    color: black;
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

a {
    color: #42b983;
}
</style>