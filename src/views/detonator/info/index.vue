<template>
  <d2-container>
    <template slot="header">
      <div class="module-header">
       <div class="left-box">
         <el-form size="mini" inline>
            <el-form-item>
          <el-select v-model="query.queryKey" placeholder="检索字段" @change="handleSearchSelect($event)">
            <el-option v-for="(options,index) in searchOptions"
            :key="index"
            :label='options.label'
            :value='options.value'></el-option>

          </el-select>
        </el-form-item>
        <el-form-item>

          <el-input v-if="this.query.queryKey==='fixCode'||this.query.queryKey==='childCode'" v-model='query.queryValue' placeholder="检索码" />
          <el-select
           v-else-if="this.query.queryKey==='status'"
 v-model="query.queryValue" placeholder="请选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
         <div class="during-box" v-else-if="this.query.queryKey==='fromTo'">
           <el-input width="50" v-model='query.queryValue' placeholder="起始子码" />
           <el-input v-model='query.queryValue2' placeholder="结束子码" />
          </div>
        </el-form-item>
          <el-form-item>
          <el-button  @click="getList" type="primary" >查询</el-button>
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

            prop="fixCode"
            label="fixCode"
            width="100">
          </el-table-column>
            <el-table-column

            prop="childCode"
            label="childCode"
            width="100">
          </el-table-column>
            <el-table-column

            prop="displayStoreTime"
            label="storeTime"
            width="160">
          </el-table-column>
            <el-table-column

            prop="displaySendTime"
            label="sendTime"
            width="160">
          </el-table-column>
            <el-table-column

            prop="displayBackTime"
            label="backTime"
            width="160">
          </el-table-column>
             <el-table-column

            prop="keeper"
            label="keeper"
            width="100">
          </el-table-column>
           <el-table-column

            prop="consumer"
            label="consumer"
            width="100">
          </el-table-column>
           <el-table-column

            prop="status"
            label="status"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <d2-pagination
                marginTop
                :currentPage='pager.pageNo'
                :pageSize='pager.pageSize'
                :total='pager.total'
                @doCurrentChange='handleCurrentChange'>
            </d2-pagination>
      </div>
    </d2-module>
      <el-dialog :title="editTitle" :visible.sync="dialogFormVisible" width="700px">
     <el-form :model="form" label-position="right" >
        <el-form-item label="optType" :label-width="formLabelWidth">
           <el-select v-model="form.optType" placeholder="请选择">
            <el-option v-for="(option,index) in statusOptions"
            :key="index"
            :label="option.label"
            :value="option.value"></el-option>

          </el-select>
        </el-form-item>
          <el-form-item label="固定码" :label-width="formLabelWidth">
          <el-input v-model="form.fixCode" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item
           label="发码起始值" :label-width="formLabelWidth">
          <el-input
           :disabled="fromToDisable"
          v-model="form.from" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="发码终止值"
          :label-width="formLabelWidth">
          <el-input
           :disabled="fromToDisable"
           v-model="form.to" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="保存者" :label-width="formLabelWidth">
          <el-input v-model="form.keeper" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="领退者" :label-width="formLabelWidth">
          <el-input v-model="form.consumer" autocomplete="off"></el-input>
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
      tableData: [],
      form: {
        date: '',
        optType: 1,
        fixCode: '',
        from: '',
        to: '',
        keeper: '',
        consumer: ''
      },
      isCreating: false,
      dialogFormVisible: false,
      fromToDisable: false
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
      const params = {}
      if (this.query.queryKey === 'fromTo') {
        params.from = this.query.queryValue
        params.to = this.query.queryValue2
      } else {
        params[this.query.queryKey] = this.query.queryValue
      }
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
      if (list.length === 0) return []
      return list.map(it => {
        it.displayStoreTime = util.timeFormat(it.storeTime)
        it.displaySendTime = util.timeFormat(it.sendTime)
        it.displayBackTime = util.timeFormat(it.backTime)
        return it
      })
    },
    handleSearchSelect (val) {
      this.query.queryValue = ''
      this.query.queryValue2 = ''
    },
    handleCurrentChange (val) {
      if (val) {
        this.pager.pageNo = val
      }
      this.getList()
    },
    handleAdd () {
      this.isCreating = true
      this.fromToDisable = false
      this.form = {
        optType: 1,
        from: '',
        to: '',
        fixCode: '',
        keeper: '',
        consumer: ''
      }
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.isCreating = false
      const data = Object.assign({}, row)
      data.from = data.childCode
      data.to = data.childCode
      this.fromToDisable = true

      this.form = Object.assign(this.form, data)
      this.dialogFormVisible = true
      console.log(this.fromToDisable)
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
</style>
