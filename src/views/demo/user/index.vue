<template>
  <d2-container>
    <template slot="header">
      <div class="module-header">
       <div class="left-box">
         <el-form size="mini" inline>
            <!-- <el-form-item>
          <el-select v-model="query.queryKey" placeholder="检索字段" clearable>
            <el-option label='id' value='id'></el-option>
            <el-option label='name' value='name'></el-option>
            <el-option label='time' value='time'></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item  label="用户名">
          <el-input v-model='query.queryValue' placeholder="检索内容" clearable />
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
            prop="username"
            label="用户名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="group"
            label="分组"
            width="150">
          </el-table-column>
          <el-table-column
            prop="position"
            label="位置"
            width="150">
          </el-table-column>
           <el-table-column
            prop="phoneNumber"
            label="电话号码"
            width="150">
          </el-table-column>
           <el-table-column
            prop="role"
            label="角色"
            width="150">
             <template slot-scope="scope">

          <el-tag type="success" v-if="scope.row.role === 1">
            系统管理员
          </el-tag>
          <el-tag type="success" v-if="scope.row.role === 2">
            协同者
          </el-tag>
          <el-tag type="success" v-if="scope.row.role === 3">
            访客
          </el-tag>
             </template>

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
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="group" :label-width="formLabelWidth">
          <el-input v-model="form.group" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="position" :label-width="formLabelWidth">
          <el-input v-model="form.position" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
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
import api from '@/api'

export default {
  name: 'page1',
  data () {
    return {
      query: {
        queryKey: 'id',
        queryValue: ''
      },
      options: [{
        label: '系统管理员',
        value: 1
      },
      {
        label: '协同者',
        value: 2
      },
      {
        label: '访客',
        value: 3
      }],
      formLabelWidth: '120px',
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 10
      },
      tableData: [],
      form: {
        id: 1,
        username: '',
        group: '',
        position: '',
        phoneNumber: '',
        role: 1
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
      const params = {}
      params.pageNo = this.pager.pageNo
      params.pageSize = this.pager.pageSize
      params.username = this.query.queryValue || ''

      const res = await api.SYS_USER_LIST(params)
      if (res.users && res.users.length > 0) {
        console.log(res.users)
        this.tableData = res.users
        console.log(this.tableData)
        this.pager.total = res.total
      }
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
        username: '',
        group: '',
        position: '',
        phoneNumber: '',
        role: 1
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
      this.$confirm(`此操作将永久删除id为${row.username}}的记录, 是否继续?`, '提示', {
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
      this.dialogFormVisible = false
      const sdata = Object.assign({}, this.form)
      delete sdata.id
      let res
      if (this.isCreating) {
        res = await api.SYS_USER_ADD(sdata)
      } else {
        res = await api.SYS_USER_EDIT(sdata)
      }
      const mgsPreifx = this.isCreating ? '新增' : '修改'

      if (res) {
        this.$message.success(mgsPreifx + '成功')
        this.getList()
      } else {
        this.$message.error(mgsPreifx + '失败')
      }
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
