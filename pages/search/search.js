// pages/search/search.js
const config = require('../../common/script/config.js')
const appData = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 歌曲 Mv 歌手 专辑
    tagList: ['歌曲', 'MV', '歌手', '专辑'],
    // 关键字
    key: null,
    // 搜索结果 显示隐藏
    isfade: true,
    showIndex: 0,
    //音乐列表
    musicData: [],
    // mv 列表
    mvData: [],
    pn: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._searchKey()
  },

  /*

   改变 tag 索引
   获取不同数据
   searchMusicBykeyWord
   searchMvBykeyWord
   searchArtistBykeyWord
   searchAlbumBykeyWord
  */

  currentIndx(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index

    this.setData({
      showIndex: index
    })
    // 
    let key = this.data.key
    let c = this.data.pn

    switch (index) {
      case 0:
        this._getSongs(key, c, 30)
        break;
      case 1:
        this._getMv(key, c, 30)
        break;
      case 2:
        this._getArtist(key, c, 30)
        break;
      case 3:
        this._getAlbum(key, c, 30)
        break
    }

  },

  // 获取输入框值
  bindinput(e) {
    let key = e.detail.value
    this.setData({
      key: key
    })
  },

  // 搜索

  searchResult() {
    let k = this.data.key
    this.setData({
      isfade: false
    })

    this._getSongs(k, this.data.pn, 30)
  },




  //搜索关键字点击搜索

  searchTag(e) {
    let k = e.currentTarget.dataset.key
    console.log(k)

    this.setData({
      key: k,
      isfade: false
    })

    this._getSongs(k, this.data.pn, 30)
  },

  /**
   * 搜索关键字推荐
   */
  _searchKey() {
    let that = this
    wx.request({
      url: 'http://www.kuwo.cn/api/www/search/searchKey?',
      success(res) {
        // console.log(res)
        that.setData({
          keyList: res.data.data
        })
      }
    })
  },





  /**
   * 获取歌曲
   * 
   * **/

  _getSongs(k, pn, rn) {
    let that = this
    wx.request({
      url: config.apiList.song + `key=${k}&pn=${pn}&rn=${rn}`,
      success(res) {
        // console.log(res)
        that.setData({
          musicData: res.data.data
        })
      }
    })
  },
  /**
   * 获取mv
   * 
   */
  _getMv(k, pn, rn) {
    let that = this
    wx.request({
      url: config.apiList.mv + `key=${k}&pn=${pn}&rn=${rn}`,
      success(res) {
        console.log(res)
        that.setData({
          mvData: res.data.data
        })
      }
    })
  },


  /**
   * 
   *  歌手
   * 
   * **/

  _getArtist(k, pn, rn) {
    let that = this
    wx.request({
      url: config.apiList.artist + `key=${k}&pn=${pn}&rn=${rn}`,
      success(res) {
        console.log(res)

      }
    })
  },

  /**
   * 
   * 获取专辑
   * */

  _getAlbum(k, pn, rn) {
    let that = this
    wx.request({
      url: config.apiList.album + `key=${k}&pn=${pn}&rn=${rn}`,
      success(res) {
        console.log(res)

      }
    })
  },

  /**
   * 
   * mv 播放
   * 
   * */

  mvPlay(e) {
    console.log(e)
    let rid = e.currentTarget.dataset.rid
    let info = e.currentTarget.dataset.info
    // console.log(rid)
    wx.navigateTo({
      url: `/pages/mv/m-playing/m-playing?id=${rid}&info=${info}`,
    })

  },

  /**
   * 
   * 音乐播放
   * 
   * */
  gotoMusicPlaying(e) {
    console.log(e)
    let rid = e.currentTarget.dataset.rid
    console.log(rid)
    appData.globalData.musicId = rid
    wx.navigateTo({
      url: `/pages/playing/playing`,
    })
  },
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
    this.setData({
      count: c += 30
    })

    this._getSongs(this.data.key, 1, this.data.count)
    this._getMv(this.data.key, 1, this.data.count)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})