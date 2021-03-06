const app = getApp();
let util = require("../../utils/util.js");
let  _self;
Page({
    data: {
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
      defaultImage:"img/no_image.png"
    },
    onLoad: function() {
      _self = this;
      // wx.getSetting({
      //   success: res => {
      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      //       wx.getUserInfo({
      //         success: res => {
      //           //将用户信息设置缓存
      //           console.log(res),
      //           wx.setStorageSync('userName', res.userInfo.nickName),
      //           wx.setStorageSync('iconPath', res.userInfo.avatarUrl),
      //           wx.setStorageSync('signature', res.userInfo.signature),
      //           this.setData({
      //             ismask: 'none'
      //           });
      //         }
      //       })
      //     }else{
      //       this.setData({
      //         ismask: 'block'
      //       });
      //     }
      //   }
      // });
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
    if (_self.data.carts!=null){
      cartCurrentProduct = _self.data.carts.find(elem => elem.id == currentId);
    }
    if (cartCurrentProduct != undefined){
      cartCurrentProduct.num++;
    }else{
      util.httpJson("wx/api/v1/product/" + currentId, result => {
        let product=result.data;
        product.num=1;
        _self.data.carts.push(product);
      }, "GET");
    }
    app.globalData.carts = _self.data.carts;
  }
})