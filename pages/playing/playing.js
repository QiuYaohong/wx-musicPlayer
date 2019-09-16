// pages/playing/playing.js
const appData = getApp()
const config = require('../../common/script/config.js')

const utils = require('../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    songinfo: [],
    isplay: false,
    playStatus: appData.globalData.playStatus,
    audioIndex: 0,
    progress: appData.globalData.progress,
    duration: appData.globalData.duration,
    audioList: [],
    //显示歌曲列表
    showList: true,
    scrollTop: 0,
    // 当前行
    currentIndex: 0,
    lrc: [], //歌词/时间
    // 歌词时间戳
    storyContent: [],
    //滚动到底部
    isBottom: false,
    // 进入时从歌曲哪部分开始播放
    startTime: appData.globalData.startTime
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let musicId = appData.globalData.musicId

    this._getLink(musicId)
    this._getLrc_info(musicId)

    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    })

  },

  _getLink(id) {
    let that = this
    wx.request({
      url: config.apiList.musicUrl + `&rid=` + appData.globalData.musicId,
      success(res) {
        console.log(res)
        let url = res.data.url

        appData.globalData.audioList = [url]

        that.playMusic()
      }
    })
  },


  /**
   * 
   * 播放音乐
   * 
   * **/

  playMusic() {
    console.log(appData.globalData.audioList)

    let audio = appData.globalData.audioList[appData.globalData.audioIndex];
    let manager = wx.getBackgroundAudioManager();
    manager.title = this.data.songinfo.songName || "歌曲名";
    manager.epname = this.data.songinfo.album || "专辑名称";
    manager.singer = this.data.songinfo.artist || "歌手名";
    manager.coverImgUrl = this.data.songinfo.pic;
    // 设置了 src 之后会自动播放
    manager.src = audio;
    manager.currentTime = 0;

    // 音频开始播放的位置
    manager.startTime = 0

    let that = this;
    manager.onPlay(function() {
      console.log("======onPlay======");
      that.setData({
        playStatus: true
      })
      wx.hideLoading()
      that.countTimeDown(that, manager);
    });
    manager.onPause(function() {
      that.setData({
        playStatus: false
      })
      console.log("======onPause======");
    });
    manager.onEnded(function() {
      //歌曲结束 进行下一曲
      console.log("======onEnded======");
      that.setData({
        playStatus: false
      })
      setTimeout(function() {
        // that.nextMusic();
      }, 1500);
    });

    // 音频更新
    //歌词滚动
    manager.onTimeUpdate(function() {

        let managerTime = manager.currentTime
        managerTime = parseFloat(managerTime)

        // console.log(managerTime)
        //歌词 滚动到底部时不在滚动
        if (!that.data.isBottom) {
          if (that.data.currentIndex >= 6) { //超过6行开始滚动
            that.setData({
              scrollTop: (that.data.currentIndex - 6) * 30
            })
          }
        }
        //
        if (that.data.currentIndex != that.data.storyContent.length - 1) { //
          var j = 0;
          for (var j = that.data.currentIndex; j < that.data.storyContent.length; j++) {
            // 当前时间与前一行，后一行时间作比较， j:代表当前行数
            if (that.data.currentIndex == that.data.storyContent.length - 2) {
              //最后一行只能与前一行时间比较
              if (managerTime > parseFloat(that.data.storyContent[that.data.storyContent.length - 1])) {
                that.setData({
                  currentIndex: that.data.storyContent.length - 1
                })
                return;
              }
            } else {
              if (managerTime > parseFloat(that.data.storyContent[j]) && managerTime < parseFloat(that.data.storyContent[j + 1])) {
                that.setData({
                  currentIndex: j
                })
                return;
              }
            }
          }
        }
      }),
      manager.onWaiting(() => {
        wx.showLoading({
          title: '缓冲中....',
          mask: true
        })
      })
  },

  /***
   * 循环计时
   * 
   * **/
  countTimeDown: function(that, manager, cancel) {
    if (that.data.playStatus) {
      setTimeout(function() {
        if (that.data.playStatus) {
          that.setData({
            progress: Math.ceil(manager.currentTime),
            progressText: that.formatTime(Math.ceil(manager.currentTime)),
            duration: Math.ceil(manager.duration),
            durationText: that.formatTime(Math.ceil(manager.duration))
          })
          that.countTimeDown(that, manager);
        }
      }, 500)
    }
  },
  /**
   * 
   * 播放 切换
   * play or pause
   * 
   * **/

  //播放按钮
  playOrpause: function() {

    let manager = wx.getBackgroundAudioManager()
    if (this.data.playStatus) {
      manager.pause();
    } else {
      manager.play();
    }
  },

  /**
   * 进度条拖动事件
   * **/

  sliderChange: function(e) {
    let manager = wx.getBackgroundAudioManager()
    manager.pause();
    manager.seek(e.detail.value);
    this.setData({
      progressText: this.formatTime(e.detail.value)
    })
    setTimeout(function() {
      manager.play();
    }, 1000);
  },


  /*
  获取歌词
  歌曲信息
  */
  _getLrc_info(id) {
    let that = this
    wx.request({
      url: 'http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=' + id,
      success(res) {
        // console.log(res)
        // 歌曲信息
        let info = res.data.data.songinfo
      
        // 歌词信息
        let lrc = res.data.data.lrclist
        /**
         * 
         *  获取时间
         *  时间数组
         * 
         **/
        let timeArr = []
        for (var temp in lrc) {
          var time = lrc[temp].time
          timeArr.push(time)
        }
        that.setData({
          songinfo: info, // 歌曲信息
          lrc: lrc, // 歌词
          storyContent: timeArr //歌曲时间戳 数组
        })

        /*
         设置nav
          */
        wx.setNavigationBarTitle({
          // title: info.songName + '--' + info.artist
          title: utils.currentString((info.songName + '--' + info.artist), 0, 6)
        })

      }
    })
  },
  /**
   * 
   *  scroll-view 到达底部时 
   *  不再触发歌词滚动
   * 
   *  scrollview 滚到底部
   *  再次触发歌词滚动
   *  
   *      
   * **/
  scrolltolower(e) {
    console.log(e)

    this.setData({
      isBottom: true
    })
    console.log(this.data.isBottom)
  },

  scrolltoupper(e) {
    this.setData({
      isBottom: false
    })
    console.log(this.data.isBottom)
  },


  //格式化时长
  formatTime: function(s) {
    let t = '';
    s = Math.floor(s);
    if (s > -1) {
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    return t;
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
    // 出现全局 音乐控制 
    appData.globalData.isMusicPlay = true
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