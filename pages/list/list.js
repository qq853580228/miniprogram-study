// pages/list/list.js
let datas = require('../../datas/list-data.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperItem: [ //轮播图数据
      {
        id: '01',
        imgUrl: '/images/detail/carousel/01.jpg'
      },
      {
        id: '02',
        imgUrl: '/images/detail/carousel/02.jpg'
      },
      {
        id: '03',
        imgUrl: '/images/detail/carousel/03.jpg'
      }, 
      {
        id: '04',
        imgUrl: '/images/detail/carousel/04.jpg'
      }
    ],
    listArr: []
  },
  // 点击轮播图跳转到相应详情页
  carouselToDetail(e) {
    let index = e.target.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    })
  },
  // 点击跳转到详情页
  toDetail(e) {
    // 获取点击目标对象的下标
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      // 通过wx.navigateTo把下标index传递给detail
      url: '/pages/detail/detail?index=' + index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listArr: datas.list_data
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})