/*
 * @Author: wenhao.huang
 * @Github: https://github.com/WenHaoHuang
 * @Create: 2019-06-11 17:06:06
 */
export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loading: false,
      cutPage: false
    }
  },
  mounted() {
    this.getListFn = this.debounce(this.getListFn, 500)
  },
  methods: {
    pageChange(pageIndex) {
      this.currentPage = pageIndex
      !this.cutPage && this.getListFn()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      !this.cutPage && this.getListFn()
    }
  }
}
