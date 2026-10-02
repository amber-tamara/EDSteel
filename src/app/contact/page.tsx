'use client';

import Breadcrumbs from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useActionState } from 'react';
import { sendEmail } from '../actions/email';

export type ActionState = {
  success?: boolean;
  error?: string;
} | null;

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState<ActionState>(
    sendEmail,
    null,
  );

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
          action={formAction}
          className="bg-white border rounded-2xl p-6 space-y-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold border-b pb-4">
            Send a message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            disabled={isPending}
            className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            disabled={isPending}
            className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={4}
            disabled={isPending}
            className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <Button
            label={isPending ? 'Sending...' : 'Send message'}
            className="flex w-full"
            disabled={isPending}
          />

          {state?.success && (
            <p className="text-green-600 text-sm">Message sent successfully.</p>
          )}

          {state?.error && (
            <p className="text-red-600 text-sm">{state?.error}</p>
          )}
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
