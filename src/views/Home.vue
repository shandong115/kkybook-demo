<template>
  <div class="home">
    <span class="slogen">快书，点亮世界，点亮你！</span>
    <div class="books-wrapper">
      <div class="book-item" v-for="(item, index) in pageItems" :key="index">
        <a :href="item.img_path">
          <div class="one-book" :style="{backgroundImage:`url('${item.img_path}')`}"></div>
        </a>
      </div>
    </div>
    <Paginate
            :v-model="currentPage"
            :force-page=currentPage
            :page-count=totalPages
            :margin-pages=2
            :page-range=5
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
import { bookCityMixin } from '../utils/mixin'

export default {
  mixins: [bookCityMixin],
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
  mounted () {
    var p = parseInt(this.$route.query.p)
    console.log('p: ' + p)
    if (!p || p <= 0) p = 1
    this.setCurrentPage(p)
    console.log('cp: ' + parseInt(this.currentPage))
    getOnePageBooks(this.currentPage).then(response => {
      if (response && response.status === 200) {
        const data = response.data
        /* this.items = data.data.detail
        this.total = data.data.total
        this.currentPage = data.data.currentPage */
        console.log('length: ss' + data.data.detail.length)
        this.setCurrentPage(data.data.currentPage)
        console.log('cp: ' + this.currentPage)
        this.setPageItems(data.data.detail)
        this.setTotalPages(data.data.totalPages)
        console.log('rcv success! length = ' + this.pageItems.length)
      }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

@import "../assets/styles/global";

  .home {
    .slogen{
      font-size: px2rem(15);
      @include center;
      border-bottom: px2rem(2) solid purple;
      padding-bottom: px2rem(15);
     // background: #7d8188;
    }
    .books-wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      background-color: #EEEEEE;
      .book-item {
        .one-book {
          width: px2rem(195);
          height: px2rem(260);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border: px2rem(4) solid #EEEEEE;
          box-sizing: border-box;
        }
      }
    }
    .pagination {
      display: flex;
      @include center;
      height: px2rem(50);
      width: 100%;
      background-color: white;
    }
  }
</style>
