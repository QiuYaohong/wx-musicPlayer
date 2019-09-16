// pages/gedan/gedan.js
const config = require('../../common/script/config')

const util = require('../../utils/util.js')

const appData = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicData: [],
    count: 30
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.showNavigationBarLoading()

    console.log(options)
    // 排行页面 
    //  歌单
    let id = options.id
    let name = options.name || ""
    let flag = options.flag || ""
    let pic = options.pic || ""

    this.setData({
      id: id,
      name: name,
      pic: pic,
      flag: flag
    })
    //489929
    /**
     *  判断 页面来源  如果 :flag ==>排行
     *                否则 歌单推荐
     * **/
    if (flag) {

      this._bangList(id, 1, this.data.count)
    } else {
      this._playListInfo(id, 1, this.data.count)
    }

  },

  // 获取榜单音乐

  _bangList(id, pn, rn) {
    let that = this
    wx.request({
      url: config.apiList.bangList + `bangId=${id}&pn=${pn}&rn=${rn}`,
      success(res) {
        that.setData({
          musicData: res.data.data
        })
        wx.setNavigationBarTitle({
          //util currentString //截取字符长度
          title: util.currentString(that.data.name, 0, 6)
        })
        // 隐藏加载
        // 
        wx.hideNavigationBarLoading()
      }
    })
  },

  // 获取歌单音乐

  _playListInfo(id, pn, rn) {
    let that = this
    wx.request({
      url: config.apiList.playListInfo + `?pid=${id}&pn=${pn}&rn=${rn}`,
      success(res) {
        // console.log(res)
        that.setData({
          musicData: res.data.data
        })
        // 设置navBar
        wx.setNavigationBarTitle({
          //util currentString //截取字符长度
          title: util.currentString(res.data.data.name, 0, 6)
        })

        // 隐藏加载
        // 
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   *  mv 播放
   * 
   */

  mvPlay(e) {
    console.log(e)
    let rid = e.currentTarget.dataset.rid
    let info = e.currentTarget.dataset.info
    // console.log(rid)
    wx.navigateTo({
      url: `/pages/mv/m-playing/m-playing?id=${rid}&info=${info}`,
    })

  },

  /*
   * 音乐播放
   *
   */
  gotoMusicPlaying(e) {
    console.log(e)
    let rid = e.currentTarget.dataset.rid
    // 全局储存音乐 id
    appData.globalData.musicId = rid

    wx.navigateTo({
      url: '/pages/playing/playing',
    })


  },


  /*
    下载音乐
    显示
  */
  download() {
    wx.showToast({
      title: '下载音乐请前往APP',
      icon: 'none',
      mask: true,
      duration: 1000
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

    let c = this.data.count
    let id = this.data.id

    this.setData({
      count: c += 30
    })

    if (this.data.flag) {
      this._bangList(id, 1, c)
    } else {
      this._playListInfo(id, 1, c)
    }



  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})