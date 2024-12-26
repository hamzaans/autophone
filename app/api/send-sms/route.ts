import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  try {
    const { phone, name, date, time } = await request.json();
    
    const message = await client.messages.create({
      body: `Hi ${name}, this is a reminder of your appointment with Dr. Ansari on ${date} at ${time} at The Waldorf Medical Clinic. If you need to reschedule, please call our office during business hours.`,
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return NextResponse.json({ success: true, messageId: message.sid });
  } catch (error) {
    console.error('SMS error:', error);
    return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
} 