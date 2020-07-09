let api: any = Object.create(null);
// 读了根目录下env.相应model的配置文件
let env: any = process.env.NODE_ENV;
console.log('env aaa------a:', env);
let sPref: string = process.env.VUE_APP_PRE;
/*let sPref : string = '';
switch (env) {
	case 'uat':
		sPref = 'https://mgtportal-tc-uat.mobje.faw-vw.com';
		break;
	case 'prd':
		sPref = 'https://mgtportal-tc.mobje.faw-vw.com';
		break;
	default:
		sPref = '';
		break;
}*/
api=  {
	sPath: sPref,	
	login: '/api/cruiseuserbasic/w/login', //登陆
    logout: '/api/cruiseuserbasic/w/logout', //退出,

    refund: '/data/refund.js',
    triproute: '/data/tripRoute.js'

};
export default api;