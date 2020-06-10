<template>
  <div class="home">
    <h1>快书，点亮世界 点亮你！</h1>
    <div class="books-wrapper">
      <div class="book-item" v-for="(item, index) in items" :key="index">
        <a href="http://www.baidu.com">
          <div class="one-book" :style="{backgroundImage:`url('${item.img_path}')`}"></div>
        </a>
      </div>
    </div>
    <Paginate
            :v-model="currentPage"
            :force-page=currentPage
            :page-count="total"
            :margin-pages="2"
            :page-range="5"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :page-link-class="'page-link-item'"
            :prev-class="'prev-item'"
            :prev-link-class="'prev-link-item'"
            :next-class="'next-item'"
            :next-link-class="'next-link-item'"
            :break-view-class="'break-view'"
            :break-view-link-class="'break-view-link'"
            :first-last-button="true"
            :click-handler="clickCallback"
          ></Paginate>
  </div>
</template>

<script>
import { getOnePageBooks } from '@/api/index'
import Paginate from 'vuejs-paginate'

export default {
  inject: ['reload'],
  methods: {
    clickCallback (pagNum) {
      console.log('clicked: ' + pagNum)
      this.$router.push({ path: '/page', query: { p: pagNum } })
      this.reload()
    }
  },
  components: {
    Paginate
  },
  data () {
    return {
      total: 0,
      currentPage: 1,
      items: null
    }
  },
  mounted () {
    var p = parseInt(this.$route.query.p)
    console.log('p: ' + p)
    if (!p || p <= 0) p = 1
    this.currentPage = p
    getOnePageBooks(this.currentPage).then(response => {
      if (response && response.status === 200) {
        const data = response.data
        this.items = data.data.detail
        this.total = data.data.total
        this.currentPage = data.data.currentPage
        console.log('rcv success! length = ' + this.items.length)
      }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

@import "../assets/styles/global";

  .home {
    .books-wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      background-color: #CCCCCC;
      .book-item {
        .one-book {
          width: 26.25rem;
          height: 35rem;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border: 0.5rem solid #CCCCCC;
          box-sizing: border-box;
        }
      }
    }
    .pagination {
      display: flex;
      @include center;
      height: 6.25rem;
      width: 100%;
      background-color: white;
    }
  }
</style>
