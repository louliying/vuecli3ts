1. 安装Vue-cli3
	如果你已经安装过vue-cli2， 请先删除

	npm install -g @vue/cli
2. 创建 项目
	vue create projectName （cli3）
	vue init webpack projectName (cli2)
	
	提示你是要安装它打包好的modules， 还是自选
	自选有： Babel TypeScript  PWA,  Router,  Vues, CSS Pre-processor等
3. 运行项目
	cd projectName
	npm run serve/build  
	默认二个命令

4. 增加element
	vue add element
	会在src下， 生成一个plugins文件+  里面文件的作用是：把element挂载到Vue上，引入element的样式 
	会在src根目录下， 生成 "element-variables.scss", 引入 element的css


5. 调用本机json mock数据
	把mock数据放在public下， URL 直接写"/data/...json"


6. CLI3的新地方：
	基于： webpack 4
	生成的项目， 会多一个.git文件+
	用public代换了static， index.html也移入到publich下，而非在项目根目录下
	基于“0配置”原则， 少了cli2项目的build, config文件+
	提供了vue ui，可视化配置

7. 环境变量和mode
	cli3 有三种mode:  development(vue-cli-service serve), production(vue-cli-service build), test(vue-cli-service test:unit)
	每个mode下， 可以通过命令行里的 --mode 来取相应配置的环境 变量， 所以每个mode下，可以有多种配置
	如： 对development 配置 dev,  uat, prd三种环境配置
	vue-cli-service serve --mode dev    它会读.env.dev里的配置， 会先读.env,再读.env.dev , 再.env.dev.local 三个文件合并后的值
	vue-cli-service serve --mode uat    它会读.env.uat里的配置
	vue-cli-service serve --mode prd    它会读.env.prd里的配置

	在.env的配置文件里， key=value， 请不要加“;”哦， 会被当成值传进去的。












增加element:
用命令： vue add element

function fn(obj: {
	id: number,
	....
}){
	do sth
}