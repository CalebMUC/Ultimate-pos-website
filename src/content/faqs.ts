/**
 * FAQs. Answers are plain text so they can be reused verbatim in FAQPage JSON-LD.
 * Answers must only describe confirmed capabilities (see content/features.ts).
 */

export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  {
    question: "What is Ultimate POS?",
    answer:
      "Ultimate POS is a cloud-based point of sale and business management system built in Kenya. It handles sales and M-Pesa payments at the till, stock in every branch, purchasing, customer credit, deliveries, production and reporting — all under one account.",
  },
  {
    question: "Does Ultimate POS accept M-Pesa payments?",
    answer:
      "Yes. M-Pesa is built in. You can send an STK push to the customer's phone at checkout, match incoming M-Pesa payments to sales, and review every transaction in the M-Pesa payment log, so your till and your M-Pesa statement agree.",
  },
  {
    question: "Can I manage more than one branch?",
    answer:
      "Yes. All your branches live under one account with a branch switcher. Stock is tracked per branch in real time, and you can transfer stock between branches, with an inbox for incoming transfers at the receiving branch.",
  },
  {
    question: "Can I control what my staff can see and do?",
    answer:
      "Yes. You create users and give each one a role with fine-grained permissions, so a cashier only sees what a cashier needs. A full audit log records who did what, and when.",
  },
  {
    question: "Can I import my existing products?",
    answer:
      "Yes. You can bulk import products and categories from an Excel or CSV file, so you do not have to type your catalogue in item by item. We help you with the import during setup.",
  },
  {
    question: "Which types of businesses is Ultimate POS for?",
    answer:
      "Supermarkets and minimarts, retail shops, wholesalers and distributors, pharmacies, water refilling stations, manufacturers, hardware stores, agrovets, wines and spirits shops, cosmetics shops and any business with several branches.",
  },
  {
    question: "How much does Ultimate POS cost?",
    answer:
      "Ultimate POS uses modular licensing: you switch on only the modules you need, such as deliveries, production, pharmacy, bundles or cash-up. Pricing depends on your modules, branches and users, so request a quote and we will send you a price for your business.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free demo. We show you Ultimate POS using examples from your type of business, set up your account and import your products, train your staff, and then you go live.",
  },
];
