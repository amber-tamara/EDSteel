import Breadcrumbs from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Privacy Policy | E&DSteel',
  description:
    'Learn how E&DSteel collects, uses, and protects your personal information when using our website.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-15">
      <Breadcrumbs />

      <h1 className="text-2xl font-bold mb-1 pt-7">Privacy Policy</h1>

      <p className="text-gray-600 mb-10">Last updated: April 2026</p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Overview</h2>
      <p className="text-gray-600">
        E&DSteel is committed to protecting your privacy. This policy explains
        how we collect, use, and safeguard your personal information when you
        use our website.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">
        Information We Collect
      </h2>
      <p className="text-gray-600">
        We may collect personal information such as your name, email address,
        billing and shipping details, and order history when you use our site.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">
        How We Use Your Information
      </h2>
      <p className="text-gray-600">
        We use your information to process orders, provide customer support,
        improve our website, and communicate with you about your purchases.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Sharing Your Data</h2>
      <p className="text-gray-600">
        We do not sell your personal data. We may share it with trusted third
        parties such as payment providers and delivery services to fulfil your
        orders.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Cookies</h2>
      <p className="text-gray-600">
        We use cookies to enhance your browsing experience and analyse site
        traffic. You can control cookies through your browser settings.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Your Rights</h2>
      <p className="text-gray-600">
        You have the right to request access to, correction of, or deletion of
        your personal data. To do so, please contact us using the details below.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Data Security</h2>
      <p className="text-gray-600">
        We take appropriate measures to protect your personal information from
        unauthorised access, loss, or misuse.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Contact</h2>
      <p className="text-gray-600">
        If you have any questions about this Privacy Policy, please contact us
        at <span className="font-medium">support@edsteel.co.uk</span>.
      </p>
    </div>
  );
}
