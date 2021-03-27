const app = getApp();
let util = require("../../utils/util.js");
let  _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deskId:'1',
    products:[],
    orderInfo:{},
    orderTime:'',
    productNumber:'',
    number:'',
    loadingHidden:true
  },
  toIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  toHistory:function(){
    wx.switchTab({
      url: '/pages/orderHistory/orderHistory',
    })
  },
  onLoad: function (options) {
    
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
    // this.setData({ deskId: app.globalData.deskId, products: app.globalData.carts});
    this.initData();
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

  toPay: function () {
    this.setData({
      loadingHidden: false
     });
     var that = this;
     setTimeout(function(){
      that.setData({
        loadingHidden: true
      });
      let carts = app.globalData.carts;
      carts = [];
      app.globalData.carts = carts;
      //修改订单的状态
      let id= app.globalData.orderId;
      util.httpJson("wx/api/v1/update/" + id+"/"+1, result => {
        let resp = result.data;
        console.log(resp);
        if(resp.code == 0){
          //赋值
          that.initData();
          wx.showToast({
            title: '支付成功',
            icon: 'succes',
            duration: 1000,
            mask:true
          });
        }else{
          wx.showToast({
            title:resp.message ,
            icon: 'err',
            duration: 1000,
            mask:true
          })
        }
        
    }, "GET");
     }, 3000);
  },
  initData:function(){
    //获取订单详情
    let id= app.globalData.orderId;
    if(id != ''){
      util.httpJson("wx/api/v1/order/" + id, result => {
        let resp = result.data;
        console.log(resp);
        if(resp.code == 0){
          //赋值
           this.setData({
            orderInfo: resp.data,products:resp.data.detail
         });
        }else{
          wx.showToast({
            title:resp.message ,
            icon: 'err',
            duration: 1000,
            mask:true
          })
        }
    }, "GET");
    }
    
  },
  //取消订单
  toCancle:function(){
    let that = this;
    let id= app.globalData.orderId;
    util.httpJson("wx/api/v1/update/" + id+"/"+2, result => {
      let resp = result.data;
      if(resp.code == 0){
        app.globalData.carts = [];
        that.initData();
        wx.showModal({
          title: '提示',
          content: '订单取消成功！',
        });
        //清空购物车
        
      }else{
        wx.showModal({
          title: '提示',
          content: '订单取消失败！',
        })
      }
    }, "GET");
  }
})