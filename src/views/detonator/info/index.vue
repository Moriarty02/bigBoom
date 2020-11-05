<template>
  <d2-container>
    <template slot="header">
      <div class="module-header">
       <div class="left-box">
        <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
          <el-form-item label="固定码">
            <el-input v-model="formInline.fixCode" placeholder=""></el-input>
          </el-form-item>

          <!-- <el-form-item label="子码">
            <el-input v-model="formInline.childCode" placeholder=""></el-input>
          </el-form-item> -->

          <el-form-item label="子码范围">
            <el-row>
               <el-col :span="8"><el-input  v-model="formInline.from" placeholder=""></el-input></el-col>
            <el-col :span="4" class="ta-c">-</el-col>
            <el-col :span="8"><el-input  v-model="formInline.to" placeholder=""></el-input></el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="formInline.status" clearable placeholder="状态">
              <el-option
              v-for="(item,key) in statusOptions"
              :key="key"
              :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="保管人">
            <el-input v-model="formInline.keeper" placeholder=""></el-input>
          </el-form-item>
           <el-form-item label="领退人">
            <el-input v-model="formInline.consumer" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="hadndleSearch">查询</el-button>
          </el-form-item>
        </el-form>
       </div>
       <div class="right-box">
          <el-button  @click="handleAdd" type="primary" size="mini">批量操作</el-button>
       </div>

     </div>
    </template>
    <d2-module>
      <div class="table-box">
       <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          height="500">
          <el-table-column
            fixed
            prop="id"
            label="id"
            width="100">
          </el-table-column>
            <el-table-column

            label="固定码"
            prop="fixCode"
            width="100">
          </el-table-column>
            <el-table-column

            prop="childCode"
            label="子码"
            width="100">
          </el-table-column>

            <el-table-column
            prop="displayStoreTime"
            label="入库时间"
            width="160">
          </el-table-column>
            <el-table-column

            prop="displaySendTime"
            label="发出时间"
            width="160">
          </el-table-column>
            <el-table-column

            prop="displayBackTime"
            label="归还时间"
            width="160">
          </el-table-column>
           <!-- <el-table-column

            prop="displayUseTime"
            label="使用时间"
            width="160">
          </el-table-column> -->
             <el-table-column
            prop="keeper"
            label="保管人"
            width="100">
          </el-table-column>
           <el-table-column

            prop="consumer"
            label="领退人"
            width="100">
          </el-table-column>
           <el-table-column
            prop="status"
            label="状态"
            clearable
            width="100">
             <template slot-scope="scope">

          <el-tag type="success" v-if="scope.row.status === 1">
            入库
          </el-tag>
          <el-tag type="success" v-if="scope.row.status === 2">
            发出
          </el-tag>
          <el-tag type="success" v-if="scope.row.status === 3">
            退还
          </el-tag>
           <el-tag type="success" v-if="scope.row.status === 4">
            已使用
          </el-tag>
             </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
              <!-- <el-button @click="handleDelete(scope.row)" type="primary" size="small">删除</el-button> -->
            </template>
          </el-table-column>
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
    <el-dialog title="批量操作" :visible.sync="dialogBatchFormVisible" width="700px">
     <el-form :model="batchForm" size="mini" label-position="right">
       <!-- <el-form-item label="日期" >
           <el-date-picker
                v-model="batchForm.date"
                type="date"
                value-format="timestamp"
                :picker-options="pickerOptions"
                placeholder="选择日期时间">
              </el-date-picker>
       </el-form-item> -->
       <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
                v-model="batchForm.date"
                type="date"
                value-format="timestamp"
                :picker-options="pickerOptions"
                placeholder="选择日期时间">
              </el-date-picker>
        </el-form-item>
        <el-form-item label="操作类型" :label-width="formLabelWidth">
           <el-select v-model="batchForm.optType" placeholder="请选择">
            <el-option v-for="(option,index) in batchStatusOptions"
            :key="index"
            :label="option.label"
            :value="option.value"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item
           label="固定码" :label-width="formLabelWidth">
         <el-col :span="10">
            <el-input
          v-model="batchForm.fixCode" autocomplete="off"></el-input>
         </el-col>
        </el-form-item>
          <el-form-item label="发码1"
          :label-width="formLabelWidth">
          <el-row>
            <el-col :span="8">
              <el-input
           v-model="batchForm.from1" autocomplete="off"></el-input>
            </el-col>
            <el-col :span='2' class="ta-c">-</el-col>
            <el-col :span="8">
              <el-input
           v-model="batchForm.to1" autocomplete="off"></el-input>
            </el-col>
          </el-row>

        </el-form-item>
          <el-form-item label="发码2"
          :label-width="formLabelWidth">
          <el-row>
            <el-col :span="8">
              <el-input
           v-model="batchForm.from2" autocomplete="off"></el-input>
            </el-col>
            <el-col :span='2' class="ta-c">-</el-col>
            <el-col :span="8">
              <el-input
           v-model="batchForm.to2" autocomplete="off"></el-input>
            </el-col>
          </el-row>

        </el-form-item>
          <el-form-item label="发码3"
          :label-width="formLabelWidth">
          <el-row>
            <el-col :span="8">
              <el-input
           v-model="batchForm.from3" autocomplete="off"></el-input>
            </el-col>
            <el-col :span='2' class="ta-c">-</el-col>
            <el-col :span="8">
              <el-input
           v-model="batchForm.to3" autocomplete="off"></el-input>
            </el-col>
          </el-row>

        </el-form-item>
         <el-form-item label="保管人" :label-width="formLabelWidth">
            <el-col :span="10">
                <el-input
              v-model="batchForm.keeper" autocomplete="off"></el-input>
            </el-col>

        </el-form-item>
        <el-form-item label="领退人" :label-width="formLabelWidth">
           <el-col :span="10">
                <el-input
              v-model="batchForm.consumer" autocomplete="off"></el-input>
            </el-col>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBatchFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBatchSubmit">确 定</el-button>
      </div>
    </el-dialog>
      <el-dialog :title="editTitle" :visible.sync="dialogFormVisible" width="700px">
     <el-form :model="editForm" size="mini" label-position="right" >

          <el-form-item label="固定码" :label-width="formLabelWidth">
          <el-input v-model="editForm.fixCode" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item
           label="发码" :label-width="formLabelWidth">
          <el-input
          v-model="editForm.childCode" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="入库时间" :label-width="formLabelWidth">
           <el-date-picker
            v-model="editForm.storeTime"
            type="date"
            value-format="timestamp"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="发出时间" :label-width="formLabelWidth">
           <el-date-picker
            v-model="editForm.sendTime"
            type="date"
            value-format="timestamp"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退回时间" :label-width="formLabelWidth">
           <el-date-picker
            v-model="editForm.backTime"
            type="date"
            value-format="timestamp"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="使用时间" :label-width="formLabelWidth">
           <el-date-picker
            v-model="editForm.useTime"
            type="date"
            value-format="timestamp"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

         <el-form-item label="保管人" :label-width="formLabelWidth">
          <el-input v-model="editForm.keeper" autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item label="领退人" :label-width="formLabelWidth">
          <el-input v-model="editForm.consumer" autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item label="状态" clearable :label-width="formLabelWidth">
           <el-select v-model="editForm.status" placeholder="请选择">
            <el-option v-for="(option,index) in statusOptions"
            :key="index"
            :label="option.label"
            :value="option.value"></el-option>
          </el-select>
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
      query: {
        queryKey: 'fixCode',
        queryValue: '',
        queryValue2: ''
      },
      formInline: {
        fixCode: '',
        childCode: '',
        from: '',
        to: '',
        status: '',
        keepe: '',
        consumer: ''
      },
      batchForm: {
        date: '',
        optType: '',
        fixCode: '',
        from1: '',
        to1: '',
        from2: '',
        to2: '',
        from3: '',
        to3: '',
        keeper: '',
        consumer: ''
      },
      formLabelWidth: '120px',
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 10
      },
      searchOptions: [
        {
          label: '固定码',
          value: 'fixCode'
        },
        {
          label: '子码',
          value: 'childCode'
        }, {
          label: '状态',
          value: 'status'
        },
        {
          label: '子码区间',
          value: 'fromTo'
        }
      ],
      types: [
        {
          label: '0.5kg/柱',
          value: 0
        },
        {
          label: '1kg/柱',
          value: 1
        },
        {
          label: '2kg/柱',
          value: 2
        }
      ],
      statusOptions: [
        {
          label: '入库',
          value: 1
        },
        {
          label: '发出',
          value: 2
        },
        {
          label: '退回',
          value: 3
        },
        {
          label: '已使用',
          value: 4
        }
      ],
      batchStatusOptions: [
        {
          label: '入库',
          value: 1
        },
        {
          label: '发出',
          value: 2
        },
        {
          label: '退回',
          value: 3
        }
      ],
      tableData: [],
      editForm: {
        id: '',
        fixCode: 0,
        childCode: 0,
        storeTime: '',
        sendTime: '',
        backTime: '',
        useTime: '',
        status: '',
        keeper: '',
        consumer: ''
      },
      isCreating: false,
      dialogFormVisible: false,
      dialogBatchFormVisible: false,
      pickerOptions: {
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
      }
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
      let params = {}
      params = Object.assign({}, this.formInline)
      params.pageNo = this.pager.pageNo
      params.pageSize = this.pager.pageSize
      const res = await api.DETONATOR_LIST(params)
      if (res) {
        this.pager.total = res.total
        this.tableData = this.fixData(res.leiGuanList)
      }
      // this.getList(params)
    },
    fixData (list) {
      if ((!list) || list.length === 0) return []
      return list.map(it => {
        // it.useTime = it.useTime || ''
        it.displayStoreTime = util.dateFormat(it.storeTime)
        it.displaySendTime = util.dateFormat(it.sendTime)
        it.displayBackTime = util.dateFormat(it.backTime)
        it.displayUseTime = util.dateFormat(it.useTime)

        return it
      })
    },
    hadndleSearch () {
      this.getList()
    },
    // handleSearchSelect (val) {
    //   this.query.queryValue = ''
    //   this.query.queryValue2 = ''
    // },
    handleCurrentChange (val) {
      if (val) {
        this.pager.pageNo = val
      }
      this.getList()
    },
    handleAdd () {
      this.isCreating = true
      this.batchForm = {
        optType: '',
        batchNum: '',
        boxFrom: '',
        boxTo: '',
        type: '',
        colFrom: '',
        colTo: '',
        keeper: '',
        consumer: ''

      }
      this.dialogBatchFormVisible = true
    },
    handleEdit (row) {
      this.isCreating = false
      const data = Object.assign({}, row)
      this.form = Object.assign(this.editForm, data)
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
    async handleSubmit () {
      const sdata = Object.assign({}, this.editForm)
      const res = await api.DETONATOR_UPDATE(sdata)
      if (res && res >= 0) {
        this.$message.success('操作成功')
        this.dialogFormVisible = false
      } else {
        this.$message.error('操作失败')
      }
    },
    async handleBatchSubmit () {
      const sdata = Object.assign({}, this.batchForm)
      const res = await api.DETONATOR_BATCH(sdata)
      if (res && res >= 0) {
        this.$message.success('批量操作成功')
        this.dialogBatchFormVisible = false
      } else {
        this.$message.error('批量操作失败')
      }
    },
    getToday () {
      const date = +new Date()
      return date % (60 * 60 * 1000 * 24)
    }
  }
}
</script>
<style lang="scss" scoped>
.module-header{
  display: flex;
  justify-content: space-between;
}
.ta-c{
  text-align: center;
}
</style>
