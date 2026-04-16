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
    <div>
      <div className="px-4">
        <Breadcrumbs />
        <h1 className="font-semibold text-4xl pt-4">Contact Us</h1>
      </div>
      <div className="mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE - INFO */}
        <div className="space-y-6 bg-white border rounded-2xl p-6">
          <div>
            <h2 className="font-semibold text-xl border-b pb-4">
              Contact details
            </h2>
          </div>
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

        {/* RIGHT SIDE - FORM */}
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

          {/* SIMPLE CAPTCHA */}
          <label className="flex items-center space-x-2 text-sm m-0 mb-1">
            <input
              type="checkbox"
              name="captcha"
              checked={form.captcha}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <span>I am not a robot</span>
          </label>
          <Button label="Send message" className="flex w-full" />
        </form>
        {/* MAP */}
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
