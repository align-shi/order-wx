// pages/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    headUrl:'',
    userInfo:{},
    menuitems: [
      { text: '个人信息', url: '../../images/bar/me-1.jpg', icon: '../../images/bar/me-1.jpg', tips: '' },
      { text: '历史订单', url: '/pages/orderHistory/orderHistory', icon: '../../images/bar/me-1.jpg', tips: '' },
      { text: '评价管理', url: '../../images/bar/me-1.jpg', icon: '../../images/bar/me-1.jpg', tips: '' },
      { text: '意见反馈', url: '../../images/bar/me-1.jpg', icon: '../../images/bar/me-1.jpg', tips: '' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    this.setData({
      userInfo:app.globalData.userInfo
    })
    // this.setData({
    //   nickName:wx.getStorageSync("userName"),
    //   headUrl:wx.getStorageSync("iconPath")
    // })
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

  },
  closeHide:function(e){
    this.setData({
      ismask: 'none'
    });
  }
})