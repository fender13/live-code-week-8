import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/database/server'
import swal from 'sweetalert'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    isLogin: false,
    email: '',
    errorLogin: ''
  },
  mutations: {
    setId(state, payload) {
      state.id = payload
    },
    setIsLogin(state, payload) {
      state.isLogin = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
    setErrorLogin(state, payload) {
      state.errorLogin = payload
    }
  },
  actions: {
    verifyToken({ commit }, { isToken }) {
      axios
        .get('/verify')
        .then(({ data }) => {
          commit('setId', data.id)
          commit('setIsLogin', true)
          commit('setEmail', data.email)
        })
        .catch(({ response }) => {
          commit('setId', '')
          commit('setIsLogin', false)
          commit('setEmail', '')
        })
    },
    userLogin({ commit }, { email, password }) {
      console.log('masuk')
      const data = {
        email: email,
        password: password
      }

      console.log(data)
      axios
        .post('/login', data)
        .then(({ data }) => {
          localStorage.setItem('accessToken', data.accessToken)
          commit('setId', data.id)
          commit('setIsLogin', true)
          commit('setEmail', data.email)
          router.push('/main')
          swal("Welcome", "Have Fun!!", "success")
        })
        .catch(({ response }) => {
          console.log(response)
          if (response.data) {
            if (response.data.message != undefined) {
              commit('setErrorLogin', response.data.message)
            } else {
              commit('setEmail', '')
            }
          }
        })
    },
    userLogout({ commit }) {
      localStorage.clear()
      commit('setId', '')
      commit('setIsLogin', false)
      commit('setEmail', '')
      router.push('/')
      swal("Good Bye", "success")
    }
    
  },
  getters: {
    errorLogin(state) {
      return state.errorLogin
    },
    isLogin(state) {
      return state.isLogin
    },
    isUsername(state) {
      return state.username
    }
  }
})
