import Breadcrumbs from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Terms & Conditions | E&DSteel',
  description:
    'Read the terms and conditions for using E&DSteel, including orders, pricing, and website usage rules.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-15">
      <Breadcrumbs />
      <h1 className="text-2xl font-bold mb-1 pt-7">Terms & Conditions</h1>

      <p className="text-gray-600 mb-10">Last updated: April 2026</p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Overview</h2>
      <p className="text-gray-600">
        This website is operated by E&DSteel. By accessing or using our site,
        you agree to be bound by these Terms & Conditions. If you do not agree,
        please do not use this website.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Products</h2>
      <p className="text-gray-600">
        All products are subject to availability. We reserve the right to modify
        or discontinue items without notice. Product images are for illustrative
        purposes only.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Pricing</h2>
      <p className="text-gray-600">
        All prices are listed in GBP (£) and may be changed at any time without
        prior notice. We reserve the right to correct pricing errors.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Orders</h2>
      <p className="text-gray-600">
        We reserve the right to refuse or cancel any order at our discretion,
        including if fraud or pricing errors are suspected.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Delivery</h2>
      <p className="text-gray-600">
        Delivery times are estimates and may vary depending on location and
        availability. Please refer to our Delivery & Returns page for more
        details.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Liability</h2>
      <p className="text-gray-600">
        We are not liable for any indirect, incidental, or consequential damages
        arising from the use of our products or website.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Changes to Terms</h2>
      <p className="text-gray-600">
        We may update these Terms & Conditions at any time. Continued use of the
        website means you accept any changes.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Contact</h2>
      <p className="text-gray-600">
        If you have any questions about these Terms, please contact us at{' '}
        <span className="font-medium">support@edsteel.co.uk</span>.
      </p>
    </div>
  );
}
