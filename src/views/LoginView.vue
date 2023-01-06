<template>
  <div class="login-page">
    <div class="div-title row d-flex justify-content-center align-content-center">
      <h1 class="login-title">MVP<span class="primary-color">CMS</span></h1>
    </div>
    <div class="form">
      <form class="login-form">
        <label class="label">Email</label>
        <input type="email" v-model="email" placeholder="email address" />
        <label class="label">Password</label>
        <input type="password" v-model="password" placeholder="password" />
        <button :disabled="disabled" class="login mt-3" @click.prevent="login">
          <div v-if="!disabled">login</div>
          <div v-else>logining...</div>
        </button>
        <button class="register mt-3" @click.prevent="register()">New Account?</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      email: '',
      password: '',
      disabled: false
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    async login () {
      this.disabled = true
      // integrate API
      const fd = new FormData()
      fd.append('email', this.email)
      fd.append('password', this.password)
      await this.$resource.resource(1, '/login', fd)
      await this.$store.dispatch('getRes')
      const response = JSON.parse(this.$store.state.res)

      if (response.status) {
        this.$addNotification('success', 'success')
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
  background: $myColor;
}

.login:hover,
.login:active,
.login:focus {
    background: $myColorFocus;
}

.register {
  background: #5c88ca;
}
</style>
