module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			options: {
				banner: "/*\n powered By weixin-spa(https://github.com/start940315/weixin-spa).\nestablished by <% pkg.author %>\n */\n",
				mangle: true
			},
			src: ["www/resource/js/*.js"],
			dest: "www/qiniu/js"
		},
		jshint: {
			src: ["www/**.js", "App/**.js"]
		},
		cssmin: {
			options: {
				banner: "/*\n powered By weixin-spa(https://github.com/start940315/weixin-spa).\nestablished by <% pkg.author %>\n */\n",
				keepSpecialComments: 0
			},
			src: ["www/resource/css/*.css"],
			dest: "www/qiniu/css"
		},
		tinypng: {
			options: {
				apiKey: "", // Your tinypng.org's apiKey goes here. You can apply your own key with your account for free.
				checkSigs: true,
				sigFile: "www/resource/img-row/sig.json",
				summarize: true,
				stopOnImageError: false
			},
			src: ["www/resource/img-row"],
			dest: ["www/resource/img"]
		},
		// Find how to config qiniu's uploader on https://github.com/qiu8310/grunt-deploy-asset
		deployAsset: {
		    options: {
		      uploader: 'qiniu', // 目前只支持 七牛
		      qiniu: { //七牛相关的配置
		        accessKey: "",  // Your qiniu's access key goes here
		        secretKey: "",  // Your qiniu's secret key goes here
		        bucket: "",		// Your qiniu's bucket name goes here
		        baseDomain: "", // 七牛默认的域名解析失败，结果所有文件访问不了，加这个新属性来配置使用指定的七牛的域名
		      },
		      uploadCSS: true,
		      uploadJS: true,
		      uploadHTML: false,
		      deleteUploaded: false,
		      ignoreAssetNotExist: false,  // 0.0.3添加参数，是否忽略资源不存在时的警告信息
		      ignoreUploadAssets: [],  // 0.0.3添加参数，指定不要上传的文件
		      assetMapJsonFile: null, // 0.0.3添加参数，生成文件映射关系存放在本地
		      mapUpload: true, // 0.0.4添加， 指定上传文件的名称， src => dest 的形式部署，部署后文件的名称为 dest
		      overwrite: true, // 0.0.4添加， 有同名文件是否覆盖
		      dry: false // 只显示操作结果，不实际上传文件或删除文件
		    },
		    yourTarget: {
		    	src: ["./qiniu/js/*.js", "./qiniu/css/*.css"]
		      // Target-specific file lists and/or options go here.
		      // Target 中只要指定你要处理的 HTML、CSS 文件即可，其它静态文件都可以通过这两类文件索引到，索引不到的不会上传，有索引，但文件不存在的会出 warning 提醒
		    }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-tinypng');
	grunt.loadNpmTasks('grunt-deploy-asset');
	grunt.registerTask('default', ['jshint' ,'uglify', "cssmin", "tinypng", "deployAsset"]);
};
