<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="container">
      <view class="nav-list">
        <view class="nl-item" v-for="(item,index) in navList" :key="index">
          <image :src="item.image_src" mode="" @click="handleCateClick(item)"></image>
        </view>
      </view>
      <view class="floor-list">
        <view class="fl-item" v-for="(item,index) in floorList" :key="index">
          <view class="fl-item-title">
            <image :src="item.floor_title.image_src" mode=""></image>
          </view>
          <view class="fl-item-container">
            <navigator class="left" :url="item.product_list[0].url">
              <image :src="item.product_list[0].image_src" mode="widthFix"></image>
            </navigator>
            <view class="right">
              <template v-for="(j,jIndex) in item.product_list" :key="jIndex">
                <navigator class="r-item" v-if="jIndex !== 0" :url="j.url">
                  <image :src="j.image_src" mode=""></image>
                </navigator>
              </template>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      }
    },
    onLoad() {
      this.getSwiperData()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperData() {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/home/swiperdata')
          if (data.meta.status == '200') {
            this.swiperList = data.message
            // console.log(this.swiperList);
          } else {
            return uni.$showMsg()
          }
        } catch (error) {}
      },
      async getNavList() {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/home/catitems')
          if (data.meta.status == '200') {
            this.navList = data.message
          } else {
            return uni.$showMsg()
          }
        } catch (error) {}
      },
      handleCateClick(item) {
        // console.log(item);
        if (item.name == '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }

      },
      async getFloorList() {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/home/floordata')
          if (data.meta.status == '200') {
            data.message.forEach(floor => {
              floor.product_list.forEach(prod => {
                prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
              })
            })
            this.floorList = data.message
            // console.log(this.floorList);
          } else {
            return uni.$showMsg()
          }
        } catch (error) {}
      },
      handleProduct(j) {
        // console.log(j, '---j');
        uni.sw
      }

    }
  }
</script>

<style lang="scss" scoped>
  swiper {
    height: 350rpx;
    .swiper-item,
    image {
      height: 100%;
      width: 100%;
    }
  }

  .container {
    padding: 0 20rpx;
  }

  .nav-list {
    margin: 20rpx 0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .nl-item {
      image {
        width: 128rpx;
        height: 140rpx;
      }
    }
  }

  .floor-list {
    margin-top: 60rpx;

    .fl-item {
      margin: 20rpx 0;

      .fl-item-title {
        image {
          width: 100%;
          height: 60rpx;
        }
      }

      .fl-item-container {
        display: flex;
        align-items: center;
        height: 400rpx;

        .left {
          flex: 1;
          height: 100%;

          image {
            width: 100%;
            // height: 100%;
          }
        }

        .right {
          margin-left: 10rpx;
          flex: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          .r-item {
            width: 49%;
            height: 46%;

            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>