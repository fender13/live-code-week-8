<template>
  <div>
    <div class="card" id="detail">
      <div class="card-header">
        Detail
      </div>
      <div class="card-body">
        <h2 class="card-title"><u>{{ title }}</u></h2>
        <div class="card-text">
          <h4>{{ description }}</h4>apod.desc
          <br/><br/><br/>
          <h4>{{ dateData }}</h4>apod.date
        </div>
        <div class="error" v-if="err != ''">
          <p>{{ err }}</p>
        </div>
        <div> 
          <form method="post" class="input-group" v-on:submit.prevent="update">
            <div>
              <datepicker v-model="date" name="uniquename"></datepicker>
            </div>
            <div class="input-group-append">
              <button class="btn btn-primary" type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import axios from '@/database/server'

export default {
  name: 'ApodDetails',
  data() {
    return {
      id: '',
      title: '',
      description: '',
      dateData: '',
      date: '',
      err: ''
    }
  },
  components: {
    Datepicker
  },
  mounted() {
    this.getApodDetails(this.$route.params.id)
  },
  methods: {
    getApodDetails(id) {
      axios
        .get(`/apods/${id}`)
        .then(({ data }) => {
          this.id = data._id
          this.title = data.title
          this.description = data. explanation
          this.dateData = data.date
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    update() {
      const str = new Date(this.date).toISOString()
      const split = str.split('').splice(0, 10).join('')
      
      axios
        .put(`/apods/${this.id}`, {
          date: split
        })
        .then(({ data }) => {
          this.id = data._id
          this.title = data.title
          this.description = data. explanation
          this.dateData = data.date
          this.err = ''
        })
        .catch(({ response }) => {
          this.err = response.data.message.msg
        })
    }
  },
  watch: {
    '$route.params.id': function (id) {
      this.getApodDetails(id)
    }
  }
}
</script>

<style scoped>
.error p {
  color: red;
}
</style>
