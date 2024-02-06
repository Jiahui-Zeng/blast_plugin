// 监听扩展安装或更新事件
chrome.runtime.onInstalled.addListener(function() {
    console.log("Tip Plugin installed/updated.");
    // 在这里执行一些初始化操作，比如设置默认设置等
});

// 示例：监听浏览器的某些事件，比如标签页更改
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // 可以在这里根据需要添加代码，比如检查URL变化等
    if (changeInfo.url) {
        console.log("Tab URL changed to: " + changeInfo.url);
    }
});
