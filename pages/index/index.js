const app = getApp();
let util = require("../../utils/util.js");
let  _self;
Page({
    data: {
      // 是否显示下面的购物车
      winHeight: 0,
      HZL_isCat: 0,
      productNumber: 0,
      total: 0,             //购物车中的总金额
      deskId: app.globalData.deskId,
      basePath: app.globalData.api,
      imageUrls: ["/images/index/haibao-1.jpg", "/images/index/haibao-2.jpg",
          "/images/index/haibao-3.jpg", "/images/index/haibao-4.jpg", "/images/index/haibao-5.jpg"
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      cateTypeItems: [],    //菜品分类
      productItems: [],     //菜品
      carts:[],
      curNav: 0,
      curIndex: 0,
      defaultImage:"img/no_image.png",
      userInfo:{},
    },
    onLoad: function() {
      _self = this;
      wx.getSystemInfo({
        success: function(res) {
          _self.setData({
            winHeight: res.windowHeight - 200
          });
        }
      });
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                //将用户信息设置缓存
                wx.setStorageSync('userName', res.userInfo.nickName),
                wx.setStorageSync('iconPath', res.userInfo.avatarUrl),
                wx.setStorageSync('signature', res.userInfo.signature),
                this.setData({
                  ismask: 'none'
                });
              }
            })
          }else{
            this.setData({
              ismask: 'block'
            });
          }
        }
      });
    },
    closeHide:function(){
      this.setData({
        ismask: 'none'
      });
      this.onLoad();
    },
    onShow: function() {
      let _self = this;
      //获取菜品分类数据
      util.httpJson("wx/api/v1/type/list", result => {
        _self.setData({ cateTypeItems: result.data })
      }, "GET");
      //获取菜品数据
      util.httpJson("wx/api/v1/product/list", result => {
        _self.setData({
            productItems: result.data
        });
      }, "GET");
      if (app.globalData.carts.length == 0){
        _self.setData({
          productNumber: 0,total:0,carts:app.globalData.carts
      });
      }
      app.globalData.deskId = this.data.deskId;
    },
    errorHandler:function(e){
      let index = e.target.dataset.index;
      let products=this.data.productItems;
      products[index].imageUrl=this.data.defaultImage;
      this.setData({productItems:products});
    },
    scanCode: function() {
        let _self = this;
        wx.scanCode({
            onlyFromCamera: true,
            dataType: 'json',
            success(res) {
              let id = res.result.split("=")[1];
              _self.setData({
                  deskId: id
              });
              app.globalData.deskId = id;
            }
        })
    },
    switchRightTab: function(e) {
        let _self = this;
        let currentTypeId = e.target.dataset.id;
        this.setData({
            curNav: currentTypeId
        });
        if (currentTypeId == '0') {
            util.httpJson("wx/api/v1/product/list", result => {
                _self.setData({
                    productItems: result.data
                });
            }, "GET");
        } else {
            util.httpJson("wx/api/v1/product/type/" + currentTypeId, result => {
                _self.setData({
                    productItems: result.data.products
                });
            }, "GET");
        }
    },
  productDetail: function (e) {
    let currentId=e.currentTarget.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + currentId});
  },
  addCart:function(e){
    let currentId = e.currentTarget.id;
    let cartCurrentProduct;
    let shoppingCarts = this.data.carts;
    if (_self.data.carts!=null){
      cartCurrentProduct = shoppingCarts.find(elem => elem.id == currentId);
    }
    if (cartCurrentProduct != undefined){
      cartCurrentProduct.num++;
      this.computeOperation();
    }else{
      util.httpJson("wx/api/v1/product/" + currentId, result => {
        let product=result.data;
        product.num=1;
        shoppingCarts.push(product);
        app.globalData.carts = shoppingCarts;
        this.computeOperation();
      }, "GET");
    }
    let productNum = this.data.productNumber +1;
    this.setData({productNumber: productNum,carts: shoppingCarts});
  },
  computeOperation: function () {
    let shoppingCarts = this.data.carts;
    let count = 0;
    shoppingCarts.forEach(elem => {
      console.log(elem);
      let temp = elem.realPrice * elem.num;
      count = count + temp;
    });
    this.setData({ total: count, carts: shoppingCarts });
  },
  HZL_isCat:function(e){
    var that = this;
    this.setData({ "carts": app.globalData.carts });
    if (that.data.HZL_isCat == 0 && that.data.carts.length > 0) {
      that.setData({
        HZL_isCat: 1
      })
    } else if (that.data.HZL_isCat == 1 && that.data.carts.length > 0) {
      that.setData({
        HZL_isCat: 0
      })
    }
  },
  /**
   * 下面购物车减少按钮
   */
  HZL_jian1: function (e){
    let currentId = e.currentTarget.dataset.id;
    let shoppingCarts = this.data.carts;
    let currentProduct = shoppingCarts.find(elem => elem.id == currentId);
    console.log(currentProduct);
    if (currentProduct.num == 1) {
      shoppingCarts.splice(shoppingCarts.findIndex(elem => currentProduct.id == elem.id), 1);
    } else {
      currentProduct.num = --currentProduct.num;
    }
    let productNum = this.data.productNumber;
    if(productNum == 1){
      this.setData({
        carts:shoppingCarts,HZL_isCat:0,productNumber:productNum -1
      })
    }else{
      this.setData({carts:shoppingCarts,productNumber:productNum -1})
    }
    this.computeOperation();
  },
  /**
   * 下面购物车增加按钮
   */
  HZL_jia1: function (e){
    let currentId = e.currentTarget.dataset.id;
    let shoppingCarts = this.data.carts;
    let currentProduct = shoppingCarts.find(elem => elem.id == currentId);
    currentProduct.num = ++currentProduct.num;
    let productNum = this.data.productNumber;
    this.setData({
      carts:shoppingCarts,productNumber:productNum+1
    })
    this.computeOperation();
  },
  HZL_zero: function (){
    app.globalData.carts = [];
    this.setData({
      carts:[],productNumber:0,total:0,HZL_isCat:0
    })
  },
  placeOrder: function () {
    if (this.data.productNumber != 0) {
      const serialNumber = util.getSerialNumber();
      let ods = [];
      this.data.carts.forEach(elem => {
        ods.push(elem.id);
      });
      let username = app.globalData.userInfo.nickName;
      util.httpJsonPost("wx/api/v1/order", {
        'deskId': _self.data.deskId,
        'serialNumber': serialNumber,
        'orderAmount': _self.data.total,
        'createTime': util.formatTime(new Date),
        'tradeStatus': '0',
        'payStatus': '0',
        'ids': ods,
        'shoppingCart': _self.data.carts,
        username:username
      },resp=>{
        if (resp.data.result == "ok") {
          app.globalData.orderId = resp.data.orderId;
          wx.switchTab({
            url: '/pages/myOrder/myOrder',
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '下单失败，请重试！',
          })
        }
      });
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
})