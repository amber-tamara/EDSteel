import Breadcrumbs from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Contact Us | E&DSteel',
  description:
    'Get in touch with E&DSteel for support, enquiries, or questions about your order.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-16">
      <Breadcrumbs />

      <h1 className="text-2xl font-bold mb-1 pt-7">Contact Us</h1>

      <p className="text-gray-600 mb-10">
        We’re here to help. If you have any questions about your order,
        products, or anything else, feel free to get in touch.
      </p>

      {/* CONTACT DETAILS */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Get in touch</h2>
      <p className="text-gray-600 mb-4">
        You can contact us using the details below, and we’ll aim to respond as
        quickly as possible.
      </p>

      <ul className="text-gray-600 space-y-2">
        <li>
          <span className="font-medium">Email:</span> support@edsteel.co.uk
        </li>
        <li>
          <span className="font-medium">Response time:</span> Within 24–48 hours
        </li>
      </ul>

      {/* OPTIONAL BUSINESS INFO */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Business information</h2>
      <p className="text-gray-600">
        E&DSteel is an online retailer providing trade and home improvement
        products across the UK.
      </p>

      {/* SUPPORT */}
      <h2 className="text-lg font-semibold mt-8 mb-2">
        Need help with an order?
      </h2>
      <p className="text-gray-600">
        Please include your order number and as much detail as possible so we
        can assist you quickly.
      </p>
    </div>
  );
}
