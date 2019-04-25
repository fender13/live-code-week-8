<template>
  <div class="login-container">
    <div class="error">
      <p>{{ errLogin }}</p>
    </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card mb-4">
          <div class="card-header text-center">Login</div>
          <div class="card-body">
            <form v-on:submit.prevent="userLogin">
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      password: ''
    }
  }, 
  computed: {
    errLogin() {
      return this.$store.getters.errorLogin
    }
  },
  methods: {
    userLogin() {
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  margin-top: 5%;
}

.error {
  text-align: center;
}

.error p {
  color: red
}
</style>


