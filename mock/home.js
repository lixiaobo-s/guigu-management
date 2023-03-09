const data = require('./datas.json');
module.exports = [
    {
        url: '/home/list',
        type: 'get',
        response: config => {
            const items = data.items
            return {
                code: 200,
                data
            }
        }
    }
]