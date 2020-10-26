<template>
    <d2-container>
      <div class="personal">
        <div class="personal-head">
          个人账户：
        </div>
        <div class="personal-main">
          <div class="personal-main-right">
               <div class="personal-username strip">
          <div class="key">id：</div>
          <div class="value">{{ personalDetail.id }}</div>
        </div>
        <div class="personal-name strip">
          <div class="key">姓名：</div>
          <div class="value">{{ personalDetail.username }}</div>
        </div>
        <div class="personal-role strip">
          <div class="key">角色：</div>
          <el-tag class="tags">{{personalDetail.roleDisplay}}</el-tag>
        </div>
        <div class="persoanl-group strip">
          <div class="key">分组：</div>
          <div class="value">
            {{personalDetail.group}}
          </div>
        </div>
         <div class="persoanl-group strip">
          <div class="key">位置：</div>
          <div class="value">
            {{personalDetail.position}}
          </div>
        </div>
        <div class="personal-tel strip">
          <div class="key">电话：</div>
          <div class="value">{{ personalDetail.phoneNumber }}</div>
        </div>
          </div>
        </div>
     <d2-module>
        <el-button type="primary" @click="updatePwd">修改密码</el-button>
     </d2-module>
      </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="formUpdatePwd" :rules="rules" ref="ruleForm">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="originalPassword">
          <el-input v-model="formUpdatePwd.originalPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
          <el-input v-model="formUpdatePwd.newPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="checkPass">
          <el-input v-model="formUpdatePwd.checkPass" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitUpdatePwd()">确 定</el-button>
  </div>
    </el-dialog>
    </d2-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'settings',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.formUpdatePwd.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formUpdatePwd.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      formLabelWidth: '140px',
      personalDetail: {},
      roleMap: {
        1: '系统管理员',
        2: '协作者',
        3: '访客'
      },
      formUpdatePwd: {
        id: 0,
        originalPassword: '',
        newPassword: '',
        checkPass: ''
      },
      rules: {
        originalPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  created () {
    this.getOwnerInfo()
  },
  methods: {
    async getOwnerInfo () {
      const res = await api.SYS_USER_OWN()
      if (res) {
        this.personalDetail = res
        res.roleDisplay = this.roleMap[res.role]
      }
    },
    updatePwd () {
      const { id } = this.personalDetail
      this.formUpdatePwd.id = id
      this.dialogFormVisible = true
    },
    submitUpdatePwd () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const data = Object.assign({}, this.formUpdatePwd)
          const res = await api.SYS_USER_UPDATE_PWD(data)
          if (res) {
            this.$message.success('修改成功')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.personal {
    width: 900px;
    border: 1px solid #eee;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
    margin: 80px auto;
    position: relative;
    background: #f8f8f8;
    &-top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: #409EFF;
        height: 3px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    &-head {
        font-size: 16px;
        color: #909399;
        font-weight: bold;
        margin-bottom: 16px;
        margin-left: 3px;
    }
    &-footer {
      .el-divider__text {
          background: #f8f8f8;
          padding: 0 8px;
          right: 25px;
          font-size: 14px;
          color: #909399;
          font-weight: bold;
      }
    }
    .strip {
        padding: 10px;
        background: #fff;
        margin-bottom: 10px;
        border-radius: 8px;
    }
    .key {
        font-size: 14px;
        color: #909399;
        font-weight: bold;
        margin-bottom: 0px;
        display: inline-block;
        width: 70px;
        margin-right: 40px;
    }
    .value {
         font-size: 14px;
        color: #909399;
        font-weight: bold;
        margin-bottom: 0px;
        display: inline-block;
    }
}
.admin-mailto {
  color: #909399;
  margin-left: 102px;
  margin-top: 5px
}
.admin-mailto:hover {
  color: #409EFF;
}
.tags{
  margin-right:10px;
}
.personal-main{
  position: relative;
  background: #fff;
  display: flex;

  .personal-main-right{
    margin-left: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
  }
}

</style>
