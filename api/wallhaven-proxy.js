const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const apiKey = 'hzXesC1W4t3O08TBurgTd3Md2XX3glHL'; // Ìæ»»ÎªÄãµÄAPIÃÜÔ¿
    const apiUrl = 'https://wallhaven.cc/api/v1/search';
    const params = new URLSearchParams({
        q: 'id:12757',
        categories: '111',
        purity: '110',
        sorting: 'toplist',
        order: 'desc',
        topRange: '1y',
        ai_art_filter: '1',
        page: '3',
        apikey: apiKey
    });

    try {
        const response = await fetch(`${apiUrl}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
