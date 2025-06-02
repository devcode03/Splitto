import React, { useState } from "react";
import FaqImg from "../assets/undraw_faq_h01d.svg";
const faqs = [
  {
    question: "Is Splitto free to use?",
    answer:
      "Yes! Splitto is completely free for personal use. We may offer premium features for groups or businesses in the future.",
  },
  {
    question: "How do I invite friends?",
    answer:
      "Just share your group link or invite friends by email from your dashboard. They’ll get instant access to your shared expenses.",
  },
  {
    question: "Can I settle up with real payments?",
    answer:
      "Splitto helps you track who owes what. For payments, you can record cash, or link out to your favorite payment app.",
  },
  {
    question: "Is my data private?",
    answer:
      "Absolutely. We never share your data with third parties, and all your information is encrypted.",
  },
  {
    question: "Need more help?",
    answer:
      'Contact our support team anytime at <a href="/contact">Contact</a>.',
    isHtml: true,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="faq-page">
      <img
        src={FaqImg}
        alt="FaqImg"
        style={{ height: "180px", width: "100%" }}
      />
      <h1 style={{ margin: "0" }}>Frequently Asked Questions</h1>
      <div className="faq-accordion">
        {faqs.map((faq, idx) => (
          <div
            className={`faq-item${openIndex === idx ? " open" : ""}`}
            key={idx}
          >
            <button
              className="faq-question"
              onClick={() => toggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              <span>{faq.question}</span>
              <span className="faq-toggle">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>
            <div
              className="faq-answer"
              id={`faq-answer-${idx}`}
              style={{ display: openIndex === idx ? "block" : "none" }}
            >
              {faq.isHtml ? (
                <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
              ) : (
                <span>{faq.answer}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FAQ;
