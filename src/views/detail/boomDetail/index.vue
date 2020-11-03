<template>
  <d2-container>
    <template slot="header">
      <div class="module-header">
       <div class="left-box">
        <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
          <el-form-item label="日期">
              <el-date-picker
                v-model="formInline.date"
                type="date"
                value-format="timestamp"
                :picker-options="pickerOptions"
                placeholder="选择日期时间">
              </el-date-picker>
          </el-form-item>

          <el-form-item label="线束号">
            <el-input v-model="formInline.lineNum" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="桩号">
            <el-input v-model="formInline.stakeNum" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="柱号起始值">
            <el-input v-model="formInline.colFrom" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="雷管固定码">
            <el-input v-model="formInline.fixCode" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="雷管发码">
            <el-input v-model="formInline.childCode" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="炸药批次号">
            <el-input v-model="formInline.batchNum" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="炸药箱号">
            <el-input v-model="formInline.boxNum" placeholder=""></el-input>
        </el-form-item>

          <!-- <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="状态">
              <el-option
              v-for="(item,key) in statusOptions"
              :key="key"
              :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="hadndleSearch">查询</el-button>
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
          style="width: 100%"
          height="500">
          <el-table-column
            fixed
            prop="id"
            label="id"
            width="100">
          </el-table-column>
            <el-table-column

            prop="displayDate"
            label="日期"
            width="100">
          </el-table-column>
            <el-table-column

            prop="lineNum"
            label="线束号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="stakeNum"
            label="桩号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="height"
            label="井深"
            width="100">
          </el-table-column>
            <el-table-column
            prop="fixCode"
            label="固定码"
            width="100">
          </el-table-column>
            <el-table-column

            prop="childCode"
            label="发码"
            width="100">
          </el-table-column>
            <el-table-column

            prop="batchNum"
            label="批次号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="boxNum"
            label="箱号"
            width="100">
          </el-table-column>
           <el-table-column
            prop="colNum"
            label="柱号"
            width="100">
          </el-table-column>
           <el-table-column
            prop="count"
            label=" 重量"
            width="100">
          </el-table-column>
             <el-table-column
            prop="down"
            label=" 下药工"
            width="100">
          </el-table-column>
           <el-table-column
            prop="packager"
            label=" 包药工"
            width="100">
          </el-table-column>
            <el-table-column
            prop="guardVideo"
            label="警卫班视频"
            width="100">
              <template slot-scope="scope">
                <el-tag type="success" @click="videoTagClick(scope.row.guardVideo)">播放</el-tag>
              </template>
          </el-table-column>
           <el-table-column
            prop="sendVideo"
            label="交接发放视频"
            width="110">
              <template slot-scope="scope">
                <el-tag type="success" @click="videoTagClick(scope.row.sendVideo)">播放</el-tag>
              </template>
          </el-table-column>
           <el-table-column
            prop="packageVideo"
            label="包药视频"
            width="100">
              <template slot-scope="scope">
                <el-tag type="success" @click="videoTagClick(scope.row.packageVideo)">播放</el-tag>
              </template>
          </el-table-column>
           <el-table-column
            prop="useVideo"
            label="下药视频"
            width="100">
              <template slot-scope="scope">
                <el-tag type="success" @click="videoTagClick(scope.row.useVideo)">播放</el-tag>
              </template>
          </el-table-column>
           <el-table-column
            prop="badVideo"
            label="废盲炮视频"
            width="100">
              <template slot-scope="scope">
                <el-tag type="success" @click="videoTagClick(scope.row.badVideo)">播放</el-tag>
              </template>
          </el-table-column>

           <el-table-column
            prop="mark"
            label="备注"
            width="100">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="240">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>

              <el-button @click="handleCopy(scope.row)" type="primary" size="small">复制</el-button>
              <el-button @click="handleVideo(scope.row)" type="primary" size="small">更新视频</el-button>
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

    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="700px">
     <el-form :model="batchForm" size="mini" label-position="right" >

         <el-form-item label="操作类型" :label-width="formLabelWidth">
           <el-select v-model="batchForm.optType" placeholder="请选择">
            <el-option v-for="(option,index) in statusOptions"
            :key="index"
            :label="option.label"
            :value="option.value"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item
           label="箱号" :label-width="formLabelWidth">
          <el-input
          v-model="batchForm.batchNum" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="箱号起始值"
          :label-width="formLabelWidth">
          <el-input
           v-model="batchForm.boxFrom" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="箱号结束值" :label-width="formLabelWidth">
          <el-input v-model="batchForm.boxTo" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="柱号起始值" :label-width="formLabelWidth">
          <el-input v-model="batchForm.colFrom" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="柱号结束值" :label-width="formLabelWidth">
          <el-input v-model="batchForm.colTo" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="炸药规格" :label-width="formLabelWidth">
           <el-select v-model="batchForm.type" placeholder="请选择">
            <el-option v-for="(option,index) in types"
            :key="index"
            :label="option.label"
            :value="option.value"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="保管人" :label-width="formLabelWidth">
          <el-input v-model="form.keeper" autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item label="领退人" :label-width="formLabelWidth">
          <el-input v-model="form.consumer" autocomplete="off"></el-input>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
      <el-dialog :title="editTitle" :visible.sync="dialogFormVisible" width="700px">
     <el-form :model="form" size="mini" label-position="right" >

          <el-form-item label="日期" :label-width="formLabelWidth">
         <el-date-picker
            v-model="form.date"
            type="date"
            value-format="timestamp"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
          <el-form-item
           label="线束号" :label-width="formLabelWidth">
          <el-input
          v-model="form.lineNum" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="桩号"
          :label-width="formLabelWidth">
          <el-input
           v-model="form.stakeNum" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="井深" :label-width="formLabelWidth">
          <el-input v-model="form.height" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="固定码" :label-width="formLabelWidth">
          <el-input v-model="form.fixCode" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="发码" :label-width="formLabelWidth">
          <el-input v-model="form.childCode" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="批次号" :label-width="formLabelWidth">
          <el-input v-model="form.batchNum" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="箱号" :label-width="formLabelWidth">
          <el-input v-model="form.boxNum" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="柱号" :label-width="formLabelWidth">
          <el-input v-model="form.colNum" autocomplete="off"></el-input>
        </el-form-item>

         <el-form-item label=" 下药工" :label-width="formLabelWidth">
          <el-input v-model="form.down" autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item label=" 包药工" :label-width="formLabelWidth">
          <el-input v-model="form.packager" autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.mark" autocomplete="off"></el-input>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--video-->
    <el-dialog title="更新视频信息" :visible.sync="dialogVideoFormVisible" width="700px">
     <el-form :model="videoForm" size="mini" label-position="right" >

          <el-form-item label="视频类型" :label-width="formLabelWidth">
           <el-select v-model="videoForm.type" placeholder="请选择">
            <el-option v-for="(option,index) in videoTypeOptions"
            :key="index"
            :label="option.label"
            :value="option.value"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="视频链接" :label-width="formLabelWidth">
            <el-input v-model="videoForm.url" placeholder=""></el-input>
         </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleVideoSubmit">确 定</el-button>
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
        date: '',
        lineNum: '',
        stakeNum: '',
        fixCode: '',
        childCode: '',
        batchNum: '',
        boxNum: ''
      },
      batchForm: {
        optType: '',
        batchNum: '',
        boxFrom: '',
        boxTo: '',
        type: '',
        colFrom: '',
        colTo: '',
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
      videoTypeOptions: [
        {
          label: '警卫班视频',
          value: 1
        },
        {
          label: '交接发放视频',
          value: 2
        },
        {
          label: '包药视频',
          value: 3
        },
        {
          label: '下药视频',
          value: 4
        }, {
          label: '废盲炮视频',
          value: 5
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
      videoForm: {
        detailId: -1,
        type: '',
        url: ''

      },
      form: {
        date: '',
        lineNum: '',
        stakeNum: '',
        height: '',
        fixCode: '',
        childCode: '',
        batchNum: '',
        boxNum: '',
        colNum: '',
        down: '',
        packager: '',
        mark: '',
        videos: {}
      },
      isCreating: false,
      dialogFormVisible: false,
      dialogVideoFormVisible: false,
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
    videoTagClick (url) {
      if (url.startsWith('http') || url.startsWith('https')) {
        window.open(url)
      } else {
        this.$message.error('无法打开' + url)
      }
    },
    async getList () {
      let params = {}
      params = Object.assign({}, this.formInline)
      params.pageNo = this.pager.pageNo
      params.pageSize = this.pager.pageSize
      const res = await api.DETAIL_LIST(params)
      // res = this.testData()
      if (res) {
        this.pager.total = res.total
        this.tableData = this.fixData(res.detailList)
      }
      // this.getList(params)
    },
    fixData (list) {
      if ((!list) || list.length === 0) return []
      return list.map(it => {
        it.displayDate = util.dateFormat(it.date)
        it.guardVideo = it.videos.guardVideo
        it.sendVideo = it.videos.sendVideo
        it.packageVideo = it.videos.packageVideo
        it.useVideo = it.videos.useVideo
        it.badVideo = it.videos.badVideo

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
    handleVideo (row) {
      this.videoForm.detailId = row.id
      this.dialogVideoFormVisible = true
    },
    handleAdd () {
      this.isCreating = true
      this.form = {
        date: '',
        lineNum: '',
        stakeNum: '',
        height: '',
        fixCode: '',
        childCode: '',
        batchNum: '',
        boxNum: '',
        colNum: '',
        down: '',
        packager: '',
        mark: '',
        videos: {}
      }
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.isCreating = false
      const data = Object.assign({}, row)
      this.form = Object.assign(this.form, data)
      this.dialogFormVisible = true
    },
    handleCopy (row) {
      this.isCreating = true
      const data = Object.assign({}, row)
      delete data.id
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
    async handleVideoSubmit () {
      const sdata = Object.assign({}, this.videoForm)
      const res = await api.DETAIL_VIDEO_UPDATE(sdata)
      if (res && res.id) {
        this.$message.success('更新成功')
        this.dialogVideoFormVisible = false
        this.getList()
      }
    },
    async handleSubmit () {
      const sdata = Object.assign({}, this.form)
      let res = null
      if (this.isCreating) {
        res = await api.DETAIL_ADD(sdata)
      } else {
        res = await api.DETAIL_UPDATE(sdata)
      }
      if (res) {
        this.$message.success('操作成功')
        this.dialogFormVisible = false
      } else {
        this.$message.error('操作失败')
      }
    },
    async handleBatchSubmit () {
      const sdata = Object.assign({}, this.batchForm)
      const today = this.getToday()
      sdata.date = today
      const res = await api.EXPLOSIVE_BATCH()
      if (res && res >= 0) {
        this.$message.success('操作成功')
        this.dialogFormVisible = false
      } else {
        this.$message.error('操作失败')
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
</style>
