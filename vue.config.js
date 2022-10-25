const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: "./dist",  
  indexPath: "index.html", 
  transpileDependencies: true,
  lintOnSave:false,
})
