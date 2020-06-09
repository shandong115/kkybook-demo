<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="book-wrapper">
      <div class="book-item" v-for="(item, index) in items" :key="index">
        <!-- <div class="one-book" :style="{backgroundImage:`url('${item.img_path}')`}"></div> -->
        <figure class="one-book" :style="{backgroundImage:`url('${item.img_path}')`}"></figure>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllBooks } from '@/api/index'

export default {
  data () {
    return {
      items: null
    }
  },
  mounted () {
    getAllBooks().then(response => {
      if (response && response.status === 200) {
        const data = response.data
        this.items = data.data.detail
        console.log('rcv success! length = ' + this.items.length)
      }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

 // @import url("../assets/stles/global");

  .about {
    .book-wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%
      flex-wrap wrap;
      border: 0.0625rem solid red;
      .book-item {
        //display: flex;
        flex-basis: auto;
        background-color: blue;
        //flex-direction: column;
        //width: 19.375rem;
        .one-book {
          //display: flex;
          width: 18.75rem;
          height: 25rem;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border: 0.3125rem solid #ccc;
        }
      }
    }
  }
</style>
