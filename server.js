/**
 * 环保主题伪装前端服务器
 * Green Home - 绿色家园环保公益平台
 * 
 * 这是一个伪装的前端服务器，用于提供环保主题的静态页面
 * 实际的代理服务由 index.js 提供
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// 获取端口配置
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

// 静态文件服务
const publicPath = path.join(__dirname, 'public');

// 确保 public 目录存在
if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
    console.log('Created public directory');
}

// 提供静态文件
app.use(express.static(publicPath));

// 根路径返回伪装页面
app.get('/', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        // 如果没有 index.html，返回简单的环保主题页面
        res.send(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>绿色家园 | Green Home</title>
    <style>
        body {
            font-family: system-ui, sans-serif;
            background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
        .container {
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        h1 {
            color: #166534;
            font-size: 2.5rem;
        }
        p {
            color: #4b5563;
            font-size: 1.2rem;
        }
        .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">🌱</div>
        <h1>绿色家园</h1>
        <p>致力于环境保护与可持续发展</p>
        <p>Green Home - Environmental Protection Platform</p>
    </div>
</body>
</html>
        `);
    }
});

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Green Home',
        message: '绿色家园环保平台运行正常'
    });
});

// 启动服务器（如果直接运行此文件）
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🌱 绿色家园环保平台已启动`);
        console.log(`📍 访问地址: http://localhost:${PORT}`);
    });
}

module.exports = app;
