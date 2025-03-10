const express = require('express');
const morgan = require('morgan'); // 导入 morgan
const Database = require("better-sqlite3");

const db = new Database('data/data.sqlite');
const app = express();

// 使用 morgan 记录请求日志
// 'dev' 模式适用于开发环境，输出简洁的彩色日志
app.use(morgan('dev'));
app.use('/', express.static('static'));
app.use(express.json());

// 获取玩家列表
app.get('/api/get_player_list', (req, res) => {
    const player = db.prepare("SELECT id, player, position FROM player").all();
    res.json(player);
});

// 获取基地列表
app.get('/api/get_base_list', (req, res) => {
    const base = db.prepare("SELECT id, name, founder, synopsis FROM base").all();
    const special_base = db.prepare("SELECT id, name, founder, synopsis FROM special_base").all();
    res.json({
        base: base,
        special_base: special_base
    });
});

// 启动服务器
app.listen(3000, () => {
    console.log("服务器运行在 http://localhost:3000");
});