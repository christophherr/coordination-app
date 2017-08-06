<template>
  <section class="section">
    <nav class="navbar container">
      <div class="navbar-brand">
        <p class="navbar-item">
          Nightlife Coordination App
        </p>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a v-if="!isAuth" class="nav-item is-tab" @click="loginModal">Sign in / Sign Up</a>
          <a v-else class="nav-item is-tab" @click="logout">Sign out</a>
        </div>
      </div>
    </nav>
    <div class="firebase-login" v-show="showLoginModal">
      <div id="firebaseui-auth-container"></div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import firebaseui from 'firebaseui';
import { db } from '../firebase';

export default {
  name: 'navbar',
  data() {
    return {
      showLoginModal: false,
      userID: ''
    }
  },
  methods: {
    loginModal() {
      this.showLoginModal = !this.showLoginModal;
      var vm = this;
      var uiConfig = {
        //signInSuccessUrl: '/',
        callbacks: {
          'signInSuccess': function (currentUser, credential, redirectUrl) {
            vm.$store.dispatch('login');
            vm.$store.commit('setUserID', currentUser.uid || false);
            vm.user();
            return false
          }
        },
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
      //}
    },
    logout() {
      var vm = this;
      firebase.auth().signOut().then(function () {
        vm.userID = null;
        vm.$store.dispatch('logout');
        vm.$store.commit('setUserID', vm.userID || null);
        console.log('Logout successfull!');
      }).catch(function (error) {
        console.log('An error happened.');
      });
    },
    user() {
      //console.log('clicked');
      if (firebase.auth().currentUser) {
        this.userID = firebase.auth().currentUser.uid;
        console.log(this.userID);
      } else {
        console.log('hellooo');
      }
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isLoggedIn;
    },
    isUserID() {
      return this.$store.getters.userID;
    }
  }
}
</script>
<style>

</style>
