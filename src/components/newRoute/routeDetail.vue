<template >
    <div style="margin-left:20px;">        
        <el-row style="margin-top: 20px;">
            <el-col :span="3"><span>线路编辑模式</span></el-col>
            <el-col :span="20">
                <el-radio-group v-model="routeEditType">
                <el-radio label="按天编辑"></el-radio>
                <el-radio label="综合行程"></el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-col :span="3">行程详情</el-col>
            <el-col :span="21">
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
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
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
                },
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
        methods:{
            onEditorReady(editor) {
            },
        }
    }
</script>
<style scoped>
    .quill-editor {
        height: 745px;
    }
    .quill-editor .ql-container {
        height: 680px;
    }    
    .ql-snow .ql-editor img {
        max-width: 480px;
    }

    .ql-editor .ql-video {
        max-width: 480px;
    }
</style>