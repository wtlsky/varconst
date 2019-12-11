const vscode = require("vscode")
const {
  youdaoQuery
} = require('./lib/youdaoAPI')
const {
  covertToSmallHump,
  covertToBigHump,
  covertToUnderLine,
  covertToConst,
  translationFilter
} = require('./lib/utils')

const ACTION_MODULES = {
  'S': covertToSmallHump,
  'B': covertToBigHump,
  'U': covertToUnderLine,
  'C': covertToConst
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "removebang.translate",
    async function () {
      // 载入配置
      const EXT_CONF = vscode.workspace.getConfiguration().get('removebang')

      // 获取用户输入
      let input = vscode.window.createInputBox()
      let inputStr = await vscode.window.showInputBox(input)
      let action = null

      if (!inputStr) {
        return
      }

      if (/:/.test(inputStr)) {
        action = inputStr.split(':')[0].toUpperCase()
        if (!ACTION_MODULES[action]) {
          vscode.window.showErrorMessage('不支持的输出模式')
          return
        }
        inputStr = inputStr.split(':')[1]
      } else {
        action = EXT_CONF.mode[0].toUpperCase()
      }


      // 请求翻译接口
      let res = await youdaoQuery(inputStr)

      // 组合可选结果
      let options = []
      if (Number(res.errorCode) > 0) {
        vscode.window.showErrorMessage('翻译接口异常')
        return
      } else {
        res.natural.forEach((word, index) => {
          console.log(word)
          // 格式化结果
          options.push({
            label: ACTION_MODULES[action](translationFilter(word)),
            description: `结果${index + 1}`
          })
        })
      }

      // 用户选择最终翻译
      let choosed = await vscode.window.showQuickPick(options)

      if (EXT_CONF.copy && choosed) {
        console.log('COPY')
        // 复制到剪切板
        await vscode.env.clipboard.writeText(choosed.label)
      }



      // 将结果写入编辑器
      let editor = vscode.window.activeTextEditor
      if (editor && choosed) {
        editor.edit(editBuilder => {
          editBuilder.insert(editor.selection.anchor, choosed.label)
        })
      }

    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate

module.exports = {
  activate
}