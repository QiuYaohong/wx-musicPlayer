const config = require('../../../common/script/config')

// pages/mv/mvList/mvList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvList: [],
    pn: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    this.setData({
      id: id
    })
    this._getMvList(id, this.data.pn, 30)
    //
    wx.setNavigationBarTitle({
      title: options.name,
    })

  },

  _getMvList(id, pn, rn) {

    let that = this
    wx.request({
      url: config.apiList.mvlist + `pid=${id}&pn=${pn}&rn=${rn}`,
      success(res) {
        console.log(res)
        that.setData({
          mvList: res.data.data.mvlist
        })
      }
    })
  },

  // 跳转视频播放页面
  gotoPlay(e) {
    let id = e.currentTarget.dataset.id
    let info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/mv/m-playing/m-playing?id=' + id + '&info=' + info,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let c = this.data.pn

    this.setData({
      pn: c += 1
    })
    this._getMvList(this.data.id, this.data.pn, 30)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})