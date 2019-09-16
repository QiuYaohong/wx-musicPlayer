// pages/category/category.js
const config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showNavigationBarLoading()

    this._playTagList()

    wx.setNavigationBarTitle({
      title: '分类',
    })
  },

  _playTagList() {
    let that = this
    wx.request({
      url: config.apiList.playListTag,
      success(res) {
        console.log(res)
        let r = res.data.data
        that.setData({
          tagList: r
        })
        wx.hideNavigationBarLoading()
      }
    })
  },


  /**
   * 
   * 跳转至歌单页面
   * 
   * **/
  toGedan(e) {
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    console.log(id, name)
    wx.navigateTo({
      url: '/pages/gedan/gedan?id=' + id + '&name=' + name,
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