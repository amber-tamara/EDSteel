'use client';
import Breadcrumbs from '@/components/ui/Breadcrumb';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    captcha: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.captcha) {
      alert("Please confirm you're not a robot");
      return;
    }

    // TODO: hook this into your API route
    console.log(form);
    alert('Message sent (not really yet)');
  };

  return (
    <div className="mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* LEFT SIDE - INFO */}
      <div className="space-y-6">
        <Breadcrumbs />
        <div>
          <h1 className="text-3xl font-semibold mb-2">Contact Us</h1>
          <p className="text-gray-600">
            Get in touch with any questions or enquiries.
          </p>
        </div>

        <div>
          <h2 className="font-medium">Address</h2>
          <p className="text-gray-600">
            28–30 Chesterfield Road
            <br />
            Dronfield
            <br />
            S18 2XB
          </p>
        </div>

        <div>
          <h2 className="font-medium">Opening Hours</h2>
          <p className="text-gray-600">
            Mon – Fri: 9:00 – 17:30
            <br />
            Sat: 9:00 – 16:00
            <br />
            Sun: Closed
          </p>
        </div>

        <div>
          <h2 className="font-medium">Phone</h2>
          <a href="tel:+441234567890" className="text-blue-600 hover:underline">
            01246 413242
          </a>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 space-y-4 shadow-sm"
      >
        <h2 className="text-xl font-semibold">Send a Message</h2>

        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />

        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* SIMPLE CAPTCHA */}
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            name="captcha"
            checked={form.captcha}
            onChange={handleChange}
          />
          <span>I am not a robot</span>
        </label>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
        >
          Send Message
        </button>
      </form>
      {/* MAP */}
      <div className="md:col-span-2 space-y-2 mt-6">
        <h2 className="font-medium">Find Us</h2>

        <div className="w-full h-80 rounded-xl overflow-hidden border">
          <iframe
            src="https://www.google.com/maps?q=28-30+Chesterfield+Road+Dronfield+S18+2XB&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=28-30+Chesterfield+Road+Dronfield+S18+2XB"
          target="_blank"
          className="text-blue-600 text-sm hover:underline"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
