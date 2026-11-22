import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, phone, message, developerPhone } = await request.json();

    const targetPhone = process.env.WHATSAPP_NOTIFICATION_PHONE || developerPhone || '';
    const cleanTargetPhone = targetPhone.replace(/[^0-9]/g, '');

    const notificationText = [
      '🔔 *New Portfolio Direct Connection Lead!*',
      name ? `👤 *Name:* ${name}` : null,
      email ? `📧 *Email:* ${email}` : null,
      phone ? `📱 *Visitor Phone:* ${phone}` : null,
      message ? `💬 *Message:* ${message}` : null,
      `⏰ *Time:* ${new Date().toLocaleString()}`
    ].filter(Boolean).join('\n');

    let notifiedViaApi = false;

    // Optional CallMeBot Free WhatsApp API integration
    const callmebotApiKey = process.env.CALLMEBOT_API_KEY;
    if (callmebotApiKey && cleanTargetPhone) {
      try {
        const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanTargetPhone)}&text=${encodeURIComponent(notificationText)}&apikey=${encodeURIComponent(callmebotApiKey)}`;
        const res = await fetch(callmebotUrl, { method: 'GET' });
        if (res.ok) {
          notifiedViaApi = true;
        }
      } catch (err) {
        console.warn('CallMeBot notification failed:', err);
      }
    }

    // Direct wa.me URL for one-click chat
    const clientWaUrl = cleanTargetPhone
      ? `https://wa.me/${cleanTargetPhone}?text=${encodeURIComponent(
          `Hi Deeptha, I'm reaching out from your portfolio!\n${name ? `Name: ${name}\n` : ''}${email ? `Email: ${email}\n` : ''}${message ? `Message: ${message}` : ''}`
        )}`
      : null;

    return NextResponse.json({
      success: true,
      notifiedViaApi,
      waUrl: clientWaUrl,
      message: 'Connection request processed successfully'
    });
  } catch (error) {
    console.error('WhatsApp notify error:', error);
    return NextResponse.json(
      { error: 'Failed to process WhatsApp notification' },
      { status: 500 }
    );
  }
}
