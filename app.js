const TOKEN = 'TOKEN'
App({ // 注册小程序
  data: {
    isPlay: false,
    pageIndex: null,
    moviesArr: [],
    token: ''
  },
  onLaunch: function () {
    // 先从本地存储中取出token
    let token = wx.getStorageSync(TOKEN)
    // 判断token是否有值
    if(token && token.length !== 0) { 
      //来到这一步，证明token存在，验证token有效期
      this.checkout_token()
    }else {
      this.login()
    }
  },
  checkout_token () {
    wx.request({
      url: 'http://123.207.32.32:3000/login',
      method: 'post',
      data: {
        header: token
      },
      success: (res) => {
        if(!res.data.errCode) {
          console.log('token有效')
          this.data.token = token
        }else {
          this.login()
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  login () {
    // 登录
    wx.login({
      // code只有五分钟有效期
      success: (res) => {
        // 获取code 
        let code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/lohin',
          method: 'post',
          data: {
            code
          },
          success: (res) => {
            console.log(res)
            // 1.取出token
            let token = res.data.token

            // 2.将token保存在data的token中
            this.data.token = token

            // 3.进行本地存储
            wx.setStorageSync(TOKEN, token)
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
    })
  }
})