const https = require('https');

exports.handler = async (event) => {
    // Discord Webbook
    const webhookUrl = "https://discord.com/api/webhooks/1307680981410648107/uD7zgVLtAihWOT10BGIXf0leEscYhoXcjFSfV7473vIuQX98vruMJqRRfNME5LnkmTe0";
    const url = new URL(webhookUrl);

    for (const record of event.Records) {
        let snsMessage = record.Sns.Message;

        // 如果不是 JSON 格式，直接使用文字
        try {
            snsMessage = JSON.parse(snsMessage);
            snsMessage = snsMessage.AlarmName || snsMessage; // 提取警報名稱
        } catch (e) {
            console.warn("Message is not JSON, using raw text:", snsMessage);
        }

        // 訊息內容
        const payload = JSON.stringify({
            content: `🚨 Alert: ${snsMessage}`,
        });

        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
            },
        };

        console.log(`Payload to send: ${payload}`);
        console.log(`Request options: ${JSON.stringify(options)}`);

        // 發送請求到 Discord Webhook
        await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                console.log(`STATUS: ${res.statusCode}`);
                let responseData = '';
                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    console.log(`BODY: ${responseData}`);
                    if (res.statusCode === 204) {
                        console.log("Message successfully sent to Discord.");
                        resolve();
                    } else {
                        console.error(`Failed to send message, status: ${res.statusCode}`);
                        reject(new Error(`Unexpected status code: ${res.statusCode}`));
                    }
                });
            });

            req.on('error', (e) => {
                console.error(`Request error: ${e.message}`);
                reject(e);
            });

            req.write(payload);
            req.end();
        });
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Message sent to Discord'),
    };
};
