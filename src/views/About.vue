<template>
  <div class="about">
    <h1>快书，点亮世界 点亮你！</h1>
    <div class="books-wrapper">
      <div class="book-item" v-for="(item, index) in items" :key="index">
        <!-- <div class="one-book" :style="{backgroundImage:`url('${item.img_path}')`}"></div> -->
        <a href="http://www.baidu.com">
          <div class="one-book" :style="{backgroundImage:`url('${item.img_path}')`}"></div>
        </a>
      </div>
    </div>
    <div class="navigation"></div>
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

@import "../assets/styles/global";

  .about {
    .books-wrapper {
      display: flex;
      flex-flow: row wrap;
      //align-items: center;
      justify-content: center;
      //border: 0.0625rem solid red;
      background-color: #CCCCCC;
      .book-item {
        .one-book {
          width: 15rem;
          height: 20rem;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border: 0.5rem solid #CCCCCC;
          box-sizing: border-box;
        }
      }
    }
    .navigation {
      height: 2.5rem;
      width: 100%;
      background-color: purple;
    }
  }
</style>
