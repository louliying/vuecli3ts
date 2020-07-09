<template>
    <div class="layout" id="layout">
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <el-aside style="width:auto;">
                <SideMenu />
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>    
    </div>
</template>

<script>
    // @ is an alias to /src
    import SideMenu from '@/components/common/sideMenu.vue';
    import Header from '@/components/common/header.vue';

    export default {
        name: 'Index',
        components: {
            SideMenu,
            Header
        }
    }
   /* @Component({ // 引入子组件 
        components: {
            SideMenu,
            Header
        }
    })*/

</script>

