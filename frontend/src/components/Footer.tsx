export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Product</h4>
          <ul className="space-y-1">
            <li>Features</li>
            <li>Pricing</li>
            <li>Demo</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>GDPR</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        © 2025 MindVault Inc. All rights reserved.
      </div>
    </footer>
  );
}
