import { setStorage } from './storage'

// 根据经纬度获取地址信息
export function getAddressFromLocation(latitude: number, longitude: number) {
  // 使用微信小程序的位置解析API（需在app.js中配置腾讯地图key）
  wx.chooseLocation({
    latitude,
    longitude,
    success: (res: any) => {
      const addressInfo: any = {
        name: res.name,
        address: res.address,
        latitude: res.latitude,
        longitude: res.longitude,
        detailInfo: res.detailInfo || ''
      };

      setStorage('addressInfo', addressInfo)
    },
    fail: (err) => {
      console.error('获取地址失败:', err);
      // 备选方案：使用腾讯地图API
      getAddressFromTencentMap(latitude, longitude);
    }
  });
}

// 使用腾讯地图API获取地址（备选方案）
export function getAddressFromTencentMap(latitude: number, longitude: number) {
  const KEY = 'WCVBZ-36DW5-5K3IQ-IOYBK-AJVZS-MHFLX'; // 替换为您的腾讯地图API key

  wx.request({
    url: `https://apis.map.qq.com/ws/geocoder/v1/`,
    data: {
      location: `${latitude},${longitude}`,
      key: KEY,
      get_poi: 1
    },
    success: (res: any) => {
      if (res.data.status === 0) {
        const result = res.data.result;
        const addressInfo: any = {
          name: result.formatted_addresses.recommend,
          address: result.address,
          latitude,
          longitude,
          detailInfo: result.address_component,
          pois: result.pois
        };
        setStorage('addressInfo', addressInfo)
      } else {
        throw new Error(`API错误: ${res.data.message}`);
      }
    },
    fail: (err) => {
      console.error('调用腾讯地图API失败:', err);
    }
  });
}

// 获取用户当前位置 1 FromLocation;2 FromTencentMap
export function getUserLocation(type: number = 1) {
  wx.getLocation({
    type: 'gcj02', // 'gcj02'直接用于地图标记 wgs84
    success: (res) => {
      if (type == 1) {
        getAddressFromLocation(res.latitude, res.longitude);
      } else {
        getAddressFromTencentMap(res.latitude, res.longitude);
      }
    },
    fail: (err) => {
      console.error('获取位置失败:', err);
    }
  });
}