/*
 * @description: 
 * @Author: ljc
 * @Date: 2020-09-26 10:58:09
 * @LastEditors: ljc
 * @LastEditTime: 2020-10-28 09:49:08
 */
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7001",
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api':'/api'
        }
      },
    },
  },
  //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  //zhengkai.blog.csdn.net
  runtimeCompiler: true,
};