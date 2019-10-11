// pages/index/index.js
Page({
  // handleParent() {
  //   console.log('父元素');
  // },
  // handleChild() {
  //   console.log('子元素');
  // },
  // 开启小程序之旅
  handleClick() {
    // 若用户未授权则不允许进入小程序
    if (!this.data.isShow) {
      wx.switchTab({
        url: '/pages/list/list',
      });
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    isShow: true,
    counter: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },
  handleGetUserInfo(data) {
    // 判断用户是否点击了允许授权
    if(data.detail.rawData) {
      this.getUserInfo();
    }
  },
  getUserInfo() {
    // 判断用户是否授权
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          // 用户已经授权了
          this.setData({
            isShow: false
          });
        } else {
          // 用户未授权
          this.setData({
            isShow: true
          });
        }
      }
    });

    // 获取用户登录的信息
    wx.getUserInfo({
      success: data => {
        // 更新data中的userInfo数据
        this.setData({
          userInfo: data.userInfo
        });
      },
      fail: () => {
        console.log('获取用户信息失败');
      }
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
  onShareAppMessage: function (options) {
    return {
      title: '周杰伦',
      path: '/pages/index/index'
    }
  }
})