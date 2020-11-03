<template>
  <d2-container>
    <template slot="header">
      <div class="module-header">
       <div class="left-box">
         <el-form size="mini" inline>
            <el-form-item>
          <el-select v-model="query.queryKey" placeholder="检索字段" clearable>
            <el-option label='id' value='id'></el-option>
            <el-option label='name' value='name'></el-option>
            <el-option label='time' value='time'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model='query.queryValue' placeholder="检索内容" />
        </el-form-item>
          <el-form-item>
          <el-button  @click="getList" type="primary" >查询</el-button>
        </el-form-item>
         </el-form>
       </div>
       <div class="right-box">
          <el-button  @click="handleAdd" type="primary" size="mini">新增</el-button>
       </div>

     </div>
    </template>
    <d2-module>
      <div class="table-box">
       <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="id"
            width="150">
          </el-table-column>
            <el-table-column
            fixed
            prop="time"
            label="time"
            width="250">
          </el-table-column>
            <el-table-column
            fixed
            prop="name"
            label="name"
            width="150">
          </el-table-column>
            <el-table-column
            fixed
            prop="fixCode"
            label="固定码"
            width="150">
          </el-table-column>
            <el-table-column
            fixed
            prop="publicCode"
            label="publicCode"
            width="150">
          </el-table-column>
            <el-table-column
            fixed
            prop="count"
            label=" 重量"
            width="150">
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

export default {
  name: 'page1',
  data () {
    return {
      query: {
        queryKey: 'id',
        queryValue: ''
      },
      formLabelWidth: '120px',
      pager: {
        pageNo: 2,
        pageSize: 10,
        total: 200
      },
      tableData: [
        {
          id: 1,
          time: '2020-10-25 13:36:29',
          name: 'XXX雷管名称',
          fixCode: 'XXX雷管固定码',
          publicCode: '1-9999',
          count: '200'
        },
        {
          id: 2,
          time: '2020-10-25 13:36:29',
          name: 'XXX雷管名称',
          fixCode: 'XXX雷管固定码',
          publicCode: '1-9999',
          count: '200'
        },
        {
          id: 2,
          time: '2020-10-25 13:36:29',
          name: 'XXX雷管名称',
          fixCode: 'XXX雷管固定码',
          publicCode: '1-9999',
          count: '200'
        }
      ],
      form: {
        id: 1,
        time: '',
        name: '',
        fixCode: '',
        publicCode: '',
        count: ''
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
  methods: {
    getList () {
      const params = {}
      params[this.query.queryKey] = this.query.queryValue
      service({
        url: '/api/list',
        method: 'get'
      })
        .then(res => {
          if (res && res.length > 0) {
            this.tableData = res
          }
        })
        .catch(e => {
          console.log(e)
          this.$message.error('获取列表信息失败')
        })
      // this.getList(params)
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
</style>
