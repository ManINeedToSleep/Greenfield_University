export default function ApplicationSuccess() {
  return (
    <div className="min-h-screen bg-emerald-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-900 mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-slate-800 mb-6">
            Thank you for submitting your application. We will review it and get back to you soon.
          </p>
          <p className="text-gray-500">
            A confirmation email has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
} 