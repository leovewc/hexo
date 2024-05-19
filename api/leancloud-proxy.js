const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const apiUrl = 'https://console.leancloud.app/1.1/cloudQuery';
    const params = req.url.split('?')[1]; // 将查询参数传递给 LeanCloud
    const fullUrl = `${apiUrl}?${params}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'X-LC-Id': 'YwK8KRNlfljzZmUaKGgvCSBKB-MdYXbMMI',
                'X-LC-Key': 'EpbwYlOP2EjfzL5twidkXaTD'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
