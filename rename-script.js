const fs = require('node:fs');
const path = require('node:path');

const ot = ['创世记', '出埃及记', '利未记', '民数记', '申命记', '约书亚记', '士师记', '路得记', '撒母耳记上', '撒母耳记下', '列王纪上', '列王纪下', '历代志上', '历代志下', '以斯拉记', '尼希米记', '以斯帖记', '约伯记', '诗篇', '箴言', '传道书', '雅歌', '以赛亚书', '耶利米书', '耶利米哀歌', '以西结书', '但以理书', '何西阿书', '约珥书', '阿摩司书', '俄巴底亚书', '约拿书', '弥迦书', '那鸿书', '哈巴谷书', '西番雅书', '哈该书', '撒迦利亚书', '玛拉基书'];
const nt = ['马太福音', '马可福音', '路加福音', '约翰福音', '使徒行传', '罗马书', '哥林多前书', '哥林多后书', '加拉太书', '以弗所书', '腓立比书', '歌罗西书', '帖撒罗尼迦前书', '帖撒罗尼迦后书', '提摩太前书', '提摩太后书', '提多书', '腓利门书', '希伯来书', '雅各书', '彼得前书', '彼得后书', '约翰一书', '约翰二书', '约翰三书', '犹大书', '启示录'];
const subFolderNames = ["汉语和合本-好牧人", "汉语和合本-磐石版", "汉语和合本-音乐版"];

function addIndexNumber(chapterList, bookName) {
  for (const subFolderName of subFolderNames) {
    for (const chapterName of chapterList) {
      const mp3Path = path.join('./', subFolderName, chapterName);
      const mp3s = fs.readdirSync(mp3Path);
      const oldPath = path.join('./', subFolderName, chapterName);

      for (const mp3 of mp3s) {
        const index = chapterList.indexOf(chapterName) + 1;
        const oldFullPath = path.join('./', subFolderName, chapterName, mp3);
        const newPath = path.join('./', subFolderName, bookName, `${index}-${chapterName}`);
        const newFullPath = path.join('./', subFolderName, bookName, `${index}-${chapterName}`, mp3);

        if (fs.existsSync(oldFullPath)) {
          fs.mkdirSync(newPath, { recursive: true });
          fs.renameSync(oldFullPath, newFullPath);

          // console.log(`The '${oldPath}' exists.`);
          console.log(`Rename ${oldFullPath} to ${newFullPath}`);
        } else {
          console.log(`!!!! The '${oldFullPath}' not exists.`);
        }
      }
    }
  }
}

function cleanup(chapterList) {
  for (const subFolderName of subFolderNames) {
    for (const chapterName of chapterList) {
      const oldPath = path.join('./', subFolderName, chapterName);
      fs.rmdirSync(oldPath, { recursive: true });
    }
  }
}

addIndexNumber(ot, '旧约');
addIndexNumber(nt, '新约');
cleanup(ot);
cleanup(nt);

