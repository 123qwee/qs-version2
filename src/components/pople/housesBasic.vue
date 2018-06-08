<template>
    <div>
        <div style="font-size: 16px;margin-bottom: 12px; margin-top:12px;font-size: 18px;color: #2d2f33;">
            <span>房屋所属人</span>
        </div>
        <div class="row-border">
            <el-table :data="tableData" height="240" border style="width: 100%;margin-bottom:20px" >
                <el-table-column prop="name" label="姓名" width="200"></el-table-column>
                <el-table-column prop="cardNumber" label="证件号码"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="联系方式"  width="300"></el-table-column>
                <el-table-column prop="nowLiveAddress" label="现住地址" width="600"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {
    
        HappyScroll
    
    } from "vue-happy-scroll";
    
    import service from "./pople_service.js";
    
    export default {
    
        components: {
    
            HappyScroll
    
        },
    
        props: {
    
            ownerView: {
    
                type: Array
    
            }
    
        },
    
        data() {
    
            return {
                tableData:this.ownerView
            };
    
        },
    
        watch: {},
    
        mounted() {},
    
        created() {},
    
        methods: {
            
        }
    
    };
</script>