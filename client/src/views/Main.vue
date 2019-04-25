<template>
  <div>
    <div class="jumbotron">
      <div class="row justify-content-center text-center">
        <div class="col-6">
          <div>
            <h2>Add Astronomy Picture</h2>
            <p>
              <!-- Please input date</em>, etc. -->
            </p>
            <div class="error" v-if="error != ''">
              <p>{{ error }}</p>
            </div>
            <form method="post" class="input-group" v-on:submit.prevent="saveApods">
              <div>
                <datepicker v-model="date" name="uniquename"></datepicker>
              </div>
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-6">
        <form method="post" class="input-group mb-3">
          <input
            type="text"
            name="search"
            id="search"
            class="form-control"
            autocomplete="off"
            placeholder="Search..."/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </div>
        </form>

        <div class="card mt-2" v-for="(item, index) in items" :key="index">
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>

            <div >
              <!-- FOR VIDEO -->
              <div v-if="item.media == 'video'">

                <iframe  width="498" height="332" v-bind:src="item.url"></iframe>
              </div>

              <!-- FOR IMAGE -->
              <div v-else>
                <img  class="card-img-top" v-bind:src="item.url" alt="Card image cap">
              </div>
            </div>

            <div class="mt-3">
              <router-link :to="{ name: 'ApodDetails', params: { id: item._id }}"><a href="#" class="btn btn-primary mr-2">See detail</a></router-link>
              <a href="#" class="btn btn-danger" v-on:click.prevent="deleteApods(item._id)">Delete</a>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import axios from '@/database/server'

export default {
  name: 'Main',
  components: {
    Datepicker
  },
  data() {
    return {
      date: '',
      items: [],
      error: ''
    }
  },
  mounted() {
    this.getAllSaveApods()
  },
  methods: {
    saveApods() {
      const str = new Date(this.date).toISOString()
      const split = str.split('').splice(0, 10).join('')
      
      axios
        .post('/apods', {
          date: split
        })
        .then(({ data }) => {
          this.items.push(data)
          this.error = ''
        })
        .catch(({ response }) => {
          this.error = response.data.message.date.message
        })
    },
    getAllSaveApods() {
      axios
        .get('/apods')
        .then(({ data }) => {
          this.items = data
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteApods(id) {
      axios
        .delete(`/apods/${id}`)
        .then((data) => {
          for (let i = 0; i < this.items.length; i++) {
            if (this.items._id == data._id) {
              this.items.splice(i, 1)
            }
          }
        })
    }
  }
}
</script>

<style scoped>
.error p {
  color: red;
}
</style>
