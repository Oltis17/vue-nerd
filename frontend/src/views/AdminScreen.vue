<template>
    <div class="main" v-if="$store.state.userInfo.groups.includes('admin')">
        <h1>Admin screen</h1>
        <div class="table-wrapped">
            <perfect-scrollbar>
                <div class="wrapper">
                    <table>
                        <thead>
                            <td>
                                Email
                            </td>
                            <td>
                                Admin
                            </td>
                            <td>
                                Roles
                            </td>
                            <td>
                                ID
                            </td>
                            <td>
                                Organization
                            </td>
                            <td>
                                API Token
                            </td>
                            <td>
                                Verified
                            </td>
                            <td>
                                Verification email sent
                            </td>
                            <td>
                                Last login
                            </td>
                            <td>
                                Controls
                            </td>
                        </thead>

                        <tbody>
                            <tr v-for="user in users" :key="user[0]">
                                <td>{{ user[0] }}</td>
                                <td><span v-if="user[1].includes('admin')"> ✔ </span></td>
                                <td><span v-for="role in user[1]" :key="role" style="padding-right: 5px;">{{ role }}</span></td>
                                <td>{{ user[2] }}</td>
                                <td>{{ user[3] }}</td>
                                <td>{{ user[4] }}</td>
                                <td><span v-if="user[5]"> ✔ </span></td>
                                <td>{{ user[6] ? formatDateTime(user[6]) : '' }}</td>
                                <td>{{ user[7] ? formatDateTime(user[7]) : '' }}</td>
                                <td class="controls">
                                    <span @click="editUserModal(user[0])"><i class="fa fa-solid fa-gear green"></i></span>
                                    <span @click="blockUserModal(user[0])"><i class="fa fa-solid fa-cancel orange"></i> </span>
                                    <span @click="deleteUserModal(user[0])"><i class="fa fa-solid fa-trash red"></i></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </perfect-scrollbar>
        </div>
    <vue-modality ref="myRefDelete" title="Deleting user" centered @cancel="this.$refs.myRefDelete.hide()">
        Do you really want to delete user <b>{{ selectedUser }}</b>?
    </vue-modality>
    <vue-modality ref="myRefBlock" title="Blocking user" centered @cancel="this.$refs.myRefBlock.hide()">
        Do you really want to block user <b>{{ selectedUser }}</b>?
    </vue-modality>
    <vue-modality ref="myRefEdit" title="Editing user" centered @cancel="this.$refs.myRefEdit.hide()" ok-title="Save roles">
        Editing roles of user: <b>{{ selectedUser }}</b>
        <div v-for="role in getRoles()" :key="role" class="roles">
            <input type="checkbox" v-if="$store.state.userInfo.groups.includes(role)" checked>
            <input type="checkbox" v-else>
            <span>
                {{ role }}
            </span>
        </div>
            
    </vue-modality>
    </div>
</template>

<script>
import roles from '../assets/roles.json';
import * as api from '../api';
import moment from 'moment';
import VueModalityV3 from 'vue-modality-v3';


export default {
    data() {
        return {
            users: null,
            selectedUser: null,
        }
    },
    components: {
        VueModality: VueModalityV3,
    },
    methods: {
        getRoles() {
            return roles;
        },
        deleteUserModal(user) {
            this.selectedUser = user;
            this.$refs.myRefDelete.open();
        },
        blockUserModal(user) {
            this.selectedUser = user;
            this.$refs.myRefBlock.open();
        },
        editUserModal(user) {
            this.selectedUser = user;
            this.$refs.myRefEdit.open();
        },
        formatDateTime(ts) {
            if (this.$store.state.time) {
                return moment.utc(ts).format('DD MMM YYYY HH:mm');
            }
            return moment.utc(ts).local().format('DD MMM YYYY HH:mm');
        },
    },
    async mounted() {
        this.users = await api.getUsers();
    }
}
</script>

<style scoped>

h1 {
    padding-top: 20px;
}
.ps-container > .ps-scrollbar-x-rail,
    .ps-container > .ps-scrollbar-y-rail {   opacity: 0.6; }

.main {
    color: white;
}

thead td {
    background-color: rgba(240, 248, 255, 0.287);
    padding: 20px 10px;
    text-align: left;
}

table {
    border-collapse: collapse;
    width: 100%;
}

.wrapper {
    margin: auto;
    width: 100%;
    height: 70vh;
}

.table-wrapped {
    margin: auto;
    width: 95%;
    height: 70vh;
    border: 2px solid rgba(255, 255, 255, 0.448);
}

table tr td {
    padding: 10px;
    text-align: left;
}

.controls {
    width: 90px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
}

.orange {
    cursor: pointer;
    color: #d2a322;
}

.green {
    cursor: pointer;
    color: #86d222;
}

.red {
    cursor: pointer;
    color: #d25122;
}

.roles {
    padding: 5px;
    text-align: left;
}
</style>