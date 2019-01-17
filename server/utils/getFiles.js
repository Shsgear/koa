const fs = require("fs");
const path = require("path");

/**
 * 从静态资源文件夹中获取文件
 * @param {String} dirPath
 * @returns {Array} allFiles 包含每个文件路径的数组
 */
const getFilesFromStatic = (dirPath) => {
    const absolutePath = path.resolve(__dirname, '../../public', dirPath);
    const allFiles = [];
    const findFiles = (_path) => {
        const dirResult = fs.readdirSync(_path);
        const sortedResult = sortByNumber(dirResult);
        sortedResult.forEach((item) => {
            const innerPath = path.join(_path, item);
            const stat = fs.statSync(innerPath);
            if (stat.isDirectory()) {
                findFiles(innerPath)
            } else {
                allFiles.push({ absolutePath: innerPath, basePath: concatPath(innerPath, dirPath) });
            }
        })
    }
    findFiles(absolutePath);
    return allFiles;
}


/**
 * 
 * @param {Array} array 要排序的数组
 * @returns { Array } 排序后的数组
 */
 const sortByNumber = (array) => {
    array.sort((a, b) => {return a.split('.')[0]-b.split('.')[0]});
    return array;
}

const concatPath = (absolutePath, suffixPath) => {
    const basename = path.basename(absolutePath);
    return path.join('/', suffixPath, basename);
}

module.exports = getFilesFromStatic;


