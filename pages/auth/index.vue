<template>
    <div>
        <v-form @submit.prevent="onSubmit">
            <v-text-field v-if="!authSwitch" label="First Name" v-model="firstName"></v-text-field>
            <v-text-field v-if="!authSwitch" label="Last Name" v-model="lastName"></v-text-field>
            <v-text-field label="Email" v-model="email"></v-text-field>
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            <v-btn v-if="authSwitch" depressed large type="submit">Sign In!</v-btn>
            <v-btn v-else depressed large type="submit">Sign Up!</v-btn>
        </v-form>
        <div class="auth-toggle d-flex align-center">
            <span>Sign Up</span>
            <v-switch class="px-3" v-model="authSwitch"></v-switch>
            <span>Sign In</span>
        </div>
        <v-btn v-if="userLoggedIn" v-on:click="signOut" depressed large color="error">Sign Out</v-btn>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            authSwitch: false,
        }
    },
    methods: {
        onSubmit() {
            if (this.authSwitch) {
                this.$store.dispatch('signInUser', {
                    email: this.email,
                    password: this.password
                })
                .then(() => this.$store.dispatch('getUserDetails'))
                .then(() => this.$router.push(`/users/${this.$store.state.currentUser.id}`))
                .catch((err) => console.log('unable to log in user', err));
            } else {
                this.$store.dispatch('createUser', {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName
                })
            }
        },
        signOut() {
            console.log('signing out user...');
            this.$store.dispatch('signOutUser').then(() => this.$router.push('/'));
        }
    },
    computed: {
        userLoggedIn() {
            return !!this.$store.state.currentUser.email;
        }
    }
}
</script>

<style lang="scss">
    input {
        border: 0;
    }
    .auth-toggle {
        padding: 2em 0;
    }
</style>