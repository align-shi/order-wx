const app=getApp();
var _self
Page({
  data: {
    basePath:app.globalData.api,
    currentId:0,
    product:{},
    traits:[],
    otherImageUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this;
    this.data.currentId=options.id;
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
    wx.request({
      url: app.globalData.api +'wx/api/v1/product/'+this.data.currentId,
      success:function(res){
        _self.setData({product:res.data});
      }
    })
    let temp=_self.data.product.trait;
    //_self.setData({traits:temp.split(",")});
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