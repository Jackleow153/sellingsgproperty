import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const formData = await req.formData();

    const name = formData.get('name') || '';
    const mobile = formData.get('mobile') || '';
    const message = formData.get('message') || '';
    const botField = formData.get('bot-field') || '';

    // Honeypot check - if filled, treat as spam (don't send email)
    if (botField) {
      console.log('Bot detected, skipping email');
      // Still log to forms if possible, but for now just return ok
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // Send instant email via Resend (best effort - don't block the user if it fails)
    const emailHtml = `
      <h2>New Enquiry from sellingsgproperty.com</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted via contact form on www.sellingsgproperty.com</small></p>
    `;

    try {
      await resend.emails.send({
        from: 'Sellingsgproperty <enquiries@sellingsgproperty.com>', // Update to your verified domain in Resend
        to: ['questrepreneur@gmail.com', 'hr@tech2reach.com'],
        subject: `New Enquiry from ${name}`,
        html: emailHtml,
      });
      console.log('Email sent instantly via Resend for:', name);
    } catch (emailError) {
      console.error('Resend email failed (user will see WhatsApp fallback):', emailError);
      // Continue anyway so the form submission succeeds for the user
    }

    // Forward to Netlify Forms so the submission appears in the dashboard
    // This keeps the "Verified submissions" list working as before
    const siteUrl = process.env.URL || 'https://www.sellingsgproperty.com';
    const forwardData = new URLSearchParams();
    forwardData.append('form-name', 'contact');
    forwardData.append('name', name);
    forwardData.append('mobile', mobile);
    forwardData.append('message', message);

    // Fire and forget the forward (don't await if not critical)
    fetch(`${siteUrl}/`, {
      method: 'POST',
      body: forwardData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).catch(err => console.error('Failed to forward to Netlify Forms:', err));

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Contact function error:', error);
    return new Response(JSON.stringify({ error: 'Submission failed' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};