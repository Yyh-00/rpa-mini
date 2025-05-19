Page({
  data: {
    itemInfo: {}
  },

  onLoad() {
    const _itemInfo = wx.getStorageSync('itemInfo')

    this.setData({ itemInfo: _itemInfo })
    console.log(_itemInfo);

  },

  onUnload() {
    wx.removeStorageSync('itemInfo')
  },
})