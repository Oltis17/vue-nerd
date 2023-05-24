<template>
    <div class="main" v-if="$store.state.userInfo.groups.includes('admin')">
        <div style="display: flex; justify-content: space-between; align-items: center; max-width: 500px; margin: auto; padding: 15px;">
            <span><h1>Admin screen</h1> </span>
            <div style="display: flex; justify-content: right;">
                <span @click="addUserModal()" class="add-user"><i class="fa fa-solid fa-plus"></i>Add user</span>
            </div>
            
        </div>
        
        <div class="table-wrapped" v-if="!loading">
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
                                    <span @click="editUserModal(user)"><i class="fa fa-solid fa-gear green"></i></span>
                                    <span v-if="user[1].includes('registered')" @click="blockUserModal(user)"><i class="fa fa-solid fa-cancel orange"></i> </span>
                                    <span v-else @click="unblockUserModal(user)"><i class="fa fa-solid fa-check green"></i> </span>
                                    <span @click="deleteUserModal(user)"><i class="fa fa-solid fa-trash red"></i></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </perfect-scrollbar>
        </div>
        <div v-else class="table-wrapped" style="overflow: hidden;">
                <div><span class="skeleton-box top-of-table"></span></div>
                <div v-for="index in 14" :key="index"><span class="skeleton-box table-row" ></span></div>
        </div>
    <vue-modality :ok-loading="loading" ref="myRefDelete" title="Deleting user" centered @cancel="this.$refs.myRefDelete.hide()" ok-title="Delete user" @ok="this.delete()">
        Do you really want to delete user <b>{{ selectedUser[2] }}</b>?
    </vue-modality>
    <vue-modality :ok-loading="loading" ref="myRefBlock" title="Blocking user" centered @cancel="this.$refs.myRefBlock.hide()" ok-title="Block user" @ok="this.block()">
        Do you really want to block user <b>{{ selectedUser[2] }}</b>?<br>
        By blocking a user their role "registered" will be removed, resulting in the user's inability to log in.
    </vue-modality>
    <vue-modality :ok-loading="loading" ref="myRefUnBlock" title="Unblocking user" centered @cancel="this.$refs.myRefUnBlock.hide()" ok-title="Unblock user" @ok="this.unblock()">
        Do you really want to unblock user <b>{{ selectedUser[2] }}</b>?<br>
        By unblocking a user role "registered" will be added, resulting in the user's ability to log in.
    </vue-modality>
    <vue-modality :ok-loading="loading" ref="myRefEdit" title="Editing user" centered @cancel="this.$refs.myRefEdit.hide()" ok-title="Save roles" @ok="this.editRoles()">
        Editing roles of user: <b>{{ selectedUser[2] }}</b>
        <div v-for="role in allRoles" :key="role" class="roles">
            <input type="checkbox" v-if="selectedUser[1].includes(role)" checked v-model="roles" :value="role">
            <input type="checkbox" v-else v-model="roles" :value="role">
            <span>
                {{ role }}
            </span>
        </div>
    </vue-modality>
    <vue-modality ref="myRefError" title="Warning" centered error hide-ok @cancel="this.$refs.myRefError.hide()">
        {{ message }}
    </vue-modality>
    <vue-modality ref="myRefAdd" title="Add user" centered @cancel="this.$refs.myRefAdd.hide()" ok-title="Add user" @ok="this.add()" class="add-user-modal">
        <div>
            <label>Email</label>
            <input type="email" v-model="email">
        </div>
        <div style="flex-direction: row !important;">
            <input type="checkbox" v-model="verify"> 
            Mark email as verified (if not verif. email will be sent)
        </div>
        <div>
            <label>Password</label>
            <input type="text" v-model="password">
        </div>
        
        <div>
            <label>Organization</label>
            <input type="text" v-model="organization">
        </div>
        
        <div>
            <label>Roles</label>
            <div v-for="role in allRoles" :key="role" class="roles">
                <input type="checkbox" v-model="roles" :value="role">
                <span>
                    {{ role }}
                </span>
            </div>
        </div>
        
        
            
    </vue-modality>
    </div>
</template>

<script>
import possibleRoles from '../assets/roles.json';
import * as api from '../api';
import moment from 'moment';
import VueModalityV3 from 'vue-modality-v3';


