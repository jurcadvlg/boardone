import to from '@/utils/awaitTo';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SubmitDto } from '@/app/(home)/_components/StepSubmit/hooks/useStepSubmit';
import { getSavedCalculationEmailContent } from '@/utils/emails/getSavedCalculationEmailContent';

export async function POST(req: NextRequest) {
  const data: SubmitDto = await req.json();

  if (!data || !data.formData.email) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { text, html } = getSavedCalculationEmailContent(data);

  const mailForUser = {
    from: process.env.EMAIL_FROM,
    to: data.formData.email,
    subject: 'BoardOne: Nabídka autobusové dopravy',
    text: text,
    html: html,
  };

  const [error, response] = await to(transporter.sendMail(mailForUser));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mailForAdmin = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_ADMIN_TO,
    // cc: process.env.EMAIL_ADMIN_CC,
    subject: 'BoardOne: Nabídka autobusové dopravy',
    text: text,
    html: html,
  };

  const [error2, response2] = await to(transporter.sendMail(mailForAdmin));

  if (error2) {
    return NextResponse.json({ error: error2.message }, { status: 500 });
  }

  return NextResponse.json({ response, response2 }, { status: 200 });
}
