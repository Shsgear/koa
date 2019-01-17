const getFiles = require('../utils/getFiles');

const swiperConfig = require('../../config').swiperConfig;


const rst = getFiles('upload/swiper')
// console.log(rst);
module.exports = async ( ctx ) => {
    const title = 'home';
    
    await ctx.render('index', {
      title,
      rst,
      swiperConfig
    })
  }