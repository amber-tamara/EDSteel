'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: ActionState, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ambertom9493@gmail.com',
      subject: 'New Form Submission',
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>From:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });
    console.log(data);
    return { success: true, data };
  } catch (error) {
    console.error('Resend Error:', error);
    return { success: false, error: 'Failed to send email.' };
  }
}
