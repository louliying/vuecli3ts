<template>
    <div class="my-header">
        <img src="../../assets/images/yiqi.png" style="width:200px" />
        <div class="title">一 汽 - 大 众 </div> 
        <div class="name">          
            <div class="nick">
                <el-dropdown @command="handleCommand" style="margin-bottom: 10px;"> 
                    <span class="el-dropdown-link" style="color: white;">
                        &nbsp;{{nick}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="3">&nbsp;&nbsp;退出&nbsp;&nbsp;</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    const api: any = import('../../config');
    // import api from '../../config';
    // console.log('api 1---------------1:', api);/

    @Component
    export default class Header extends Vue{
        nick: string = '';
        handleCommand (command: number) {
            let sUrl = api.logout;
            if (command ===3) {
                this.$http.delete(sUrl,{})
                    .then((response: any) => {
                        let data = response.data;
                        if (data.status == "success") {
                            localStorage.clear();
                    
                            this.$message.success("退出成功");
                            this.$router.push("/");
                        }

                    });
                }
            }
    };
</script>
<style scoped>
    .my-header {
        height: 100%;
        width: 100%;
        display: flex;
        background-color:#545c64;
        padding: 0;
    }
    .title {
        flex: 1;
        font-size: 20px;
        padding-left: 10px;
        font-weight:800;
        color:#fff;
        line-height: 60px;
    }
    /*  */
    .name {
        width: 150px;
        display: flex;
    }
    .userImg {
        height: 30px;
        width: 30px;
          
        margin-top: 10px;
    }
    .nick {
        flex: 1;
        line-height: 60px;
    }
    .el-dropdown {
        vertical-align: center;
    }

    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .nick {
        text-align: right;
        padding-right: 20px;
    }
</style>