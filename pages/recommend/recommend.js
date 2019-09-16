const appData = getApp()
const config = require('../../common/script/config')
const swiper = require('../../common/script/swiperList')
// pages/recommend/recommend.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: swiper.swiperList,
    tags: [{
        id: 137,
        name: '甜蜜'
      },
      {
        id: 393,
        name: '流行'
      },
      {
        id: 621,
        name: '网络'
      },
      {
        id: 180,
        name: '影视'
      },
      {
        id: 1366,
        name: '3D'
      },
      {
        id: 1265,
        name: '经典'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getRecommendSongs()

    wx.setNavigationBarTitle({
      //util currentString //截取字符长度
      title: "推荐"
    })
  },

  /**
   * 歌单推荐
   * */

  _getRecommendSongs() {
    let that = this
    wx.request({
      url: config.apiList.recommendSongs,
      success(res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      }
    })

  },

  gotoSongs(e) { // 跳转歌曲页面
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/songs/songs?id=' + id,
    })
  },
  // 跳转歌单
  gotoGedan(e) {
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    console.log(id)
    wx.navigateTo({
      url: '/pages/gedan/gedan?id=' + id+'&name='+name,
    })
  },

  gotoPlaying(){
    wx.navigateTo({
      url: '/pages/playing/playing',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  
  },  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})