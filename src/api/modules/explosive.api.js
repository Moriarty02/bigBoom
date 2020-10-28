
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  EXPLOSIVE_LIST (data = {}) {
    // 接口请求
    return service({
      url: '/api/zhayao/list' + tools.getQueryString(data),
      method: 'get'
    })
  },
  EXPLOSIVE_BATCH (data = {}) {
    // 接口请求
    return service({
      url: '/api/zhayao/batch',
      method: 'POST',
      data
    })
  },
  EXPLOSIVE_UPDATE (data = {}) {
    // 接口请求
    return service({
      url: '/api/zhayao',
      method: 'PUT',
      data
    })
  },
  EXPLOSIVE_LOG (data = {}) {
    // 接口请求
    return service({
      url: '/api/zhayao/log' + tools.getQueryString(data),
      method: 'get',
      data
    })
  }

})
