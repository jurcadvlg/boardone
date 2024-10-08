import to from '@/utils/awaitTo';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SubmitDto } from '@/app/(home)/_components/StepSubmit/hooks/useStepSubmit';
import { getSubmittedCalculationEmail } from '@/utils/emails/getSubmittedCalculationEmail';

export async function POST(req: NextRequest) {
  const data: SubmitDto = await req.json();

  if (!data) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = getSubmittedCalculationEmail(data, 'BoardOne - Odeslaná poptávka');

  const [error, response] = await to(transporter.sendMail(mailOptions));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(response, { status: 200 });
}
