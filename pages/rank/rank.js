// pages/rank/rank.js

const config = require('../../common/script/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bangList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showNavigationBarLoading()

    this._bangMenu()

    wx.setNavigationBarTitle({
      //util currentString //截取字符长度
      title: "排行榜"
    })
  },

  /**
   *  跳转歌曲页面
   * 
   * ***/

  gotoSongs(e) {
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    let pic = e.currentTarget.dataset.pic
    let flag = 520
    wx.navigateTo({
      url: '/pages/songs/songs?id=' + id + '&name=' + name + '&pic=' + pic + '&flag=' + flag,
    })
  },

  /**
   * 
   * 排行榜分类
   * 
   * **/
  _bangMenu() {
    let that = this
    wx.request({
      url: config.apiList.bangMenu,
      success(res) {
        wx.hideNavigationBarLoading()
        let r = res.data.data
        // console.log(r)
        // 抽离 数组
        let all = []

        for (var tem in r) {
          var list = r[tem].list
          // console.log(list)
          for (var i = 0; i < list.length; i++) {
            all.push(list[i])
          }
        }


        that.setData({
          bangList: all
        })

      }
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