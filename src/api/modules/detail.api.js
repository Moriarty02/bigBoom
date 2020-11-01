
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({

  DETAIL_LIST (data = {}) {
    // 接口请求
    return service({
      url: '/api/detail/query' + tools.getQueryString(data),
      method: 'get'
    })
  },
  DETAIL_ADD (data = {}) {
    // 接口请求
    return service({
      url: '/api/detail',
      method: 'POST',
      data
    })
  },
  DETAIL_UPDATE (data = {}) {
    // 接口请求
    return service({
      url: '/api/detail',
      method: 'PUT',
      data
    })
  },
  DETAIL_VIDEO_UPDATE (data = {}) {
    // 接口请求
    return service({
      url: '/api/video/update',
      method: 'POST',
      data
    })
  }

})
