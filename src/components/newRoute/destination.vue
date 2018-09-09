<template>
     <div>
        <el-row>
            <el-col :span="24">
                <!-- <div id="editorElem" style="text-align:left"></div> -->
                <div class="edit_container">
                    <quill-editor v-model="infoForm.a_content"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event)">
                    </quill-editor>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="save">
                <el-button @click="reset">清 空</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from "axios"
export default{
        data(){
            return{
                editorContent:'',
                editorOption:{},
                routeEditType:'',
                infoForm: {
                    a_title: '',
                    a_source: '',
                    a_content:'',
                    editorOption: {}
                }
            }
        },
        components: {
            //使用编辑器
            quillEditor,
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        created(){
            this.getEdit()
        },
        methods:{
            getEdit(){
                let _this = this
                axios
                .get("http://www.hctx365.cn/line/image?lineId="+this.$route.query.lineId).then(res=>{
                    if(res.data.data&&res.data.data.length>0){
                        _this.infoForm.a_content = res.data.data?res.data.data[0].imageDesc:'';
                    }
                })
            },
            onEditorReady(editor) {
            },
            save(){
                if(this.infoForm.a_content ==""){
                    this.$notify({                     
                        duration:2000,
                        message: "请添加简介",
                        type: 'warning'
                    });
                    return false;
                }
                debugger
                let _this = this;
                let params = [{
                    lineId:this.$store.state.lineId,
                    imageDesc:this.infoForm.a_content
                }]
                axios
                .post("http://www.hctx365.cn/line/image",params)
                .then(res=>{
                    if(res.data.success){
                         _this.$notify({                     
                            duration:2000,
                            message: res.data.message,
                            type: 'success'
                        });
                    }
                })
            },
            reset(){
                this.infoForm = {
                    a_title: '',
                    a_source: '',
                    a_content:'',
                    editorOption: {}
                }
            }
        },
    }   
</script>
<style scoped> 
    .ql-snow .ql-editor img {
        max-width: 480px;
    }
    .ql-editor .ql-video {
        max-width: 480px;
    }
    .save{
        text-align: center;
    }
    .save button{
        margin: 10px 20px 20px 0;
    }
</style>