var app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + 'T' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getSerialNumber = function () {
  const now = new Date()
  let month = now.getMonth() + 1
  let day = now.getDate()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 89 + 100)).toString()
}

var httpGet = function (url, callback) {
  http(url, callback);
}
var httpPost = function (url, data, callback) {
  http(url, callback, "POST", data);
}
var httpPut = function (url, data, callback) {
  http(url, callback, "PUT", data);
}
var httpDelete = function (url, callback) {
  http(url, callback, "DELETE");
}

var http = function (url, callback, method, data) {
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: app.globalData.api + url,
    method: !method ? "GET" : method,
    dataType: "json",
    data: !data ? null : data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (response) {
      //console.log(response);
      wx.hideLoading();
      callback(response);
    },
    error: function (response) {
      wx.hideLoading();
      wx.showToast({
        title: '请检查服务器连接状态',
        icon: 'loading',
        duration: 3000
      });
    }
  })
}

var httpJsonPost = function (url, data, callback) {
  httpJson(url, callback, "POST", data);
}

var httpJson = function (url, callback, method, data) {
  wx.request({
    url: app.globalData.api + url,
    method: !method ? "GET" : method,
    dataType: "json",
    data: !data ? null : data,
    header: {
      'content-type': 'application/json'
    },
    success: function (response) {
      callback(response);
    },
    error: function (response) {
      wx.showToast({
        title: '请检查服务器连接状态',
        icon: 'loading',
        duration: 3000
      });
    }
  })
}

var okHttp = function (url, args, done) {
  wx.request({
    method: 'POST',
    url: app.globalData.api + url,
    data: args,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      typeof done == "function" && done(true, res.data)
    },
    fail: function (res) {
      typeof done == "function" && done(false, '请求失败')
    }
  })
}

module.exports = {
  httpGet: httpGet,
  httpPost: httpPost,
  httpPut: httpPut,
  httpDelete: httpDelete,
  formatTime: formatTime,
  http: http,
  okHttp: okHttp,
  httpJsonPost: httpJsonPost,
  httpJson: httpJson,
  getSerialNumber: getSerialNumber
}