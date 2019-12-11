const $http = require('axios')
const crypto = require('crypto')
const FormData = require('form-data')
const {
  inducationYouDao
} = require('./utils')
// @ts-ignore
const config = require('../config.json')
const {
  APP_ID,
  APP_KEY,
  API_URL
} = config.YOU_DAO

function truncate(q) {
  var len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}

async function query(word, from = 'zh-CHS', to = 'en') {
  let curTime = Math.round(Date.now() / 1000)
  let salt = Date.now()
  let str = `${APP_ID}${truncate(word)}${salt}${curTime}${APP_KEY}`
  let sign = crypto.createHash('sha256').update(str).digest('hex')
  let data = {
    q: word,
    from: from,
    to: to,
    appKey: APP_ID,
    salt: salt,
    sign: sign,
    signType: "v3",
    curtime: curTime
  }
  let form = new FormData()
  for (let key in data) {
    form.append(key, data[key])
  }
  let serverData = await $http.request({
    url: API_URL,
    method: 'get',
    params: data
  })
  return inducationYouDao(serverData.data)
}

module.exports = {
  youdaoQuery: query
}