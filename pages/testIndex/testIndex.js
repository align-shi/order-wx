const app = getApp();
let util = require("../../utils/util.js");
let  _self;
Page({
  data: {
    Total: 0,
    FoodLength: 0,
    cateTypeItems: [],    //菜品分类
    productItems: [],     //菜品
    carts:[],
    indexId: 0,
    winHeight: 0,
    PayList: [],
    cart: false,
    bg: false,
    scrollTopId: '',
    curNav: '',
    winHeight: 0,
    heightArr: [],
    forindex: true,
    zindex: 0,
    basePath: app.globalData.api,
    productNumber: 0,
    total: 0,             //购物车中的总金额
    defaultImage:"img/no_image.png"
  },
  onShow: function() {
   
  },
  GoPay(){
    if(this.data.PayList.length== 0){
      wx.showToast({
        title: '你还没有点餐',
        image: '../statc/1.jpg',
        duration: 2000
      })
    }else{

    let l = JSON.stringify(this.data.PayList)
      let p = this.data.Total
    wx.navigateTo({
      url: '/pages/confirm/confirm?PayList='+l+'&pay='+p
    })
    }

  },
  jumpIndex(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    let index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      scrollTopId: id,
      curNav: index
    })
  },
  PayList() {
    this.setData({
      cart: !this.data.cart,
      bg: !this.data.bg
    })
  },
  onScroll(e) {
    var that = this;
    var h = 0;
    var heightArr = [];
    let show = that.data.forindex
    let index = that.data.zindex
    let scrollTop = e.detail.scrollTop
    let scrollArr = that.data.heightArr
    wx.createSelectorQuery().selectAll('.Box1').boundingClientRect(function(rect) { //selectAll会选择所要含有该类名的盒子
    }).exec(function(res) {
      res[0].forEach((item) => {
        h += item.height-100;
        heightArr.push(h);
      })
      that.setData({
        heightArr: heightArr
      })
    });
    for (let i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
        if (show) {
          that.setData({
            curNav: 0,
            forindex: false,
            zindex: 0
          })
          return
        }
      } else if (scrollTop >= (scrollArr[i - 1]) && scrollTop < scrollArr[i]) {
        that.setData({
          curNav: i,
          forindex: true,
          zindex: 1
        })
      }
    }
  },
  clearPayList(list) {
    var that = this
    let aa = that.data.lists.length - 1
    for (var i = 0; i <= aa; i++) {
      let bb = that.data.lists[i].Food.length - 1
      for (var j = 0; j <= bb; j++) {
        that.data.lists[i].Food[j].Number = 0
      }
    }
    that.setData({
      'PayList': [],
      FoodLength: 0,
      Total: 0,
      lists: that.data.lists,
      cart: false,
      bg: false
    });
  },
  //减数量
  RmTotal(e) {
    var that = this
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.lists[parentIndex].Food[index].Number--;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.lists[parentIndex].Food[index].pay;
    var num = this.data.lists[parentIndex].Food[index].Number;
    var name = this.data.lists[parentIndex].Food[index].name;
    var Id = this.data.lists[parentIndex].Food[index].FoodId;
    var obj = {
      pay: price,
      Number: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex,
      FoodId: Id
    };
    var carArray1 = this.data.PayList.filter(item => item.mark != mark)
    carArray1.push(obj)
    this.setData({
      PayList: carArray1,
      lists: this.data.lists
    })
    if (that.data.PayList.length > 1) {
      that.Relist();
    }
    this.calTotalPrice();

  },
  //计算总价
  calTotalPrice() {
    var carArray = this.data.PayList;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].pay * carArray[i].Number;
      totalCount += carArray[i].Number
    }
    this.setData({
      Total: totalPrice,
      FoodLength: totalCount,
    });
  },
  Relist() {
    var that = this
    let aa = that.data.PayList.length - 1
    let flag = false
    for (let i = 0; i < aa; i++) {
      for (let j = aa; j > i; j--) {
        //每次都把最小的元素放在最前面
        if (that.data.PayList[j].Number > that.data.PayList[j - 1].Number) {
          let temp = that.data.PayList[j];
          that.data.PayList[j] = that.data.PayList[j - 1];
          that.data.PayList[j - 1] = temp;
          flag = true;
          that.setData({
            PayList: that.data.PayList
          })
        }
        if (!flag) {
          break;
        }
      }
    }
  },
  //加数量
  AddTotal: function(e) {
    var that = this
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.lists[parentIndex].Food[index].Number++;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.lists[parentIndex].Food[index].pay;
    var num = this.data.lists[parentIndex].Food[index].Number;
    var name = this.data.lists[parentIndex].Food[index].name;
    var Id = this.data.lists[parentIndex].Food[index].FoodId;
    var obj = {
      pay: price,
      Number: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex,
      FoodId: Id
    };
    var carArray1 = this.data.PayList.filter(item => item.mark != mark)
    carArray1.push(obj)
    this.setData({
      PayList: carArray1,
      lists: this.data.lists
    })
    if (that.data.PayList.length > 1) {
      that.Relist();
    }
    this.calTotalPrice();
  },
  onLoad: function(options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '菜单',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#FFFFFF'
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.windowHeight - 200
        });
      }
    });
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
  computeOperation: function () {
    let shoppingCarts = this.data.carts;
    let count = 0;
    shoppingCarts.forEach(elem => {
      let temp = elem.realPrice * elem.num;
      count = count + temp;
    });
    this.setData({ total: count });
  },
  /**
   * 下面购物车增加按钮
   */
  HZL_jia1: function (e){
    let currentId = e.currentTarget.id;
    let shoppingCarts = this.data.carts;
    let currentProduct = shoppingCarts.find(elem => elem.id == currentId);
    let items = this.data.productItems;
    let item = items.find(elem => elem.id == currentId);
    if(currentProduct == null){
      util.httpJson("wx/api/v1/product/" + currentId, result => {
        let product=result.data;
        product.num=1;
        shoppingCarts.push(product);
        item.num = 1;
        app.globalData.carts = shoppingCarts;
        let productNum = this.data.productNumber;
      this.setData({
        carts:shoppingCarts,productNumber:productNum+1,productItems:items
      })
      this.computeOperation();
      }, "GET");
      
    }else{
      currentProduct.num = ++currentProduct.num;
      item.num = ++item.num;
      let productNum = this.data.productNumber;
      this.setData({
        carts:shoppingCarts,productNumber:productNum+1,productItems:items
      })
      this.computeOperation();
    }
  },
  /**
   * 下面购物车减少按钮
   */
  HZL_jian1: function (e){
    let currentId = e.currentTarget.id;
    let shoppingCarts = this.data.carts;
    let items = this.data.productItems;
    let currentProduct = shoppingCarts.find(elem => elem.id == currentId);
    let item = items.find(elem => elem.id == currentId);
    if (currentProduct.num == 1) {
      shoppingCarts.splice(shoppingCarts.findIndex(elem => currentProduct.id == elem.id), 1);
      
    } else {
      currentProduct.num = --currentProduct.num;
    }
    item.num = --item.num;
    let productNum = this.data.productNumber;
    if(productNum == 1){
      this.setData({
        carts:shoppingCarts,HZL_isCat:0,productNumber:productNum -1,productItems:items
      })
    }else{
      this.setData({carts:shoppingCarts,productNumber:productNum -1,productItems:items})
    }
    this.computeOperation();
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
    }else{
      util.httpJson("wx/api/v1/product/" + currentId, result => {
        let product=result.data;
        product.num=1;
        shoppingCarts.push(product);
        let items = this.data.productItems;
        let item = items.find(elem => elem.id == currentId);
        item.num = 1;
        this.setData({
          productItems:items
        })
        app.globalData.carts = shoppingCarts;
        this.computeOperation();
      }, "GET");
    }
    let productNum = this.data.productNumber +1;
    this.setData({productNumber: productNum,carts: shoppingCarts});
  }
})