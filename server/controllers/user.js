const getFiles = require('../utils/getFiles');

exports.loginPage = async (ctx) => {
    const title = "login"
    await ctx.render('login', {
        title
    })
}

exports.editPage = async (ctx) => {
    const existFiles = getFiles('upload/swiper');
    // console.log(files);
    const title = "edit"
    await ctx.render('edit', {
        title,
        existFiles
    })
}

