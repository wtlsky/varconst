/**
 * 整理有道翻译数据 
 * @param {Object} serverData 
 */
function inducationYouDao(serverData) {
  let web = []
  let natural = []
  if (serverData.web) {
    web = serverData.web[0].value
  }
  natural = serverData.translation
  return {
    errorCode: serverData.errorCode,
    web,
    natural
  }
}

/**
 * 转换为小驼峰格式
 * @param {Array} words 
 */
function covertToSmallHump(words = []) {
  let result = []
  words.forEach((word, index) => {
    if (index < 1) {
      // 第一个单词所有字母小写
      result.push(word.toLowerCase())
    } else {
      // 单词首字母大写
      result.push(`${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`)
    }
  })
  return result.join('')
}
/**
 * 转换为大驼峰格式
 * @param {Array} words 
 */
function covertToBigHump(words = []) {
  let result = []
  words.forEach(word => {
    // 单词首字母大写
    result.push(`${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`)
  })
  return result.join('')
}

/**
 * 转换为连字符格式
 * @param {Array} words 
 */
function covertToUnderLine(words = []) {
  let result = []
  words.forEach(word => {
    // 单词首字母大写
    result.push(word.toLowerCase())
  })
  return result.join('_')
}
/**
 * 转换为中划线格式
 * @param {Array} words 
 */
function covertToMiddleLine(words = []) {
  let result = []
  words.forEach(word => {
    // 单词首字母大写
    result.push(word.toLowerCase())
  })
  return result.join('-')
}

/**
 * 转换为常量格式
 * @param {Array} words 
 */
function covertToConst(words = []) {
  let result = []
  words.forEach(word => {
    // 单词首字母大写
    result.push(word.toUpperCase())
  })
  return result.join('_')
}

/**
 * 过滤无效字段
 * @param {String} str 
 */
function translationFilter(str) {
  str = str.replace(/( and | or | the | at | of | was | a )/igu, ' ');
  str = str.replace(/(\s?ing|\s?ed|\s?ly)$/igu, '');
  str = str.replace(/^(the )/igu, '');


  // str = str.replace(/(\s?and\s?|\s?or\s?|\s?the\s?|\s?at\s?|\s?of\s?|\s?a\s?|\s?was\s?)/igu, ' ');
  // str = str.replace(/(\s?ing|\s?ed|\s?ly)$/igu, '');
  return str.split(' ')
}

module.exports = {
  covertToSmallHump,
  covertToBigHump,
  covertToUnderLine,
  covertToConst,
  covertToMiddleLine,
  translationFilter,
  inducationYouDao
}