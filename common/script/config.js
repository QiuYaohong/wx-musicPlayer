/**
 * 
 * api 地址
 * 
 * **/

const apiUrl = "http://www.kuwo.cn/"

module.exports = {

  apiList: {
    // 歌手
    singer: apiUrl + 'api/www/artist/artistInfo',
    playList: apiUrl + 'api/www/playlist/getTagList?loginUid=485455771&loginSid=',
    //歌单推荐
    recommendSongs: apiUrl + "api/www/rcm/index/playlist",
    // 通过歌单id 获取播放列表信息
    playListInfo: apiUrl + 'api/www/playlist/playListInfo',
    // 歌单分类 tag
    playListTag: apiUrl + 'api/www/playlist/getTagList?',
    //获取歌单音乐
    musicList: apiUrl + 'api/pc/classify/playlist/getTagPlayList?',
    // mv 列表
    mvlist: apiUrl + 'api/www/music/mvList?',
    // mv 播放地址
    mvUrl: apiUrl + 'url?',
    // mv 最新评论
    mv_newComment: apiUrl + 'comment?type=get_comment&f=web&&digest=7&&uid=0&prod=newWeb',
    // 音乐播放地址
    musicUrl: apiUrl + 'url?format=mp3&response=url&type=convert_url3&br=128kmp3&from=web&t=1565955130208',
    /*
      搜索
      song
      mv
      singer 
      album
    */
    song: apiUrl + 'api/www/search/searchMusicBykeyWord?',
    mv: apiUrl + 'api/www/search/searchMvBykeyWord?',
    artist: apiUrl + 'api/www/search/searchArtistBykeyWord?',
    album: apiUrl + 'api/www/search/searchAlbumBykeyWord?',
    //排行榜(歌单)
    bangMenu: apiUrl + 'api/www/bang/bang/bangMenu?',
    // 排行榜音乐 bangId pn rn
    bangList: apiUrl + 'api/www/bang/bang/musicList?'

  }
}