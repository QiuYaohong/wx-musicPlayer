const config = require('../../common/script/config')
// pages/gedan/gedan.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    musicList: [],
    pn: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.showNavigationBarLoading()

    // console.log(options)
    let id = options.id
    let name = options.name
    this.setData({
      id: id,
      name: name
    })
    this._getSongs(id, this.data.pn, 30)
    //
    wx.setNavigationBarTitle({
      title: name,
    })

  },

  // 获取歌单
  _getSongs(id, pn, rn) {
    let that = this
    wx.request({
      url: config.apiList.musicList + `?&pn=${pn}&rn=${rn}&id=` + id,
      success(res) {
        wx.hideNavigationBarLoading()
        // console.log(res)
        that.setData({
          musicList: res.data.data.data
        })
      }
    })
  },



  //跳转歌曲页面

  gotoSongs(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/songs/songs?id=' + id,
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
    // 加载更多 
    let id = this.data.id
    let _pn = this.data.pn
    console.log(id, _pn)

    this.setData({
      pn: _pn += 1
    })
    this._getSongs(id, this.data.pn, 30)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})