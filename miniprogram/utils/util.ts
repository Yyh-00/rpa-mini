// 封装请求为 Promise
export function requestData(url: string) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      success: res => resolve(res.data),
      fail: err => reject(err)
    });
  });
}



