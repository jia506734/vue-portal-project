<template>
    <div>
        <div class="header_container">
            <div class="header_left">
                <div>慧城天下</div>
            </div>
            <div class="header_right">
                <span class="header_tiplist">wulongbin-2@16.. </span>
                <span class="header_tiplist">{{ $t('manage.Notify') }}</span>
                <span class="header_tiplist">{{ $t('manage.LogOut') }}</span>
                <!-- <span class="header_tiplist" @click="changeLang">{{ $t('language.name') }}</span> -->
            </div>
        </div>
        <manage-center></manage-center>
    </div>
</template>
<script>
    import manageCenter from "./manageCenter"
    export default {
        data(){
            return{
            }
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
        },
        components:{
            manageCenter,
        },
        methods:{
            changeLang(){
                let locale = this.$i18n.locale
                locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
                // LangStorage.setLang(this.$i18n.locale) //后面会用做切换和将用户习惯存储到本地浏览器
            },
        },
    }
</script>
<style  scoped>
        .header_container{
        height: 50px;
        background-color: #1b1731;
        color: white;
    }
    .header_left{
        float: left; 
        width: calc(20% - 50px);
        margin-top: 15px;
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
        margin-top: 15px;
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
        margin-top: 15px;
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