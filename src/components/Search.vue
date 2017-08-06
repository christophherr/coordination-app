<template>
  <main>
    <section class="section">
      <div class="container">
        <div class="search">
          <form class="form" @submit.prevent="startSearch">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Your location" v-model="searchTerm">
              </p>
              <p class="control">
                <button class="button is-info">Search</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="section" v-if="searchResults">
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Location</th>
              <th>Participate</th>
              <th># of Guests</th>
            </tr>
          </thead>
          <searchresult v-for="result in searchResults" :key="result.id" :result="result"></searchresult>
        </table>
      </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import Searchresult from './Searchresult.vue';
export default {
  components: {
    Searchresult
  },
  name: 'search',
  data() {
    return {
      searchResults: '',
      searchTerm: '',
    }
  },
  methods: {
    startSearch() {
      var vm = this;
      var url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + this.searchTerm;
      axios.get(url, {
        headers: {
          Authorization: `Bearer 4fGdfJ6PURHkYEgW2Jf9yqspORRu7r2Pux1qp1pqfquvdccQOcdcrfVMh4sawNevcTkF46sMp_nS08Uf5tYiNUN7reTY-XvH2_o0dH_G4DePo9wvj_OF9G7TH4VKWXYx`
        }
      }).then(function (response) {
        console.log(response);
        vm.searchResults = response.data.businesses;
      })
    }
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.field.has-addons {
  justify-content: center;
}
</style>
