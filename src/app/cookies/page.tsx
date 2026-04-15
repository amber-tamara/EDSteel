import Breadcrumbs from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Cookie Policy | E&DSteel',
  description:
    'Learn how E&DSteel uses cookies to improve your browsing experience and how you can manage your preferences.',
};

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-16">
      <Breadcrumbs />

      <h1 className="text-2xl font-bold mb-1 pt-7">Cookie Policy</h1>

      <p className="text-gray-600 mb-10">Last updated: April 2026</p>

      <h2 className="text-lg font-semibold mt-8 mb-2">What Are Cookies?</h2>
      <p className="text-gray-600">
        Cookies are small text files stored on your device when you visit a
        website. They help improve your experience by remembering preferences
        and understanding how the site is used.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">How We Use Cookies</h2>
      <p className="text-gray-600">
        We use cookies to ensure our website functions properly, to analyse
        traffic, and to improve your browsing experience.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">
        Types of Cookies We Use
      </h2>
      <ul className="text-gray-600 space-y-2">
        <li>• Essential cookies – required for the website to function</li>
        <li>
          • Analytics cookies – help us understand how visitors use our site
        </li>
      </ul>

      <h2 className="text-lg font-semibold mt-8 mb-2">Managing Cookies</h2>
      <p className="text-gray-600">
        You can control or disable cookies through your browser settings. Please
        note that disabling cookies may affect how the website functions.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Contact</h2>
      <p className="text-gray-600">
        If you have any questions about our use of cookies, please contact us at{' '}
        <span className="font-medium">support@edsteel.co.uk</span>.
      </p>
    </div>
  );
}
