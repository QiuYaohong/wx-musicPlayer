const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



/*

截取字符串长度

*/

const currentString = (title, start, end) => {
  if (title.length > end) {
    title = title.substring(start, end) + "..."
  }
  return title
}


module.exports = {
  formatTime: formatTime,
  currentString
}
