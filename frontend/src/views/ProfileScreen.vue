<template>
    <div class="main">
        <h1>Profile</h1>

        <table>
            <tr>
                <td>Email</td>
                <td>{{ this.$store.state.userInfo.email }}</td>
            </tr>
            <tr v-if="this.$store.state.userInfo.type == 'local'">
                <td>Password</td>
                <td>
                    <span style="color: #42b983; cursor: pointer;" @click="this.$refs.myRefPass.open()">Change password</span>
                </td>
            </tr>
            <tr v-else>
                <td>Log in Provider</td>
                <td>
                    {{ this.$store.state.userInfo.type }}
                </td>
            </tr>
            <tr>
                <td style="display: flex;" @click="this.$refs.myRef.open()"><span style="padding-right: 10px;">Groups</span> <i class="fa fa-solid fa-question-circle"></i></td>
                <td>
                    <div v-for="group in this.$store.state.userInfo.groups" :key="group" style="padding-bottom: 7px;">{{ group }}</div>
                </td>
            </tr>
        </table>
    </div>
    <vue-modality ref="myRef" title="About Groups" centered ok-title="Request access" @cancel="this.$refs.myRef.hide()">
        <div>You can get access to additional data by being admitted to special groups.</div>
    </vue-modality>
    <vue-modality ref="myRefPass" title="Change password" centered ok-title="Change password" @cancel="this.$refs.myRefPass.hide()" @ok="changePass()">
        <div class="passHolder">
            <label>Current password</label>
            <div class="password">
                <input :type="this.passwordFieldType" v-model="passOld"> 
                <span @click="switchVisibility()" class="icon">
                    <i class="fa fa-regular fa-eye"></i>
                </span>   
            </div>
        </div>
        <div class="passHolder">
            <label>New password</label>
            <div class="password">
                <input :type="this.passwordFieldType2" v-model="pass1"> 
                <span @click="switchVisibility2()" class="icon">
                    <i class="fa fa-regular fa-eye"></i>
                </span>   
        </div>
        <div class="meter">
            <password-meter :password="pass1" @score="onScore" />
        </div>
        </div>
        
        <div class="passHolder">
            <label>Confirm new password</label>
            <div class="password">
                <input :type="this.passwordFieldType3" v-model="pass2"> 
                <span @click="switchVisibility3()" class="icon">
                    <i class="fa fa-regular fa-eye"></i>
                </span>   
            </div>
        </div> 
        (you will be logged out after you password is changed)
        
    </vue-modality>
    <vue-modality ref="myRefError" title="Warning" centered error hide-ok @cancel="this.$refs.myRefError.hide()">
        {{ message }}
    </vue-modality>
    
</template>

<script>
import { defineComponent, ref } from 'vue';
import * as api from '../api';
import VueModalityV3 from 'vue-modality-v3';
import PasswordMeter from 'vue-simple-password-meter';

export default defineComponent({
    setup() {
    const pass1 = ref('');
    const score = ref(null);

    const onScore = (payload) => {
    score.value = payload.score;
    };

    return {
        pass1,
        onScore,
        score,
    }
  },
  data() {
    return {
        passwordFieldType: "password",
        passwordFieldType2: "password",
        passwordFieldType3: "password",
        message: null,
        passOld: null,
        pass2: null,
    };
  },
  components: {
    VueModality: VueModalityV3,
    PasswordMeter,
  },
  
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    switchVisibility2() {
      this.passwordFieldType2 = this.passwordFieldType2 === "password" ? "text" : "password";
    },
    switchVisibility3() {
      this.passwordFieldType3 = this.passwordFieldType3 === "password" ? "text" : "password";
    },
    logout() {
      this.$store.commit('clearState');
      api.removeAccessToken();
      this.$refs.myRef.hide();
      this.$router.push('/');
    },
    async changePass() {
        if (this.passOld === null  || this.pass1 === null || this.pass2 === null) {
            this.message = "All fileds are required.";
            this.$refs.myRefError.open();
            return;
        }
        if (this.pass1 != this.pass2) {
            this.message = "New passwords do not match.";
            this.$refs.myRefError.open();
            return;
        }
        if (this.score < 3) {
            this.message = "Provided password is too weak. Use capital letters, numbers and special characters or make your password longer.";
            this.$refs.myRefError.open();
            return;
        }

        try {
            await api.passChange(this.passOld, this.pass1);
        } catch (e) {
            this.message = e;
            this.$refs.myRefError.open();
            return;
        }

        this.logout();
    }
  }
});
</script>

<style scoped>

@media (max-width: 800px) {
    input {
        height: 35px;
    }
}
.main {
    padding-top: 30px;
    color: white !important;
}

.main table { 
    width: 300px;
    margin: auto;
    text-align: left;
}

.main table td {
    padding: 10px 20px;
}

.main table tr td:first-child {
    width: 100px;
}

.password {
    position: relative;
    max-width: 200px;
    margin: auto;
}

.meter {
    max-width: 200px;
    margin: auto;
}

.password .icon {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    z-index: 1;
}

input {
    background-color: #00031c96;
    border-radius: 7px;
    border: 1px solid rgb(0, 0, 0);
    padding: 4px 10px;
    height: 30px;
    color: white;
    width: 100%;
    padding-right: 30px;
}

.passHolder {
    margin-bottom: 20px;
}
</style>