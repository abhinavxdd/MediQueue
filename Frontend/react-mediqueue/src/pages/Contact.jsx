import React, { useState } from "react";
import Footer from "../components/Footer";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      alert("Thanks for contacting us!");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="container mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          We’ll get back to you within 1–2 business days.
        </p>
        <div className="grid gap-8 lg:grid-cols-3">
          <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-2 border border-gray-200 dark:border-gray-700"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows="5"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-60"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Reach us
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Email: support@mediqueue.app
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              Phone: +91 98765 43210
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">Address:</p>
            <p className="text-gray-600 dark:text-gray-400">
              123 Health St, Hamirpur, HP 177001
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
