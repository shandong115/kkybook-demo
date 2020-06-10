<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="myFunc">转</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'about',
  components: {
    HelloWorld
  },
  methods: {
    myFunc () {
      console.log('转转..')
      this.$router.push({ path: '/page', query: { p: 5 } })
    }
  }
}
</script>
