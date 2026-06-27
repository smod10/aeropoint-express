const Contact = () => (
  <div className="bg-slate-50 min-h-screen pb-20 pt-28">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Contact</h1>
      <p className="text-slate-600 mb-10">Need help? Reach out to our support team anytime.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Customer support</h2>
          <p className="text-slate-600">support@aeropointexpress.com</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Phone</h2>
          <p className="text-slate-600">+234 800 123 4567</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Office</h2>
          <p className="text-slate-600">Lagos, Nigeria</p>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
