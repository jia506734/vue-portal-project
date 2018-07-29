<template>
    <div>
        <div style="margin-top:15px;">
          <el-table
            :border ='showBorder'
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%" >
             <!-- @selection-change="handleSelectionChange" -->
            <el-table-column
              type="selection"
              width="55"
              style="text-align:center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                  <el-button v-if="type=='my'" size="mini"  
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button v-if="type=='my'" size="mini" type="success" 
                  @click="handleDelete(scope.$index, scope.row)">上架</el-button>
                  <el-button v-if="type=='my'" size="mini" type="danger" 
                  @click="handleDelete(scope.$index, scope.row)">下架</el-button>
                  <el-button v-if="type=='trade'" size="mini" 
                  type="warning" @click="handleDelete(scope.$index, scope.row)">收藏</el-button>
                  <el-button v-if="type=='store'" size="mini"  
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button v-if="type=='store'" size="mini" type="info" 
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  <el-button v-if="type=='store'" size="mini" type="danger" 
                  @click="handleDelete(scope.$index, scope.row)">下架</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="景区"
              width="260">
            </el-table-column>
             <el-table-column
              prop="dateCount"
              label="门票类型"
               width="100">
            </el-table-column>
            <el-table-column
              prop="date"
              label="发布时间"
               width="140">
            </el-table-column>
            <el-table-column
              label="原价"
               width="120">
               <template slot-scope="scope"><span style="text-align: center;">{{ scope.row.charge }}</span></template>>
            </el-table-column>
            <el-table-column
              label="结算价"
               width="120">
               <template slot-scope="scope"><span style="text-align: center;">{{ scope.row.thenCharge }}</span></template>>
            </el-table-column>
            <el-table-column
              label="状态"
               width="120">
               <template slot-scope="scope"><span style="text-align: center;">{{ scope.row.status }}</span></template>>
            </el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script>

export default {
     data(){
    return{
        showBorder:true,
        
      tableData3: [{
          date: '2016-05-03',
          dateCount:'3',
          charge:'120',
          thenCharge:'100',
          name: '哈哈哈，追不上吧，就是这么强大。啦啦啦啦啦啦阿里',
          status: '上架'
        }, {
          date: '2016-05-02',
          dateCount:'3',
          charge:'120',
          thenCharge:'100',
          name: '哈哈哈，追不上吧，就是这么强大。啦啦啦啦啦啦阿里',
          status: '下架'
        }, {
          date: '2016-05-04',
          dateCount:'3',
          charge:'120',
          thenCharge:'100',
          name: '哈哈哈，追不上吧，就是这么强大。啦啦啦啦啦啦阿里',
          status: '上架'
        }, {
          date: '2016-05-01',
          dateCount:'3',
          charge:'120',
          thenCharge:'100',
          name: '哈哈哈，追不上吧，就是这么强大。啦啦啦啦啦啦阿里',
          status: '上架'
        }, {
          date: '2016-05-08',
          dateCount:'3',
          charge:'120',
          thenCharge:'100',
          name: '哈哈哈，追不上吧，就是这么强大。啦啦啦啦啦啦阿里',
          status: '上架'
        }, {
          date: '2016-05-06',
          dateCount:'3',
          charge:'120',
          thenCharge:'100',
          name: '哈哈哈，追不上吧，就是这么强大。啦啦啦啦啦啦阿里',
          status: '下架'
        }, {
          date: '2016-05-07',
          dateCount:'3',
          charge:'120',
          thenCharge:'100',
          name: '哈哈哈，追不上吧，就是这么强大。啦啦啦啦啦啦阿里',
          status: '上架'
        }],
        multipleSelection: []
    }
  },
    props:['type'],
    created(){
    },
    methods:{
        handleEdit(index, row){

        },
        handleDelete(index, row) {
            console.log(index, row);
      }
    },
    watch:{
        // type(){
        //     let aa = this.type;
        // }
    },
}

</script>

<style>
    .el-table th{
        text-align: center !important;
    }
    .el-table .cell{
        text-align: center;
    }
</style>

<style scoped>
    .el-button--mini, .el-button--mini.is-round{
        padding: 5px 9px !important;
    }

</style>



