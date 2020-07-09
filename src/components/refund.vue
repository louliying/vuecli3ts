<template>
	<div class="menu">
    	<div class="header">
      		<!-- <i class="el-icon-setting"></i> -->
      		<!-- <span>用户管理</span>
      		<i class="el-icon-arrow-right"></i>
      		<span>用户信息管理</span> -->
      		退款管理
    	</div>
    	<div class="mainContent1">
	      	<div class="inline-block">
	        	<el-form :inline="true" :model="formInline" ref="formInline">
	          		<el-row :gutter="20">
						<el-form-item class="formItem" prop="payNo" style="width:200px;">
	              			<el-input placeholder="请输入支付流水号" clearable v-model="formInline.payNo" /></el-input>
	            		</el-form-item>
						<el-form-item class="formItem" prop="orderPayNo" style="width:200px;">
	              			<el-input placeholder="请输入订单号/支付号" clearable v-model="formInline.orderPayNo" /></el-input>
	            		</el-form-item>
	            		<el-form-item class="formItem" prop="userName" style="width:200px;">
	              			<el-input placeholder="请输入用户姓名" clearable v-model="formInline.userName" /></el-input>
	            		</el-form-item>
	            		<el-form-item class="formItem" prop="phone" style="width:200px;">
	              			<el-input placeholder="请输入用户手机号" clearable v-model="formInline.phone" /></el-input>
	            		</el-form-item>
	            		<el-form-item class="formItem" style="margin-left:10px; width:100px;" prop="status">
	              			<el-select v-model="formInline.status" clearable placeholder="请选择状态" @change="">
	              				<el-option label="已支付" value="1"> </el-option>
	                			<el-option label="退款中" value="2"> </el-option>
	                			<el-option label="已退款" value="3"> </el-option>
	                			<!-- <el-option v-for="item in branList" :key="item.brandNo" :label="item.brandName" :value="item.brandNo">
	                			</el-option> -->
	              			</el-select>
	            		</el-form-item>
	            		<el-form-item class="formItem" style="margin-left:10px;width:140px;" prop="style">
	              			<el-select v-model="formInline.style" clearable placeholder="请选择业务类型" @change="">
	              				<el-option label="分时押金" value="1"> </el-option>
	                			<el-option label="分时订单" value="2"> </el-option>
	              			</el-select>
	            		</el-form-item>

	          		</el-row>
	          		<el-row :gutter="40">
	            		<el-form-item class="formItem" style="margin-left:10px; width:100px;" prop="payMethods">
	              			<el-select v-model="formInline.payMethods" clearable placeholder="请选择支付平台" @change="">
	              				<el-option label="微信" value="1"> </el-option>
	                			<el-option label="支付宝" value="2"> </el-option>
	                			<el-option label="银联" value="3"></el-option>
	              			</el-select>
	            		</el-form-item>
	            		<el-button class="" type="primary" plain round @click="" icon="el-icon-search">查询</el-button>
	            		<el-button class="" type="info" plain round @click="resetFilter()">清空条件</el-button>

	            		<el-button class="floatr" type="primary" round @click="showRefundDialog">退款</el-button>
	          		</el-row>
	        	</el-form>
	   		</div>
	    	<div>
	        	<el-table :data="refundData"  border style="width: 100%" ref='refundForm' @row-click="selectRow" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @select='selectHandle'>
	          		<el-table-column type="selection" width="50" :selectable='isCanCheckedFn' disabled='true'>
	          			
	          		</el-table-column>
	          		<el-table-column prop="payNo" label="支付流水号"></el-table-column>
	          		<el-table-column prop="orderPayNo" label="订单号/支付号"> </el-table-column>
	          		<el-table-column prop="businessType" label="业务类型"></el-table-column>
	          		<el-table-column prop="exchangeType" label="交易变动类型"></el-table-column>
	          		<el-table-column prop="payMethods" label="支付平台"></el-table-column>
	          		<el-table-column prop="fee" label="金额"></el-table-column>
	          		<el-table-column prop="exchangeDate" label="交易时间"></el-table-column>
	          		<el-table-column prop="userName" label="用户姓名"></el-table-column>
	          		<el-table-column prop="phone" label="用户手机号"></el-table-column>
	          		<el-table-column prop="status" label="状态">
	          			<template slot-scope="scope">
	          				<!-- scope.row.date -->
	          				<template v-if="scope.row.statusType === 1 ">{{scope.row.status}}</template>
	          				<template v-else>
	          					<a href="javascript:;" @click="showRefundStatus">{{scope.row.status}}</a>
	          				</template>
	          			</template>
	          		</el-table-column>

	          		
	          		<!-- <el-table-column label="操作" fixed="right" min-width="180">
	          			            		<template slot-scope="scope">
	          			              			<el-button @click="deleteditPass('start',scope.row)" type="primary" size="mini" v-if="!scope.row.status">启用</el-button>
	          			              			<el-button @click="deleteditPass('stop',scope.row)" type="primary" size="mini" v-if="scope.row.status">禁用</el-button>
	          			              			<el-button @click="AddInfo(scope.row)" type="primary" size="mini">修改</el-button>
	          			              			<el-button @click="details(scope.row.id)" type="primary" size="mini">查看</el-button>
	          			            		</template>
	          		</el-table-column> -->
	        	</el-table>
	      	</div>
	      	<div class="page">
		    	<el-pagination background @size-change="" @current-change=""
	          :current-page="formInline.current" :page-sizes="[10, 20, 50, 100]" :page-size="formInline.size"
	          layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
	      	</div>
    	</div>
	   
	    <!-- 确认退款 弹框 -->
	    <el-dialog 
	    	title="确认退款"
		  	:visible.sync="dialogRefundVisible"
		  	width="30%"
		  	:before-close="closeRefundDialog">
				<div class="dialog-body">
					<el-form :model="refundForm" ref="refundForm" label-width="40px">
						<el-form-item label="备注" prop="reason">
					    	<el-input type="textarea" v-model="refundForm.reason"></el-input>
					  	</el-form-item>
					</el-form>
				</div>
		  		<span slot="footer" class="dialog-footer">
		    		<el-button @click="closeRefundDialog">取 消</el-button>
		    		<el-button type="primary" @click="goRefund">确 定</el-button>
		  		</span>
		</el-dialog>


		<el-dialog 
	    	title="退款详情"
		  	:visible.sync="dialogRefundDetail"
		  	width="30%"
		  	:before-close="closeRefundDetail">
				<div class="dialog-body">
					<ul>
						<li>退款号：1234567890</li>
						<li>状态：退款中 </li>
						<li>退回金额：</li>
						<li>退回平台：支付宝/微信/银联</li>
						<li>退回账户：xxxxxxxxxxxxx</li>
						<li>退款时间：yyyy/MM/dd hh:mm:ss</li>
						<li>操作人：xxx</li>
						<li>备注：xxxxxxxxxxxxxxxxxxx</li>
					</ul>
				</div>
		  		<!-- <span slot="footer" class="dialog-footer">
		  				    		<el-button type="primary" @click="clooseRefundDetail">确 定</el-button>
		  		</span> -->
		</el-dialog>
	   
  	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	
	import api from '../config';
    // const api: any = import('../config');

    @Component
  	export default class Refund extends Vue {
  		// 表单数据
  		refundData: any = [];
  		multipleSelection: any = [];
  		aRepeat: any = [];
  		curSelected: boolean = false;
  		curSelectedId: number = -999;
  		fromWholeLineClick: boolean = false;
  		// curClickRow: object = {};
  		curClickRow: any = Object.create(null);
  		bLineClick: boolean = false;

  		// 搜萦element 
  		formInline: object =  {
          	payNo: '',
          	orderPayNo: '',
          	userName: '',
          	phone: '',
          	status: '2',
          	style: '2',
          	payMethods: '1',
          	size: 10,
          	current: 1
        };
        // 退款dialog是否显示
        dialogRefundVisible: boolean = false;
        refundForm: object = {
        	reason: ''
        };
        // 退款详情查看
        dialogRefundDetail: boolean = false;

        total: number = 10;
    
	    created () {

	    	this.getPageDate();
	    }

	    // 取页面 退款数据
	    getPageDate () {
	    	console.log('surl 111:', api.sPath);
	    	let sUrl = api.sPath + api.refund;
	    	console.log('surl 222:', sUrl);
	    	this.$http.get(sUrl).then((res: any) => {
	    		this.aRepeat = setRepreatArr(res.data, this.aRepeat);
	    		this.refundData = filterRefund(res.data, this.aRepeat);
	    	});
	    }

	    // 重置搜索条件
	    resetFilter () {
	    	this.formInline = {
	    			payNo: '',
		          	orderPayNo: '',
		          	userName: '',
		          	phone: '',
		          	status: 0,
		          	style: 0,
		          	payMethods:0,
		          	size: 10,
		          	current: 1
	    	};
	    }

	    // 整行点击事件， 先运行它，再运行handleSelectionChange
	    selectRow (row: any) {	
	    	this.curSelectedId = row.id;
	    	this.fromWholeLineClick = true;
	    	this.curClickRow = row;	    	

	    	let dForm: any = this.$refs['refundForm'];
	    	dForm.toggleRowSelection(row);

	    }
	    // 点击第一列checkbox选中后, 整行点击是不会进来这里的。 
	    // 第一列checkbox单击，先运行它，再运行handleSelectionChange
	    selectHandle (rows:  any[], row: any) {
	    	let selected: boolean = false;
	    	if (rows.length) {
	    		// true就是选中，0或者false是取消选中	    
	    		if (rows.indexOf(row) > -1) {
	    			selected = true;
	    		} 
	    	}		
	    	this.curSelected = selected;
	    	this.curSelectedId = row.id;
	    	
	    }
	    // 单行点击， 点击单选的checkbox都会进入这个函数
	    handleSelectionChange (rows: any[]) {

	    	let aTemp: any = [];  
	    	let aRepeat: any = this.aRepeat; 		
	   		aTemp = filterRefund(rows, aRepeat);
	   		
   			
	   		this.multipleSelection = rows;	

	   		let curSelectedId: number = this.curSelectedId;
	   		let curSelected: boolean = this.curSelected;
	   		let aRefund: any = this.refundData;
	   		// 来自整行点击，因为它没有选 中还是不选 中
		   	if (this.fromWholeLineClick) {		   			
		   			let row = this.curClickRow;
		   			curSelected = false;
		   			/*let bFlag1 = false;
		   			if (rows.length) {
		   				rows.forEach(item => {
					   		if (item.id === curSelectedId) {
					   			bFlag1 = true;
					   		}
					   	});
		   			} else {

		   			}
				   	if (bFlag1) {
				   		// false为取消， true为选 中
				   		curSelected = true;
				   	} else {
				   		curSelected = false;
				   	}*/
				   	var findRes = rows.find((item: any) => {
				   		return item.id === row.id;				   		
				   	});
				   	if (findRes) {
				   		curSelected = true;
				   	}			    
				   	this.curSelected = curSelected;

				   	// let dForm: any = this.$refs['refundForm'];
			    	let aTemp3: any = [];			    	
			   		aTemp3.push(row);			
			   		aTemp3 = filterRefund(aTemp3, aRepeat);	 
			   		if (curSelected) {
			   			if (!aTemp3[0].isCanChecked && !aTemp3[0].isChecked) {
				   			if (aTemp3[0].isShowTitle) {
				   				// alert('已经是此订单最后一第记录了，不能再退款了1');
				   				this.$message({
         							message: '已经是此订单最后一条流水记录了，不能再退款了哦',
          							type: 'warning'
        						});

				   				let dForm: any = this.$refs['refundForm']; // 获取表格对象
				   				this.bLineClick = true;
				   				
				   				dForm.toggleRowSelection(row, false);
				   				
				   				
				   				return;
				   			} else {
				   				return;
				   			}	   			
				   		}
				    	// dForm.toggleRowSelection(row);
			   		}	
		   	}
	   		
	   		let aTemp2 = [];
	   		if (rows.length) {
	   			if (curSelected) {
		   			rows.forEach((item: any) => {
			   			if (item.id === curSelectedId) {
		   					// item.isChecked = true;
		   					aTemp2 = setRefundArrSelected(aRefund, item.id, true);
		   					aRepeat[item.orderPayNo] -= 1;			   				
			   			}	   			
			   		});
	   			} else {
	   				if (!this.bLineClick) {
	   					aTemp2 =setRefundArrSelected(aRefund, curSelectedId, false);
			   			let orderPayNo = '';
			   			aRefund.forEach((item: any) => {
			   				if (item.id === curSelectedId) {
			   					orderPayNo = item.orderPayNo;
			   				}
			   			})
				   		aRepeat[orderPayNo] += 1;
	   				}
	   			}
	   		} else {
	   			if (!this.bLineClick) {
		   			aTemp2 =setRefundArrSelected(aRefund, curSelectedId, false);
		   			let orderPayNo = '';
		   			aRefund.forEach((item: any) => {
		   				if (item.id === curSelectedId) {
		   					orderPayNo = item.orderPayNo;
		   				}
		   			})
			   		aRepeat[orderPayNo] += 1;
			   	}
	   		}
	   		if (!this.bLineClick) {
		   		aRefund = filterRefund(aTemp2, aRepeat);	
		   		this.refundData = aRefund;
		   	}
		   	
		   	
		   	// 充值这二个值，为了 整行点击用
		  	this.curSelectedId = -9999;
	   		this.curSelected = false;
	   		this.bLineClick = false;
	   		this.fromWholeLineClick = false;
		   	// aRepeat = setRepreatArr(aRefund, aRepeat);
		   	// this.aRepeat = aRepeat;
	    }

	    // 第一列checkbox是否可选 
	    isCanCheckedFn(row: any,index: number){
	    	if (row.isChecked) {
	    		return 1;
	    	} else {
	    		if(row.isCanChecked){
		    		// 可以点击
		        	return 1;
		   		}else {
		   			// >1时
		   			if (row.isShowTitle) {
		   				// alert('已经是此订单最后一第记录了，不能再退款了');
		   				return 0;
		   			}
		   			// 只有一条流水记录时
		        	return 0;
		      	}
	    	}
	    	
	    }
	   	
	   	// 设置不可选行的样式 
	   	tableRowClassName (obj: {row:any, rowIndex:number}) {
	   		let aRepeat: any = this.aRepeat;
	   		let aTemp: any = [];
	   		aTemp.push(obj.row);
	   		aTemp = filterRefund(aTemp, aRepeat);	
	   		if (aTemp[0].isChecked) {
	   			return '';
	   		} else {
	   			if (!aTemp[0].isCanChecked) {
		   			if (aTemp[0].isShowTitle) {
		   				return 'title';
		   			} else {
		   				return 'disabled';	
		   			}	   			
		   		}
		   		return '';
	   		}	   		
	   	}

	   	showRefundDialog () {
	   		this.dialogRefundVisible = true;
	   	}
	   	closeRefundDialog () {
	   		this.dialogRefundVisible = false;
	   	}
	   	// 发送退款申请
	   	goRefund () {
	   		this.dialogRefundVisible = false;
	   	}

	   	// 查看 退款中，已退款的详情
	   	showRefundStatus () {
	   		this.dialogRefundDetail = true;
	   	}
	   	closeRefundDetail () {
	   		this.dialogRefundDetail = false;
	   	}
  	};

  	// 过滤数据，
  	function filterRefund(arr: any[], aRepeat: any) {
  		if (!arr || !arr.length) {
  			return;
  		}  		
  		
  		// 退款中， 已退款， 不能被选 中
  		// 同一个订单号，只有一个流水号时， 此唯一一个流水号不能被选 中
  		arr.forEach((item: any) => {
  			if (item.statusType ===2 || item.statusType === 3) {
  				item.isCanChecked = false;
  				item.isShowTitle = false;
  			} else {
  				// 同一个订单号，有多个流水号时，
  				if (aRepeat[item.orderPayNo] > 1) {
  					item.isCanChecked = true;
  					item.isShowTitle = false;
  				} else{
  					// 同一个订单号，只有 一个流水号时，
  					item.isCanChecked = false;
  					item.isShowTitle = true;
  				}
  				
  			}
  		});
  		return arr;
  	}

  	// 对可选 的数据，进行计数
  	function setRepreatArr (arr: any, aRepeat: any) {
  		arr.forEach((item: any) => {
  			let orderPayNo: string = item.orderPayNo;
  			// 只针对可退款的进行重复计数
  			if (item.statusType === 1 && !item.isChecked) {
  				if (aRepeat[orderPayNo]) {
					aRepeat[orderPayNo]++;
				} else {
					aRepeat[orderPayNo] = 1;
				}
  			}
  		});
  		return aRepeat;
  	}

  	// 让对象数组里的某个元素，改变内容 
  	function setRefundArrSelected (arr: any, id: any, bFlag: boolean) {
  		if (!arr.length) {
  			return;
  		}
  		arr.forEach((item: any) => {
  			if (item.id === id ) {
  				item.isChecked = bFlag;
  			}
  		});
  		return arr;
  	}
</script>

<style>
	.el-table__header-wrapper .el-checkbox{
		display:none
	}
  	.el-table th,
  	.el-table td {
  		/* text-align: center; */
  	}
  	.floatr{
  		float: right;
  	}
  	.page {
  		text-align: center;
  	}
  	.disabled td{
  		cursor: not-allowed;
  	}
  	.title td {

  	}
</style>