'use client';

import Breadcrumbs from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const body = new FormData();

      body.append('your-name', form.name.trim());
      body.append('your-email', form.email.trim());
      body.append('your-message', form.message.trim());

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || data.status !== 'mail_sent') {
        throw new Error(data?.message || 'Failed to send message');
      }

      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Breadcrumbs />
        <h1 className="font-semibold text-4xl pt-4">Contact Us</h1>
      </div>

      <div className="mx-auto py-10 grid md:grid-cols-2 gap-10">
        <div className="space-y-6 bg-white border rounded-2xl p-6">
          <h2 className="font-semibold text-xl border-b pb-4">
            Contact details
          </h2>

          <div className="flex">
            <FaPhone size={25} className="mr-2" />
            <a href="tel:+441234567890" className="text-black hover:underline">
              01246 413242
            </a>
          </div>

          <div className="flex">
            <FaEnvelope size={25} className="mr-2" />
            <p>edsteel@support.com</p>
          </div>

          <div className="flex">
            <FaMapMarkerAlt size={25} className="mr-2" />
            <p>28–30 Chesterfield Road, Dronfield, S18 2XB</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2 pt-5">
              Opening times
            </h2>

            <div className="space-y-3">
              <div>
                <p className="font-bold">Monday – Friday</p>
                <p>9:00 – 17:30</p>
              </div>

              <div>
                <p className="font-bold">Saturday</p>
                <p>9:00 – 16:00</p>
              </div>

              <div>
                <p className="font-bold">Sunday</p>
                <p>Closed</p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-2xl p-6 space-y-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold border-b pb-4">
            Send a message
          </h2>

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

          <Button
            label={loading ? 'Sending...' : 'Send message'}
            className="flex w-full"
            disabled={loading}
          />

          {success && (
            <p className="text-green-600 text-sm">Message sent successfully.</p>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <div className="md:col-span-2 space-y-2 mt-6">
          <h2 className="font-semibold text-xl">Find Us</h2>

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
    </div>
  );
}
