module.exports = {
	configureWebpack: config => {
    	if (process.env.NODE_ENV === 'production') {
      	// 为生产环境修改配置...
    	} else {
      		// 为开发环境修改配置...
      		config.devServer = {
		    	proxy: {
		      		"/api": {
		        		target: process.env.VUE_APP_PROXY, 
		        		changeOrigin: true,
		        		pathRewrite: {
		          			"^/api": ""
		        		}
		      		}
		    	}
		  	}

    	}
  	}	
}