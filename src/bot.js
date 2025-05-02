// utils/telegram.js
export async function sendTelegramMessage(message = "Hello") {
    const token = "7876302295:AAH8T2rqX68SyEsi0nqii0ieMDTRtR-PabM";  // Store this in .env.local
    const chatId = 7571378434;  // Chat ID or Group ID
    
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const body = {
        chat_id: chatId,
        text: message,
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error('Failed to send message via Telegram');
    }

    return await res.json();
}