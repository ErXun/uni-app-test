<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="onInput" :radius="100" cancelButton="none" focus></uni-search-bar>
    </view>
    <view class="sugg-list">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        searchValue: '',
        // 搜索结果列表
        searchResults: []
      };
    },
    watch: {

    },
    methods: {
      onInput(e) {
        // 输入框防抖
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.searchValue = e
          // 根据关键词，查询搜索建议列表
          this.getSearchList()
        }, 600)
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.searchValue === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const {
          data
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.searchValue
        })
        if (data.meta.status !== 200) return uni.$showMsg()
        this.searchResults = data.message
    
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;

    .uni-searchbar {
      background-color: #c00000;
    }
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
</style>