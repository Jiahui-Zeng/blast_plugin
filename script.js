import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";

// 假设已经配置好了MetaMask或类似的Web3提供者
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []); // 请求用户授权连接账户
const signer = provider.getSigner();
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = []; // 你的合约ABI

const contract = new ethers.Contract(contractAddress, contractABI, signer);

document.getElementById('creatorBtn').addEventListener('click', function() {
    document.getElementById('creatorOptions').classList.remove('hidden');
    document.getElementById('creatorBtn').classList.add('hidden');
});

document.getElementById('readerBtn').addEventListener('click', () => {
    document.getElementById('readerOptions').classList.remove('hidden');
    document.getElementById('readerBtn').classList.add('hidden');
});

document.getElementById('storeUrlButton').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value || window.location.href;
    try {
        // 假设合约有一个存储URL的函数叫做storeUrl
        const tx = await contract.storeUrl(url);
        await tx.wait();
        console.log('URL stored successfully');
        // 显示成功信息，具体实现根据你的页面设计来
    } catch (error) {
        console.error('Failed to store URL:', error);
        // 显示错误信息
    }
});

document.getElementById('withdrawButton').addEventListener('click', async () => {
    try {
        const tx = await contract.withdraw();
        await tx.wait();
        console.log('Withdrawal successful');
        // 显示提现成功的提示
    } catch (error) {
        console.error('Withdrawal failed:', error);
        // 显示错误信息
    }
});

document.getElementById('tipButton').addEventListener('click', async () => {
    const amount = ethers.utils.parseEther(document.getElementById('tipAmount').value);
    try {
        // 假设合约有一个打赏的函数叫做sendTip，且需要URL和金额作为参数
        // 这里只传入了金额，需要根据你的合约实现来调整
        const tx = await contract.sendTip(url, { value: amount });
        await tx.wait();
        console.log('Tip sent successfully');
        // 显示打赏成功的提示
    } catch (error) {
        console.error('Failed to send tip:', error);
        // 显示错误信息
    }
});

// 如果你的环境中没有chrome.runtime，下面这段代码可能不适用
document.addEventListener('DOMContentLoaded', function() {
    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({message: "get_current_url"}, function(response) {
            console.log("Current URL is: " + response.url); // Use this URL as needed
            document.getElementById('urlInput').value = response.url;
        });
    }
});
