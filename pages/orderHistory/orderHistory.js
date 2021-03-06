// pages/order/order.js
const app = getApp();
let util = require("../../utils/util.js");
let  _self;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '待付款', index: 1 }, { name: '已取消', index: 2 }],
    //已完成
    alreadyOrder:[],
    //代付款
    waitPayOrder:[],
    //已取消
    lostOrder:[],
    basePath: app.globalData.api,

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },
 
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
 
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function(){
    let userInfo = app.globalData.userInfo;
    util.httpJson("wx/api/v1/order/list/" + userInfo.nickName+"/1", result => {
      let resp = result.data;
      console.log(resp);
      if(resp.code == 0){
        let data = resp.data;
        //赋值
         this.setData({
          alreadyOrder: data,deviceH:385 * (data.length+1)
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
    // this.setData({
    //   alreadyOrder: [{ name: "跃动体育运动俱乐部(圆明园店)", state: "交易成功", time: "2018-09-30 14:00-16:00", status: "已结束", url: "../../images/bad0.png", money: "132" }, { name: "跃动体育运动俱乐部(圆明园店)", state: "交易成功", time: "2018-10-12 18:00-20:00", status: "未开始", url: "../../images/bad3.jpg", money: "205" }]
    // })
  },
 
  waitPayShow:function(){
    let userInfo = app.globalData.userInfo;
    util.httpJson("wx/api/v1/order/list/" + userInfo.nickName+"/0", result => {
      let resp = result.data;
      console.log(resp);
      if(resp.code == 0){
        let data = resp.data;
        //赋值
         this.setData({
          waitPayOrder: data,deviceH:385 * (data.length+1)
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
    // this.setData({
    //   waitPayOrder: [{ name: "跃动体育运动俱乐部(圆明园店)", state: "待付款", time: "2018-10-14 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "186" }],
    // })
  },
 
  lostShow: function () {
    let userInfo = app.globalData.userInfo;
    util.httpJson("wx/api/v1/order/list/" + userInfo.nickName+"/2", result => {
      let resp = result.data;
      console.log(resp);
      if(resp.code == 0){
        let data = resp.data;
        //赋值
         this.setData({
          lostOrder: data,deviceH:385 * (data.length+1)
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
    // this.setData({
    //   lostOrder: [{ name: "跃动体育运动俱乐部(圆明园店)", state: "已取消", time: "2018-10-4 10:00-12:00", status: "未开始", url: "../../images/bad1.jpg", money: "122" }],
    // })
  },
  toDeatil:function(e){
   let id =  e.currentTarget.id;
   app.globalData.orderId = id;
   
   wx.navigateTo({
    
    url: '/pages/orderDetail/orderDetail',
    success:res=>{

      console.log(res);

    },

    fail:err=>{

      console.log(err)

    }
  })
  }
})