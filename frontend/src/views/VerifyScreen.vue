<template>
    <div v-if="loading">
        <clip-loader :loading="true" :color="color" :size="small"></clip-loader>
        Verifying your email address...
    </div>
    <div v-else>
        <div v-if="message">
            {{ message }}
        </div>
        <div v-else>
            <h2>Email verification successful.</h2> 
            <div>You can <a @click="$router.push('/login')">login</a> now.</div>
        </div>

    </div>
</template>

<script>
import * as api from '../api';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
    data() {
        return {
            users: null,
            selectedUser: null,
            loading: true,
            message: null,
        }
    },
    components: {
        ClipLoader,
    },
    methods: {
    },
    async mounted() {
        if (this.$route.query.accessToken) {
            try {
                await api.verifyEmail(this.$route.query.accessToken);
            } catch (e) {
                this.message = "Error: Token verification failed. " + e.message;
            }
        } else {
            this.message = "Error: No token provided."
        }
        this.loading = false;
    }
}
</script>

<style scoped>
div {
    padding-top: 30px;
    color: white;
}

a {
    color: #42b983;
    cursor: pointer;
}
</style>