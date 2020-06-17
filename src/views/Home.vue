<template>
  <div class="home">
    <span class="slogen">快书，点亮世界，点亮你！</span>
    <div class="books-wrapper">
      <div class="book-item" v-for="(item, index) in pageItems" :key="index">
        <div class="one-book" :style="{backgroundImage:`url('${item.img_path}')`}" @click="HandlerBookClick(item)" :title="item.title+'\n'+item.author+'\n'+(item.size/1024).toFixed(1)+'KB'">
          <!-- <span class="book-info" :style="{display: none}">{{(item.size/1024).toFixed(1)}}KB</span> -->
        </div>
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
    ComingIn() {
      console.log('mounse in...')
    },
    ComingOut() {
      console.log('Coming out...')
    },
    clickCallback (pagNum) {
      console.log('clicked: ' + pagNum)
      this.reloadRouterView()
      this.$router.push({ path: '/page', query: { p: pagNum } })
    },
    HandlerBookClick(item) {
      console.log('open book ' + item.book_id + ' ....')
      const routerPath = '/ebook/' + item.book_id + '.epub'
      console.log('routePath: ' + routerPath)
      this.setItem(item)
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
      font-size: px2rem(20);
      @include center;
      border-bottom: px2rem(2) solid purple;
      padding-bottom: px2rem(15);
      padding-top: px2rem(15);
      background-color: #ddd;
      font-weight: bold;
     // background: #7d8188;
    }
    .books-wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      background-color: #888;
      .book-item {
        .one-book {
          width: px2rem(195);
          height: px2rem(260);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border: px2rem(4) solid #888;
          box-sizing: border-box;
          cursor: pointer;
        }
        .book-info {
          background-color: #FFFFFF;
        }
        .one-book:hover {
          border:2px solid #FFF;
        }
      }
    }
    .pageNav {
      display: flex;
      @include center;
      height: px2rem(80);
      width: 100%;
      background-color: #ddd;
      .pagination {
        height: px2rem(40);
        background-color: #ddd;
      }
    }
  }
</style>
