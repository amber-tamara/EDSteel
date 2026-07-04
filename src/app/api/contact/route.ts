process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(req: Request) {
  try {
    let rawBody: any = {};

    // 1. Parse the incoming request safely
    try {
      rawBody = await req.json();
    } catch (jsonErr) {
      try {
        const formData = await req.formData();
        rawBody = Object.fromEntries(formData.entries());
      } catch (formErr) {
        return Response.json(
          {
            ok: false,
            stage: 'parsing',
            jsonErr: String(jsonErr),
            formErr: String(formErr),
          },
          { status: 400 }, // Bad Request makes more sense here than a 500
        );
      }
    }

    // 2. Extract values
    const name = rawBody.name || rawBody['your-name'] || '';
    const email = rawBody.email || rawBody['your-email'] || '';
    const message = rawBody.message || rawBody['your-message'] || '';

    // 3. Reconstruct as FormData for Contact Form 7
    const wpFormData = new FormData();
    wpFormData.append('your-name', name);
    wpFormData.append('your-email', email);
    wpFormData.append('your-message', message);

    // 🔥 REQUIRED CF7 metadata
    wpFormData.append('_wpcf7', '6796');
    wpFormData.append('_wpcf7_version', '5.9.0'); // can be approximate
    wpFormData.append('_wpcf7_locale', 'en_GB');
    wpFormData.append('_wpcf7_unit_tag', 'wpcf7-f6796-p0-o1');
    wpFormData.append('_wpcf7_container_post', '0');

    try {
      // Switched to 127.0.0.1 to avoid local host file / DNS resolution issues
      // Replace your current fetch URL with this one:
      const res = await fetch(
        'http://edsteel.local/wp-json/contact-form-7/v1/contact-forms/6796/feedback',
        {
          method: 'POST',
          body: wpFormData,
        },
      );

      const wpResponseText = await res.text();

      return Response.json({
        ok: res.ok,
        wpStatus: res.status,
        wpResponse: wpResponseText,
      });
    } catch (wpErr: any) {
      return Response.json(
        {
          ok: false,
          stage: 'wordpress_fetch_failed',
          error: wpErr.message || String(wpErr),
        },
        { status: 500 },
      );
    }
  } catch (err: any) {
    return Response.json(
      { ok: false, stage: 'unknown_crash', error: err.message },
      { status: 500 },
    );
  }
}
