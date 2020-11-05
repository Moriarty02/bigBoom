<template>
  <d2-container>
    <template slot="header">
      <div class="module-header">
       <div class="left-box">
         <el-form size="mini" inline>

        <el-form-item label="检索日期">
      <el-row :gutter="20" type="flex" justify="start">
             <el-col :span="11">
              <el-date-picker
                    v-model="queryForm.startTime"
                    type="date"
                    value-format="timestamp"
                    :picker-options="pickerOptions"
                    placeholder="选择日期时间">
                  </el-date-picker>

             </el-col>
             <el-col :span="4" class="line">-</el-col>
             <el-col :span="16">
               <el-date-picker
                  v-model="queryForm.endTime"
                  type="date"
                  value-format="timestamp"
                  :picker-options="pickerOptions"
                  placeholder="选择日期时间">
                </el-date-picker>
             </el-col>
           </el-row>
        </el-form-item>
         <el-form-item label="保管人">
            <el-input v-model="queryForm.keeper" placeholder=""></el-input>
          </el-form-item>
           <el-form-item label="领退人">
            <el-input v-model="queryForm.consumer" placeholder=""></el-input>
          </el-form-item>

          <el-form-item>
          <el-button  @click="getList" type="primary" >查询</el-button>
        </el-form-item>
         </el-form>
       </div>
       <!-- <div class="right-box">
           <el-button  @click="handleAdd" type="primary" size="mini">新增</el-button>
       </div> -->

     </div>
    </template>
    <d2-module>
    <p> 当天库存:{{stock}}</p>
      <div class="table-box">
       <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column            fixed
            prop="id"
            label="id"
            >
          </el-table-column>

            <el-table-column
            prop="displayDate"
            label="日期"
            width="150">
          </el-table-column>

            <el-table-column            prop="operation"
            label="操作"
            >
          </el-table-column>
            <el-table-column
            prop="fixCode"
            label="固定码"
            >
          </el-table-column>
            <el-table-column
            prop="from"
            label="发码起始值"
            width="100"
            >
          </el-table-column>
            <el-table-column
            prop="to"
            label="发码结束值"
            width="100"
            >
          </el-table-column>

           <el-table-column
            prop="keeper"
            label="保管人"
            >
          </el-table-column>
           <el-table-column
            prop="consumer"
            label="领退人"
            >
          </el-table-column>
           <el-table-column
            prop="operator"
            label="操作人"
            >
          </el-table-column>
           <el-table-column
            prop="store"
            label="入库"
            >
          </el-table-column>

           <el-table-column
            prop="send"
            label="发出"
            >
          </el-table-column>

             <el-table-column
            prop="back"
            label="退回"
            >
          </el-table-column>

            <!-- <el-table-column
            prop="consumed"
            label="已消耗"
            >
          </el-table-column> -->
          <!-- <el-table-column            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="primary" size="small">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          :current-page.sync="pager.pageNo"
          :page-size="10"
           @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="pager.total">
        </el-pagination>
      </div>
    </d2-module>
      <el-dialog :title="editTitle" :visible.sync="dialogFormVisible" width="700px">
     <el-form :model="form" label-position="right" >
        <el-form-item label="time" :label-width="formLabelWidth">
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="固定码" :label-width="formLabelWidth">
          <el-input v-model="form.fixCode" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="publicCode" :label-width="formLabelWidth">
          <el-input v-model="form.publicCode" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label=" 重量" :label-width="formLabelWidth">
          <el-input v-model="form.count" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import service from '@/plugin/axios/index'
import util from '@/libs/util'
import api from '@/api'
export default {
  name: 'page1',
  data () {
    return {
      queryForm: {
        startTime: '',
        endTime: '',
        keeper: '',
        consumer: ''
      },
      formLabelWidth: '120px',
      stock: 0,
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 10
      },
      tableData: [

      ],
      form: {
        id: 1,
        time: '',
        name: '',
        fixCode: '',
        publicCode: '',
        count: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      isCreating: false,
      dialogFormVisible: false
    }
  },
  computed: {
    editTitle () {
      return this.isCreating ? '新增' : '编辑' + '信息'
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let params = Object.assign({}, this.queryForm)

      params.pageNo = this.pager.pageNo
      params.pageSize = this.pager.pageSize
      params = util.fixEmptyVal(params)

      const res = await api.DETONATOR_LOG(params)
      if (res) {
        this.tableData = this.fixData(res.records)
        this.stock = res.stock
        this.pager.total = res.total
      }
    },
    fixData (list) {
      if (!list || list.length === 0) return []
      return list.map(it => {
        it.displayDate = util.dateFormat(it.date)
        return it
      })
    },

    handleCurrentChange (val) {
      if (val) {
        this.pager.pageNo = val
      }
      this.getList()
    },
    handleAdd () {
      this.isCreating = true
      this.form = {
        id: 1,
        time: '',
        name: '',
        fixCode: '',
        publicCode: '',
        count: ''
      }
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.isCreating = false
      const data = Object.assign({}, row)
      this.form = Object.assign(this.form, data)
      this.dialogFormVisible = true
    },

    handleDelete (row) {
      const ids = row.id
      let sdata = []
      if (ids.constructor !== Array) {
        sdata = [ids]
      } else {
        sdata = Object.assign([], ids)
      }
      this.$confirm(`此操作将永久删除id为${ids.toString()}的记录, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          service({
            url: '/machine/del',
            method: 'post',
            data: { ids: sdata }
          }).then(res => {
            this.$message.success('删除成功')
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSubmit () {
      this.dialogFormVisible = false
      console.log(this.form)
    }
  }
}
</script>
<style lang="scss" scoped>
.module-header{
  display: flex;
  justify-content: space-between;
}
.line{
  text-align: center;
}
</style>
