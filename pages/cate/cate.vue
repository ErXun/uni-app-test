<template>
  <view class="cate-container">
    <view class="search">

    </view>
    <view class="list">
      <scroll-view class="left" scroll-y="true" :style="{height: wHeight + 'px'}">
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['left-item',index === activeIndex ?  'active': '']" @click="handleSelect(item,index)">
            {{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <scroll-view class="right" scroll-y="true" :style="{height: wHeight + 'px'}" :scroll-top="scrollTop">
        <view class="right-item" v-for="(item,index) in secondCateList" :key="index">
          <view class="second-title">/{{item.cat_name}}/</view>
          <view class="third-list">
            <view class="tl-item" v-for="(j,jIndex) in item.children" @click="handleJump(j)">
              <image :src="j.cat_icon" mode=""></image>
              <view class="ti-name">{{j.cat_name}}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wHeight: 0, // 可使用高度
        cateList: [],
        activeIndex: 0,
        secondCateList: [],
        scrollTop: 0 // 滚动条距离顶部的距离
      }
    },
    onLoad() {
      // uni.getSystemInfoSync() , 获取系统信息
      const {
        windowHeight
      } = uni.getSystemInfoSync()
      if (windowHeight) {
        this.wHeight = windowHeight
      }
      this.getCateList()
    },
    methods: {
      async getCateList() {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/categories')
          if (data.meta.status == '200') {
            this.cateList = data.message
            this.secondCateList = data.message[0].children
          } else {
            return uni.$showMsg()
          }
        } catch (error) {}
      },
      handleSelect(item, index) {
        this.activeIndex = index
        this.secondCateList = item.children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转到商品列表界面
      handleJump(value) {
        uni.navigateTo({
          url: "/subpkg/goods_list/goods_list?cid=" + value.cat_id
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cate-container {
    .list {
      display: flex;

      .left {
        width: 120px;

        .left-item {
          background-color: #f7f7f7;
          line-height: 60px;
          text-align: center;
          font-size: 12px;

          &.active {
            background-color: #fff;
            position: relative;

            &::before {
              content: ' ';
              display: block;
              width: 3px;
              height: 30px;
              background-color: #c00000;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }

      .right {
        flex: 1;
        background-color: #fff;

        .right-item {
          .second-title {
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            padding: 15px 0;
          }

          .third-list {
            display: flex;
            flex-wrap: wrap;

            .tl-item {
              width: 33.33%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              margin-bottom: 10px;

              image {
                width: 60px;
                height: 60px;
              }

              .ti-name {
                // text-align: center;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
</style>