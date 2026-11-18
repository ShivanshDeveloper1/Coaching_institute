import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "918368295559";
  const message = "Hello! I visited your website and would like to connect.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-110 hover:bg-[#1ebe5d] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
    </a>
  );
}