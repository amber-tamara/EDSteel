import Breadcrumbs from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Delivery & Returns | E&DSteel',
  description:
    'Find out about delivery times, costs, and how to return items purchased from E&DSteel.',
};

export default function DeliveryReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-16">
      <Breadcrumbs />

      <h1 className="text-2xl font-bold mb-1 pt-7">Delivery & Returns</h1>

      <p className="text-gray-600 mb-10">Last updated: April 2026</p>

      {/* DELIVERY */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Delivery</h2>
      <p className="text-gray-600 mb-4">
        We aim to deliver your order as quickly and reliably as possible.
      </p>

      <ul className="text-gray-600 space-y-2">
        <li>• Standard delivery: 2–5 working days</li>
        <li>• Orders are processed within 1–2 working days</li>
        <li>• Delivery costs are calculated at checkout</li>
      </ul>

      {/* RETURNS */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Returns</h2>
      <p className="text-gray-600 mb-4">
        If you’re not satisfied with your purchase, you can return it within 30
        days.
      </p>

      <ul className="text-gray-600 space-y-2">
        <li>• Items must be unused and in original packaging</li>
        <li>• Proof of purchase is required</li>
        <li>
          • Refunds are processed within 5–7 working days after receiving the
          item
        </li>
      </ul>

      {/* HOW TO RETURN */}
      <h2 className="text-lg font-semibold mt-8 mb-2">How to return an item</h2>
      <p className="text-gray-600">
        To start a return, please contact us at{' '}
        <span className="font-medium">support@edsteel.co.uk</span> with your
        order number and reason for return.
      </p>

      {/* SUPPORT */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Need help?</h2>
      <p className="text-gray-600">
        If you have any questions about your order, feel free to contact us and
        we’ll be happy to help.
      </p>
    </div>
  );
}
