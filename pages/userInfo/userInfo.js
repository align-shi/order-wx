// pages/userInfo/userInfo.js
const app = getApp();
let util = require("../../utils/util.js");
let  _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    basePath: app.globalData.api,
    vip:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = app.globalData.userInfo;
    let vip = app.globalData.vip;
    this.setData({
      userInfo:user,vip:vip
    })
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