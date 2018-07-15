<template>
    <div>
        <div class="header_container">
            <div class="header_left">
                <div>探为-开放平台</div>
                <div class="header_left_content">Get优质IT服务，从这里开始</div>
            </div>
            <div class="header_tab">
                <span class="header_tablist" @click="changeTab(0)">{{ $t('manage.HomePage') }}</span>
                <span class="header_tablist" @click="changeTab(1)">{{ $t('manage.ResourceCenter') }}</span>
                <span class="header_tablist" @click="changeTab(2)"> {{ $t('manage.ManageCenter') }}</span>
                <span class="header_tablist" @click="changeTab(3)">{{ $t('manage.DataCenter') }}</span>   
                <span class="header_tablist" @click="changeTab(4)">{{ $t('manage.AcountCenter') }}</span>
            </div>
            <div class="header_right">
                <span class="header_tiplist">wulongbin-2@16.. </span>
                <span class="header_tiplist">{{ $t('manage.Notify') }}</span>
                <span class="header_tiplist">{{ $t('manage.LogOut') }}</span>
                <span class="header_tiplist" @click="changeLang">{{ $t('language.name') }}</span>
            </div>
        </div>
        <first-page v-if="firstShow"></first-page>
        <manage-center v-if="manageShow"></manage-center>
        <data-center v-if="dataShow"></data-center>
        <resource-center v-if="resourceShow"></resource-center>
        <acount-center v-if="acountShow"></acount-center>
    </div>
</template>
<script>
    import firstPage from "./firstPage" 
    import manageCenter from "./manageCenter"
    import resourceCenter from "./resourceCenter"
    import dataCenter from "./dataCenter"
    import acountCenter from "./acountCenter"
    export default {
        data(){
            return{
                manageShow:false,
                dataShow:false,
                resourceShow:false,
                acountShow:false,
                firstShow:true
            }
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
        },
        components:{
            manageCenter,
            resourceCenter,
            dataCenter,
            acountCenter,
            firstPage
        },
        methods:{
            changeLang(){
                let locale = this.$i18n.locale
                locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
                // LangStorage.setLang(this.$i18n.locale) //后面会用做切换和将用户习惯存储到本地浏览器
            },
            changeTab(count){
                switch(count){
                    case 0:
                        this.acountShow=this.resourceShow=this.manageShow=this.dataShow =false;
                        this.firstShow =true
                        break;
                    case 1:
                        this.acountShow=this.firstShow=this.manageShow=this.dataShow =false;
                        this.resourceShow =true
                        break;
                    case 2:
                        this.acountShow=this.firstShow=this.resourceShow=this.dataShow =false;
                        this.manageShow =true
                        break;
                    case 3:
                        this.acountShow=this.firstShow=this.resourceShow=this.manageShow =false,
                        this.dataShow =true
                        break;
                    case 4:
                        this.dataShow=this.firstShow=this.resourceShow=this.manageShow =false,
                        this.acountShow =true
                        break;
                }
            }
        },
    }
</script>
<style  scoped>
        .header_container{
        height: 80px;
        /* background-color: #d2d2d2; */
    }
    .header_left{
        float: left; 
        width: calc(20% - 50px);
        margin-top: 19px;
        margin-left: 50px;
        text-align: left;
    }
    .header_left_content{
        font-size: 13px;
        margin-top: 5px;
    }
    .header_tab{
        float: left; 
        width: 50%;
        margin-top: 19px;
    }
    .header_tablist{
        display: inline-block;
        width: 19%;
        cursor: pointer;
    }
    .header_right{
        float: right; 
        text-align: right;
        width: calc(30% - 50px);
        margin-top: 19px;
        margin-right: 50px;
    }
    .header_tiplist{
        display: inline-block;
        padding-right: 10px;
        cursor: pointer;
    }
    .header_tiplist + .header_tiplist{
        padding-left: 10px;
        border-left: 1px solid #000000;
    }
</style>