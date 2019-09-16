const config = require('../../../common/script/config')
// pages/mv/play/play.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvlink: null,
    commentData: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    let count = 30
    this.setData({
      id: id,
      count: count
    })

    this._getMvLink(id)
    //
    this._get_comment(id, 1, this.data.count)
    // 
    wx.setNavigationBarTitle({
      title: options.info,
    })
  },
  screenchange(e) {
    console.log(e)
  },
  _getMvLink(id) {
    let that = this
    wx.request({
      url: config.apiList.mvUrl + `rid=${id}&response=url&format=mp4|mkv&type=convert_url&t=1567434423277`,
      success(res) {
        console.log(res)
        that.setData({
          mvlink: res.data
        })
      }
    })
  },

  /*

    mv 最新评论

  */

  _get_comment(id, pn, rn) {
    let that = this
    wx.request({
      url: config.apiList.mv_newComment + `&page=${pn}&rows=${rn}&sid=${id}`,
      success(res) {
        console.log(res)
        that.setData({
          commentData: res.data
        })
      }
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
    let c = this.data.count
    let id = this.data.id

    this.setData({
      count: c += 30
    })

    this._get_comment(id, 1, c)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})