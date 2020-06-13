<template>
  <div class="home">
    <span class="slogen">快书，点亮世界，点亮你！</span>
    <div class="books-wrapper">
      <div class="book-item" v-for="(item, index) in pageItems" :key="index">
        <div class="one-book" :style="{backgroundImage:`url('${item.img_path}')`}" @click="HandlerBookClick(item.book_id)"></div>
      </div>
    </div>
    <div class="pageNav">
      <Paginate
              :v-model="currentPage"
              :force-page="currentPage"
              :value="currentPage"
              :page-count="totalPages"
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
  </div>
</template>

<script>
import { getOnePageBooks } from '@/api/index'
import Paginate from 'vuejs-paginate'
import { bookCityMixin } from '@/utils/mixin'

export default {
  mixins: [bookCityMixin],
  methods: {
    clickCallback (pagNum) {
      console.log('clicked: ' + pagNum)
      this.$router.push({ path: '/page', query: { p: pagNum } })
      this.reloadRouterView()
    },
    HandlerBookClick(name) {
      console.log('open book ' + name + ' ....')
      const routerPath = '/ebook/' + name + '.epub'
      console.log('routePath: ' + routerPath)
      this.$router.push({ path: routerPath })
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
    console.log('cp: ' + this.currentPage)
    getOnePageBooks(this.currentPage).then(response => {
      if (response && response.status === 200) {
        const data = response.data
        console.log('length: ss' + data.data.detail.length)
        console.log('cp: ' + this.currentPage)
        this.setCurrentPage(parseInt(data.data.currentPage))
        this.setPageItems(data.data.detail)
        this.setTotalPages(parseInt(data.data.totalPages))
        console.log('rcv success! length = ' + this.pageItems.length)
      }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

@import "../assets/styles/global";

  .home {
    // overflow: auto;
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
          cursor: pointer;
        }
      }
    }
    .pageNav {
      display: flex;
      @include center;
      height: px2rem(100);
      width: 100%;
      .pagination {
        height: px2rem(40);
        background-color: white;
      }
    }
  }
</style>