export default {
    data() {
        return {
            users: null,
            selectedUser: null,
            roles: [],
            loading: true,
            message: null,
            verify: false,
            email: null,
            organization: null,
            password: null,
        }
    },
    components: {
        VueModality: VueModalityV3,
    },
    computed: {
        allRoles() {
            return possibleRoles;
        }
    },
    methods: {
        getRoles() {
            const roles = [];
            possibleRoles.forEach((r) => {
                if (this.selectedUser[1].includes(r))
                {
                    roles.push(r);
                }
                
            })
            return roles;
        },
        async editRoles() {
            this.loading = true;
            try {
                await api.editRoles(this.selectedUser[2], this.roles);
            }
            catch (e) {
                this.$refs.myRefEdit.hide();
                this.message = e.message;
                this.$refs.myRefError.open();
                this.loading = false;
                return;
            }
            this.users = await api.getUsers();
            this.loading = false;
            this.$refs.myRefEdit.hide()
        },
        async block() {
            this.loading = true;
            if (this.selectedUser[1].includes("registered")) {
                this.selectedUser[1].splice(this.selectedUser[1].indexOf("registered"), 1);
                try {
                    await api.editRoles(this.selectedUser[2], this.selectedUser[1]);
                }
                catch (e) {
                    this.$refs.myRefBlock.hide();
                    this.message = e.message;
                    this.$refs.myRefError.open();
                    this.loading = false;
                    return;
                }
            }
            this.users = await api.getUsers();
            this.loading = false;
            this.$refs.myRefBlock.hide()
        },
        async unblock() {
            this.loading = true;
            if (!this.selectedUser[1].includes("registered")) {
                this.selectedUser[1].push("registered");
                try {
                    await api.editRoles(this.selectedUser[2], this.selectedUser[1]);
                }
                catch (e) {
                    this.$refs.myRefUnBlock.hide();
                    this.message = e.message;
                    this.$refs.myRefError.open();
                    this.loading = false;
                    return;
                }
            }
            this.users = await api.getUsers();
            this.loading = false;
            this.$refs.myRefUnBlock.hide()
        },
        async delete() {
            this.loading = true;
            try {
                await api.deleteUser(this.selectedUser[2]);
            }
            catch (e) {
                this.$refs.myRefDelete.hide();
                this.message = e.message;
                this.$refs.myRefError.open();
                this.loading = false;
                return;
            }
            this.users = await api.getUsers();
            this.loading = false;
            this.$refs.myRefDelete.hide()
        },
        async add() {
            this.loading = true;
            console.log(this.email, this.password, this.organization, this.roles, this.verify);
            try {
                await api.addUser(this.email, this.password, this.organization, this.roles, this.verify);
            }
            catch (e) {
                this.$refs.myRefAdd.hide();
                this.message = e.message;
                this.$refs.myRefError.open();
                this.loading = false;
                return;
            }
            this.users = await api.getUsers();
            this.loading = false;
            this.$refs.myRefAdd.hide()
        },
        deleteUserModal(user) {
            this.selectedUser = user;
            this.$refs.myRefDelete.open();
        },
        blockUserModal(user) {
            this.selectedUser = user;
            this.$refs.myRefBlock.open();
        },
        unblockUserModal(user) {
            this.selectedUser = user;
            this.$refs.myRefUnBlock.open();
        },
        editUserModal(user) {
            this.selectedUser = user;
            this.roles = this.selectedUser[1];
            this.$refs.myRefEdit.open();
        },
        addUserModal() {
            this.$refs.myRefAdd.open();
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
        this.loading = false;
    }
}
</script>

<style scoped>
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
    max-height: 71vh;
    border: 2px solid rgba(255, 255, 255, 0.448);
}

table tr td {
    padding: 10px;
    text-align: left;
}

table tr:nth-child(odd) {
  background-color: #ffffff16;
  color: #fff;
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

.add-user-modal .vm-body > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    justify-content: left;
    align-items: flex-start;
}

.add-user-modal .vm-body > div input[type=text], .add-user-modal .vm-body > div input[type=email] {
    width: 300px;
    height: 30px;
    border-radius: 7px;
    border: 1px solid black;
    padding: 0px 5px;
    background-color: white;
    color: black;
}

.add-user {
    font-size: 16px;
    font-weight: 100;
    padding: 10px;
    border: 1px #42b983 solid;
    border-radius: 12px;
    color: #42b983;
    cursor: pointer;
    width: 140px;
    display: flex;
    justify-content: space-around;
}

.skeleton-box {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
}
.skeleton-box::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
  -webkit-animation: shimmer 2s infinite;
          animation: shimmer 2s infinite;
  content: "";
}
@-webkit-keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.table-row {
    margin-top: 3px;
    width: 100%;
    height: 35px;
    background-color: #dddbdd2e;
}

.top-of-table {
    width: 100%;
    height: 50px;
    background-color: #dddbdda9;
}

</style>