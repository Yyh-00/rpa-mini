// app.ts

import { getUserLocation } from './utils/location'

App({
  onLaunch() {
    this.checkLocationAuth()
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.example.com/user',
        success: res => resolve(res.data),
        fail: reject
      });
    });
  },
  // 检查位置授权状态
  checkLocationAuth() {
    wx.getSetting({
      success: (res) => {
        const auth = res.authSetting['scope.userLocation'];

        if (auth) {
          getUserLocation(2);
        } else {
          this.requestLocationAuth();
        }
      },
      fail: (err) => {
        console.error('获取设置失败:', err);
      }
    });
  },

  // 请求位置授权
  requestLocationAuth() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: () => {
        getUserLocation(2);
      },
      fail: () => {
        wx.showModal({
          title: '权限申请',
          content: '请允许位置权限以获取您当前的地址',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting();
            }
          }
        });
      }
    });
  },
})