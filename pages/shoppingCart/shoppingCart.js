var app = getApp();
var util = require("../../utils/util.js");
var _self;
Page({
  data: {
    deskId: '',
    productNumber: 0,
    basePath: app.globalData.api,
    selectUrl: '/images/yes.png',
    carts: [],          //初始购物车数组
    allSelected: false,
    total: 0             //购物车中的总金额
  },
  initData: function () {
    this.setData({ "carts": app.globalData.carts });
  },
  allSelectOperation: function () {
    let currentSelected = !this.data.allSelected;
    let shoppingCarts = this.data.carts;
    shoppingCarts.forEach(elem => {
      elem.selected = currentSelected;
    });
    this.setData({ allSelected: currentSelected });
    this.data.carts = shoppingCarts;
    this.computeOperation();
  },
  selectOperation: function (e) {
    let currentId = e.currentTarget.dataset.id;
    let shoppingCarts = this.data.carts;
    let currentProduct = shoppingCarts.find(elem => elem.id == currentId);
    if (currentProduct != undefined)
      currentProduct.selected = !currentProduct.selected;
    if (shoppingCarts.every(elem => elem.selected == false)) {
      this.setData({ allSelected: false })
    }
    if (shoppingCarts.every(elem => elem.selected == true)) {
      this.setData({ allSelected: true })
    }
    this.data.carts = shoppingCarts;
    this.computeOperation();
  },
  reduceOne: function (e) {
    let currentId = e.currentTarget.dataset.id;
    let shoppingCarts = this.data.carts;
    let currentProduct = shoppingCarts.find(elem => elem.id == currentId);
    if (currentProduct.num == 1) {
      console.log(shoppingCarts);
      shoppingCarts.splice(shoppingCarts.findIndex(elem => currentProduct.id == elem.id), 1);
    } else {
      currentProduct.num = --currentProduct.num;
    }
    this.data.carts = shoppingCarts;
    this.computeOperation();
  },
  addOne: function (e) {
    let currentId = e.currentTarget.dataset.id;
    let shoppingCarts = this.data.carts;
    let currentProduct = shoppingCarts.find(elem => elem.id == currentId);
    currentProduct.num = ++currentProduct.num;
    this.data.carts = shoppingCarts;
    this.computeOperation();
  },
  computeOperation: function () {
    let shoppingCarts = this.data.carts;
    let count = 0;
    let productNum = 0;
    shoppingCarts.filter(elem => elem.selected).forEach(elem => {
      let temp = elem.realPrice * elem.num;
      productNum += elem.num;
      count = count + temp;
    });
    this.setData({ total: count, carts: shoppingCarts, productNumber: productNum });
  },
  navigateToDetail: function (e) {
    let currentId = e.currentTarget.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + currentId });
  },
  placeOrder: function () {
    if (this.data.productNumber != 0) {
      const serialNumber = util.getSerialNumber();
      let ods = [];
      this.data.carts.forEach(elem => {
        ods.push(elem.id);
      });
      util.httpJsonPost("wx/api/v1/order", {
        'deskId': _self.data.deskId,
        'serialNumber': serialNumber,
        'orderAmount': _self.data.total,
        'createTime': util.formatTime(new Date),
        'tradeStatus': '0',
        'payStatus': '0',
        'ids': ods,
        'shoppingCart': _self.data.carts
      },resp=>{
        console.log(resp.data.result);
        if (resp.data.result == "ok") {
          wx.switchTab({
            url: '/pages/myOrder/myOrder?orderId=' + resp.data.orderId,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '下单失败，请重试！',
          })
        }
      });
      /*
      wx.request({
        url: _self.data.basePath + ,
        method: 'PUT',
        dataType: 'json',
        data: {
          'deskId': _self.data.deskId,
          'serialNumber': serialNumber,
          'orderAmount': _self.data.total,
          'createTime': util.formatTime(new Date),
          'tradeStatus': '0',
          'payStatus': '0',
          'ids': ods,
          'shoppingCart': _self.data.carts
        },
        success: function (resp) {
          console.log(resp.data.result);
          if (resp.data.result == "ok") {
            wx.switchTab({
              url: '/pages/myOrder/myOrder?orderId=' + resp.data.orderId,
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '下单失败，请重试！',
            })
          }
        }
      });
      */
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '没有选择任何菜品',
        success: function (res) {
          if (res.confirm) {
          } else {
          }
        }
      })
    }

  },
  onShow: function () {
    _self = this;
    this.setData({ 'deskId': wx.getStorageSync('deskId') });
    this.initData();
    this.computeOperation();
    this.allSelectOperation();
    this.setData({ deskId: app.globalData.deskId });
    console.log(this.data.carts);
  }
})