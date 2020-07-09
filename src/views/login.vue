<template>
    <div class="login">
        <div class="login_bg">
            <div class="sys_name">一汽大众区域管理系统</div>
            <el-form :model="form" ref="form" :rules="rules" label-width="80px">
                <el-form-item label="登录名" prop="loginId">
                    <el-input v-model="form.loginId" @keyup.enter.native="submitForm('form')"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" show-password @keyup.enter.native="submitForm('form')">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')" :loading="islogin" style="width: 100px;">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator';
    const api: any = import('../config');

    @Component
    export default class Login extends Vue {   
        form: Object = {
            loginId: "",
            password: ""
        };
        rules: Object =  {
            loginId: [{
                required: true,
                message: "请输入登录名",
                trigger: "blur"
            }],
            password: [{
                required: true,
                message: "请输入密码",
                trigger: "blur"
            }]
        };
        islogin: boolean =  false;

        submitForm (formName: string): void {      
            let sUrl = api.login;
            let ref: any = this.$refs[formName];
            
            ref.validate((valid: boolean) => {
                if (valid) {
                    this.islogin = true;
                    // 传过来的参数
                    this.$http.post(sUrl, this.form).then((response: any) => {
                        this.islogin = false
                        let data = response.data;
                        if (data.status == "success") {
                            // this.$store.dispatch("goLogin", data.data.token);
                            localStorage.setItem("token", data.data.token);
                           // this.$store.dispatch("goNick", data.data.name);
                            localStorage.setItem("nick", data.data.name);
                            // this.getMyAuthMenu();
                        } else {
                            // this.$message.error(data.msg);
                        }
                    });
                } else {
                    return false;
                }
            });
        };

        
        
    };
</script>

<style scoped>
    .login {
    	position: absolute;
    	left:0;
    	right: 0;
    	top: 0;
    	bottom: 0;
        height: 100%;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #4a5064;
    }

    .login_bg {
        width: 400px;
        height: 260px;
        padding: 20px 30px 10px 10px;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: rgb(255, 255, 255, 0.75);
        /* box-shadow: 10px 10px 5px #888888; */
    }
    
    .sys_name {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: black;
        margin-bottom: 10px;
    }
</style>