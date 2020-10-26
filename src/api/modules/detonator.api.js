
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  DETONATOR_LIST (data = {}) {
    // 接口请求
    return service({
      url: '/api/leiguan/list' + tools.getQueryString(data),
      method: 'get'
    })
  },
  DETONATOR_BATCH (data = {}) {
    // 接口请求
    return service({
      url: '/api/leiguan/batch',
      method: 'get',
      data
    })
  },
  DETONATOR_LOG (data = {}) {
    // 接口请求
    return service({
      url: '/api/leiguan/log' + tools.getQueryString(data),
      method: 'get',
      data
    })
  }

})
