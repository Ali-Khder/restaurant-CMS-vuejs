<template>
  <div class="login-page">
    <div class="div-title row d-flex justify-content-center align-content-center">
      <h1 class="login-title">Restaurant<span class="primary-color">CMS</span></h1>
    </div>
    <div class="form">
      <form class="login-form">
        <label class="label">Username</label>
        <input type="text" v-model="username" placeholder="Username" />
        <label class="label">Email</label>
        <input type="email" v-model="email" placeholder="email address" />
        <label class="label">Password</label>
        <input type="password" v-model="password" placeholder="password" />
        <button :disabled="disabled" class="register mt-3" @click.prevent="register">
          <div v-if="!disabled">register</div>
          <div v-else>logging...</div>
        </button>
        <button class="login mt-3" @click.prevent="login">You Have An Account?</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data () {
    return {
      email: '',
      password: '',
      username: '',
      disabled: false
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    async register () {
      this.disabled = true
      // integrate API
      const fd = new FormData()
      fd.append('username', this.username)
      fd.append('email', this.email)
      fd.append('password', this.password)
      await this.$resource.resource(1, '/register', fd)
      await this.$store.dispatch('getRes')
      const response = JSON.parse(this.$store.state.res)

      if (response.status === true) {
        this.$addNotification('success', response.message)
        await this.$store.dispatch('setToken', response.data.token)
        this.$router.push('/')
      } else {
        this.$addNotification('danger', response.message)
      }
      this.disabled = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/login.scss';

.login {
  background: #5c88ca;
}

.register:hover,
.register:active,
.register:focus {
    background: $myColorFocus;
}

.register {
  background: $myColor;
}
</style>
