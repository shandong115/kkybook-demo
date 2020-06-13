<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <span class="icon-back" @click="goBack"></span>
      </div>
      <div class="cnte">
        {{item.title}}
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-add"></span>
        </div>
        <!-- <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin, bookCityMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin, bookCityMixin],
    methods: {
      goBack() {
        this.resetEbookMixin()
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 210;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    justify-content: space-between;
    .left {
      // flex: 0 0 px2rem(60);
      @include left;
      margin-left: px2rem(15);
    }
    .cnte {
      @include center;
      @include ellipsis;
      padding-left: px2rem(20);
      padding-top: px2rem(10);
      padding-bottom: px2rem(10);
    }
    .right {
      @include right;
      margin-right: px2rem(15);
      // flex: 0 0 px2rem(60);
      /* flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
        .icon-shelf {
          font-size: px2rem(22);
        }
        .icon-cart {
          font-size: px2rem(22);
        }
      } */
    }
  }
</style>
