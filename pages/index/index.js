const app = getApp();
let util = require("../../utils/util.js");
let  _self = this;
Page({
    data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
      ismask:true,
      vip:0
    },
    onLoad: function() {
      let _self = this;
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
            wx.getUserInfo({
              success:res =>{
                util.httpJson("user/info/"+res.userInfo.nickName, result => {
                  let resp = result.data;
                  if (resp.code == 0) {
                    if(resp.data != null){
                      app.globalData.vip = resp.data.vip;
                      _self.setData({
                        vip :resp.data.vip
                      });
                    }else{
                      app.globalData.vip = 0;
                      _self.setData({
                        vip :0
                      });
                    }
                  }
                });
              }
            })
            this.setData({
              ismask: false
            });
          }else{
            this.setData({
              ismask: 'true'
            });
          }
        }
      });
    },
    showSettingToast: function(e) {
      wx.showModal({
        title: '提示！',
        confirmText: '去设置',
        showCancel: false,
        content: e,
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../setting/setting',
            })
          }
        }
      })
    },
    bindGetUserInfo: function(e) {
      let _selt = this;
      if (e.detail.userInfo) {
          //用户按了允许授权按钮
          var that = this;
          // 获取到用户的信息了，打印到控制台上看下
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          let user = e.detail.userInfo;
          app.globalData.userInfo = user;
          //查询用户信息
          util.httpJson("user/info/"+user.nickName, result => {
            let resp = result.data;
            if (resp.code == 0) {
              if(resp.data != null){
                _selt.setData({
                  vip :resp.data.vip
                });
                app.globalData.vip = resp.data.vip;
              }else{
                //第一次登陆 保存信息
                //保存用户信息
              util.httpJsonPost("user/save",user ,resp=>{
                let result = resp.data;

                if (result.code == 0) {
                console.log("保存成功")
                } else {
                  console.log("保存失败")
                }
              });
              _selt.setData({
                vip :0
              });
            }
          } 
          }, "GET");
          
          console.log(e.detail.userInfo);
          that.setData({
            ismask: false
          });
      } else {
          //用户按了拒绝按钮
          wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
              showCancel: false,
              confirmText: '返回授权',
              success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                      console.log('用户点击了“返回授权”');
                  }
              }
          });
      }
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
    if (shoppingCarts!=null){
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
      let temp = 0;
      if(this.data.vip == 0){
        temp = elem.realPrice * elem.num;
      }else{
        temp = elem.price * elem.num;
      }
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
    let _self = this;
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