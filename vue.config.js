module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/": {
        // target: "http://localhost:7001/",
        target: "http://112.74.180.154:7001/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  //zhengkai.blog.csdn.net
  runtimeCompiler: true,
};