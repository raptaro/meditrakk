"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Feel free to reach out using our contact details below.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card w-full max-w-xl space-y-8 rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-semibold">Contact Details</h2>
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  text: "0999 820 5684 (Smart)",
                  href: "tel:+639998205684",
                },
                {
                  icon: Phone,
                  text: "0945 239 5382 (Globe)",
                  href: "tel:+639452395382",
                },
                {
                  icon: Mail,
                  text: "info@mediaproper.com",
                  href: "mailto:info@mediaproper.com",
                },
                {
                  icon: MapPin,
                  text: "130 Old Samson Rd. Barangay Apolonio Samson, Quezon City",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 transition-colors"
                  {...(item.href ? {} : { "aria-label": item.text })}
                >
                  <item.icon className="h-5 w-5 text-gray-400" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
