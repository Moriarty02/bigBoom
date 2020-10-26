
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    // 接口请求
    return service({
      url: '/login',
      method: 'post',
      data
    })
  },
  SYS_USER_LOGOUT (data = {}) {
    // 接口请求
    return service({
      url: '/logout',
      method: 'post',
      data
    })
  },
  SYS_USER_LIST (data = {}) {
    // 接口请求
    return service({
      url: '/api/userList' + tools.getQueryString(data),
      method: 'get'
    })
  },
  SYS_USER_EDIT (data = {}) {
    // 接口请求
    return service({
      url: '/api/user',
      method: 'put',
      data
    })
  },
  SYS_USER_ADD (data = {}) {
    // 接口请求
    return service({
      url: '/api/user',
      method: 'POST',
      data
    })
  },
  SYS_USER_DEL (data = {}) {
    // 接口请求
    return service({
      url: '/api/delUser',
      method: 'put',
      data
    })
  }

})
