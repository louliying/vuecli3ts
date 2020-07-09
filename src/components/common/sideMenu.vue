<template>
    <div class="nav">
        <vue-scroll :ops="ops">
            <div class="arrow" @click="setCollapse">
                <div v-if="!isCollapse" class="togo">|||</div>
                <div v-else class="togo">|||</div>
            </div>
            <el-menu :default-openeds="aOpened" :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" :unique-opened="true" :router="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <!--1-->                   
                <!-- <el-menu-item >
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统管理</span>
                </el-menu-item> -->
     
                <el-submenu index="1" >   
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="系统管理">系统管理</span>
                    </template>                
                    <el-menu-item>
                        退款管理
                    </el-menu-item>
                    <el-menu-item>
                        守约单管理
                    </el-menu-item>
                     <el-menu-item>
                        行程单管理
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </vue-scroll>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class SideMenu extends Vue { 
        isCollapse: boolean = false;
        aOpened: object = ['1'];
        ops: object = {
            vuescroll: {},
            scrollPanel: {},
            rail: {},
            bar: {
                background: "#6EC3FC"
            }
        };    
        created () {
            // console.log(JSON.parse(localStorage.getItem("menuList")))
            //    this.getMyAuthMenu();
        }

        setCollapse () {
            this.isCollapse = !this.isCollapse;
        }
    };
</script>

<style scoped>
    .togo {
        color: #fff;
        font-size: 12px;
        line-height: 24px;
        background-color: #4a5064;
        text-align: center;
    }

    .nav {        
        height: 100%;
        box-sizing: border-box;
        background-color: #545c64;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }

    .el-menu {
        border-right: none;
    }

    .arrow {
        line-height: 20px;    
        text-align: right;
        background-color: #fff;
        cursor: pointer;
        box-sizing: border-box;
    }
</style>