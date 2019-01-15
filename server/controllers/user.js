exports.loginPage = async (ctx) => {
    const title = "login"
    await ctx.render('login', {
        title
    })
}

exports.editPage = async (ctx) => {
    const title = "edit"
    await ctx.render('edit', {
        title
    })
}

