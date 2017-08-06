<template>
  <tbody>
    <tr>
      <td>{{result.name}}</td>
      <td>
        <img :src="result.image_url" width="125" height="125">
      </td>
      <td>{{result.location.display_address[0]}} {{result.location.display_address[1]}} {{result.location.display_address[2]}} {{result.location.display_address[3]}}
      </td>
      <td v-if="isAuth">
        <button v-if="!isGoing" class="button is-warning" @click="addCount(result.id)">Not Going</button>
        <button v-else class="button is-warning" @click="removeCount(result.id)">Going</button>
      </td>
      <td>
        <button class="button is-info">{{count}}</button>
      </td>
    </tr>
  </tbody>
</template>

<script>
import firebase from 'firebase';
import { db } from '../firebase';

export default {
  props: ['result'],
  data() {
    return {
      isGoing: false,
      count: 0,
      userId: this.isID
    }
  },
  firebase: {
    items: db.ref('Bars')
  },
  mounted() {
    this.anybodyGoing;
    this.userGoing;
  },
  methods: {
    addCount(id) {
      this.$firebaseRefs.items.push({
        bar_guests: this.isID,
        bar_id: this.result.id,
        bar_name: this.result.name
      });
      this.isGoing = true;
      this.count++;
    },
    removeCount(id) {
      var remove = id;
      this.count--;
      this.isGoing = false;
      var fbKey = '';
      this.$firebaseRefs.items.orderByChild('bar_id').startAt(remove).endAt(remove).limitToLast(1).on('child_added', function (data) {
        fbKey = data.key;
      });
      this.$firebaseRefs.items.child(fbKey).remove();
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isLoggedIn;
    },
    isID() {
      return this.$store.getters.userID;
    },
    anybodyGoing() {
      var fbKey = [];
      var bar = this.result.id;
      this.$firebaseRefs.items.orderByChild('bar_id').startAt(bar).endAt(bar).on('child_added', function (data) {
        fbKey.push(data.key);
      });
      this.count = fbKey.length;
    },
    userGoing() {
      var user = this.isID;
      var bar = this.result.id;
      var going = false;
      var barKey = [];
      this.$firebaseRefs.items.orderByChild('bar_guests').startAt(user).endAt(user).on('child_added', function (data) {
        barKey.push(data.A.k.ba.value.B);
        barKey.forEach((key) => {
          if (key === bar) {
            going = true;
          };
        });
      });
      this.isGoing = going;
    }
  }
}
</script>

<style>

</style>
