<template>
	<div class="menu">
    	<div class="header">
      		<!-- <i class="el-icon-setting"></i> -->
      		<!-- <span>用户管理</span>
      		<i class="el-icon-arrow-right"></i>
      		<span>用户信息管理</span> -->
      		行程单管理
    	</div>
    	<div class="mainContent1">
	      	<div class="inline-block">
	        	<el-form :inline="true" :model="formInline" ref="formInline">
	          		<el-row :gutter="20">
						<el-form-item prop="invoiceNO">
	              			<el-input placeholder="  请输入开票编号" clearable v-model="formInline.invoiceNO" /></el-input>
	            		</el-form-item>
					
						<el-button class="" type="primary" plain round @click="" icon="el-icon-search">查询</el-button>
	          		</el-row>
	        	</el-form>
	        	<div>	    
	        		<!-- 发票详情 -->    		
	        		<template v-if="invoiceInfo.invoiceNo">
	        			<h3 class="invoice-tit">发票基本信息</h3>
		        		<ul class="invoice-info">
		        			<li class="info">
		        				<span class="txt">姓名：</span>
		        				<span class="val">{{invoiceInfo.userName}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">电话：</span>
		        				<span class="val">{{invoiceInfo.phone}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">发票编号：</span>
		        				<span class="val">{{invoiceInfo.invoiceNo}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">发票金额：</span>
		        				<span class="val">{{invoiceInfo.invoiceAmount}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">发票抬头：</span>
		        				<span class="val">{{invoiceInfo.invoiceTitle}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">抬头类型：</span>
		        				<span class="val">{{invoiceInfo.invoiceTitleStyle}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">纳税人识别号：</span>
		        				<span class="val">{{invoiceInfo.invoiceCompanyNO}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">发票状态：</span>
		        				<span class="val">{{invoiceInfo.invoiceStatusName}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">单位地址：</span>
		        				<span class="val">{{invoiceInfo.companyAddress}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">公司电话：</span>
		        				<span class="val">{{invoiceInfo.companyPhone}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">开户银行：</span>
		        				<span class="val">{{invoiceInfo.bank}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">银行账号：</span>
		        				<span class="val">{{invoiceInfo.bankAcount}}</span>
		        			</li>
		        			<li class="info">
		        				<span class="txt">客户邮箱：</span>
		        				<span class="val">{{invoiceInfo.userEmail}}</span>
		        			</li>
		        		</ul>
	        		</template>
	        		<p v-else>查无数据，请检查开票编号是否正确</p>
	        		
	        		<!-- 行程列表 -->
					<template v-if="trips.length">
						<h3 class="trip-tit">行程单记录</h3>
		        		<ul class="trips">
		        			<li class="trip th">
		        				<span class="trip-item">发送时间</span>
		        				<span class="trip-item">收件邮箱</span>
		        				<span class="trip-item">操作人</span>
		        				<span class="trip-item">备注</span>
		        			</li>
		        			<li class="trip" v-for="(item, index) in trips">
		        				<span class="trip-item">{{item.sendTime}}</span>
		        				<span class="trip-item">{{item.sendEmail}}</span>
		        				<span class="trip-item">{{item.operator}}</span>
		        				<span class="trip-item">{{item.remark}}</span>
		        			</li>
		        		</ul>
					</template>

					<!-- invoiceStatus -->
					<div class="btn-send">
						<el-button type="primary" plain round v-if="invoiceInfo.invoiceStatus === 2 || invoiceInfo.invoiceStatus === 3" @click="showTrip">发送行程单</el-button>
					</div>
	        		
	        	</div>
	   		</div>
	    	
    	</div>	


    	<!-- 发送行程 按钮点击后， 弹开确认解除 弹框 -->
	    <el-dialog 
	    	title="确认解除"
		  	:visible.sync="bShowSendTripDialog"
		  	width="30%"
		  	:before-close="closeTripDialog">
				<div class="dialog-body">
					<el-form :model="sentTripForm" ref="sentTripForm" label-width="40px">
						<el-form-item label="备注" prop="reason">
					    	<el-input type="textarea" v-model="sentTripForm.reason" placeholder="备注为必填哦"></el-input>
					  	</el-form-item>
					  	<el-form-item label="邮箱" prop="email">
					    	<el-input type="input" v-model="sentTripForm.email" placeholder="如不输入邮箱，将默认发送到原邮箱"></el-input>
					  	</el-form-item>
					</el-form>
				</div>
		  		<span slot="footer" class="dialog-footer">
		    		<el-button @click="closeTripDialog">取 消</el-button>
		    		<el-button type="primary" @click="goSendTrip">确 定</el-button>
		  		</span>
		</el-dialog>

   
  	</div>
</template>
<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
    import api from '../config';

    @Component
    export default class TripRoute extends Vue{
    	formInline: object = {
    		invoiceNO: ''
    	}
    	// 发票详情信息
    	invoiceInfo: object = {};
    	// 行程单列表 
    	trips: any[] = [];
    	// 发送行程 弹框
    	bShowSendTripDialog: boolean = false;

    	// 发送行程 弹框 里的表单元素
    	sentTripForm: object = {
    		reason: '',
    		email:''
    	}

    	created () {
	    	this.getPageDate();
	    }

	    // 取页面 退款数据
	    getPageDate () {
	    	let sUrl = api.sPath + api.triproute;
	    	this.$http.get(sUrl).then((res: any) => {
	    		this.invoiceInfo = res.data.invoiceInfo;
	    		this.trips = res.data.trips;
	    	});
	    }

	    showTrip () {
	    	this.bShowSendTripDialog = true;
	    }

	    closeTripDialog() {
	    	this.bShowSendTripDialog = false;
	    }

	    goSendTrip () {
	    	this.bShowSendTripDialog = false;
	    }
    }
</script>
<style lang="scss">
	.invoice-tit,
	.trip-tit{
		font-size: 20px;
		font-weight: normal;
		color: #409EFF;
	}
	.tripList {
		
	}
	.invoice-info{
		overflow: hidden;
		list-style: none;
		.info {
			float:left;
			width: 50%;
			padding: 10px 0;
		}
		.txt{
			display: inline-block;
			width: 120px;
			text-align: right;
		}		
		.val {
			display: inline-block;
			width: 200px;
			text-align: left;
		}
	}
	
	.trips {
		list-style: none;
		.trip{
			padding: 14px 0;
			overflow: hidden;
			border-bottom:1px dashed #d2d2d2;
			&.th{
				font-weight: bold;
			}
		}

		.trip-item {
			width: 25%;
			float: left;			
			text-align: center;
		}
	}

	.btn-send{
		text-align:center;
	}
</style>