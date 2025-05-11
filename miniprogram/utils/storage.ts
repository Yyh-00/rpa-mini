// utils/storage.js
const listeners = {} as any;

// 封装 setStorage 方法
function setStorage(key: string, data: any) {
  // 先更新 storage
  wx.setStorageSync(key, data);

  // 触发所有监听回调
  if (listeners[key]) {
    listeners[key].forEach((callback: Function) => callback(data));
  }
}

// 注册监听函数
function onStorageChange(key: string, callback: Function) {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(callback);
}

// 移除监听函数
function offStorageChange(key: string, callback: Function) {
  if (listeners[key]) {
    listeners[key] = listeners[key].filter((cb: Function) => cb !== callback);
  }
}

export { setStorage, onStorageChange, offStorageChange };