// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {}, // 详情页数据
    isCollected: false, // 判断用户是否点击了收藏按钮
    index: null, // 收藏功能中本地存储的键名
    isMusicPlay: false // 音乐是否被播放 
  },
  // 用户收藏按钮的状态的切换
  collectionClick() {
    let isCollected = !this.data.isCollected
    // 更新状态
    this.setData({
      isCollected
    });
    // 提示用户
    let title = isCollected ? '收藏成功' : '取消收藏';
      wx.showToast({
        title,
        icon: 'success'
      });
    // 缓存数据到本地
    let {index} = this.data; // 对象的解构
    wx.getStorage({
      key: 'isCollection',
      success: res => {
        let obj = res.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollection',
          data: obj,
          success: () => 　{
          }
        });
      },
    });
  },
  // 处理音乐播放
  handleMusicPlay() {
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });
    // 控制音乐的播放
    let { dataUrl, title, coverImgUrl} = this.data.detailData.music;
    if(isMusicPlay) {
      // 播放音乐
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      });
    }else {
      // 暂停音乐
      wx.pauseBackgroundAudio();
    }
  },
  // 处理分享功能
  shareClick() {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈', '分享到QQ空间', '分享到新浪微博'
      ],
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({
      // 获取数据
      detailData: datas.list_data[options.index],
      index
    });
    // 根据本地缓存的数据判断用户是否收藏了当前文章
    var value = wx.getStorageSync('isCollection');
    if (!value) {
      wx.setStorageSync('isCollection', {});
    }
    // 判断用户是否收藏
    if (value[index]) {
      this.setData({
        isCollected: true
      })
    }
    // 监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      // 修改isMusicPlay属性值
      this.setData({
        isMusicPlay: true
      });
      // 修改AppDatas中的数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;
    });
    // 判断音乐是否在播放
    if(appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      // 修改isMusicPlay属性值
      this.setData({
        isMusicPlay: true
      });
    }
    // 监听音乐暂停播放
    wx.onBackgroundAudioPause(() => {
      // 修改isMusicPlay属性值
      this.setData({
        isMusicPlay: false
      });
      // 修改AppDatas中的数据
      appDatas.data.isPlay = false;
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