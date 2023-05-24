<template>
    <div class="wrapper">
        <h2>Reset your password:</h2>

        <div>
            <label>Password</label>
            <div class="password">
                <input :type="this.passwordFieldType1" v-model="pass1"> 
                <span @click="switchVisibility1()" class="icon">
                    <i class="fa fa-regular fa-eye"></i>
                </span>   
                <password-meter :password="pass1" @score="onScore"/>
            </div>

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
        <button class="create" @click="reset()">Reset password</button>
        <!-- MODALS -->
        <vue-modality ref="myRefError" title="Warning" centered error hide-ok @cancel="this.$refs.myRefError.hide()">
            {{ message }}
        </vue-modality>
    </div>
</template>

<script>
import * as api from '../api';
import {  ref } from 'vue';
import PasswordMeter from 'vue-simple-password-meter';
import VueModalityV3 from 'vue-modality-v3';

export default {
    components: {
        PasswordMeter,
        VueModality: VueModalityV3,
    },
    setup() {
        const pass1 = ref('');
        const score = ref(null);

        const onScore = (payload) => {
        score.value = payload.score;
        };

        return {
        pass1,
        pass2: null,
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
        token: this.$route.query.token,
    };
  },
    methods: {
        switchVisibility1() {
            this.passwordFieldType1 = this.passwordFieldType1 === "password" ? "text" : "password";
        },
        switchVisibility2() {
            this.passwordFieldType2 = this.passwordFieldType2 === "password" ? "text" : "password";
        },
        async reset() {
            if (this.pass1.length === 0) {
                this.message = "Password is required.";
                this.$refs.myRefError.open();
                return;
            }
            if (this.pass1 !== this.pass2) {
                this.message = "Passwords must match.";
                this.$refs.myRefError.open();
                return;
            }
            if (this.score < 3) {
                this.message = "Provided password is too weak. Use capital letters, numbers and special characters or make your password longer.";
                this.$refs.myRefError.open();
                return;
            }
            try {
                await api.resetPassFromMail(this.pass1, this.token);
            } catch (e) {
                this.message = e;
                this.$refs.myRefError.open();
                this.loading = false;
                return;
            }
            
            //redirect to login
            this.$router.push("/login");
        },
    },
}
</script>


<style scoped>
.wrapper {

    color: white;
    max-width: 500px;
    background-color: rgba(128, 128, 128, 0.325);
    border-radius: 12px;
    padding: 30px;
    margin: auto;
    margin-top: 10vh;
}
.password {
    position: relative;
    width: 200px;
    margin: auto;
}

.password .icon {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    z-index: 1;
}

input, select {
    background-color: transparent;
    border-radius: 7px;
    border: 1px solid white;
    padding: 4px 10px;
    height: 30px;
    color: white;
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

</style>