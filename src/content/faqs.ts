/**
 * FAQs. Answers are plain text so they can be reused verbatim in FAQPage JSON-LD.
 * Answers must only describe confirmed capabilities (see content/features.ts).
 */

import { site } from "@/config/site";

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

const faq = (question: string, answer: string): Faq => ({ question, answer });
const homeFaq = (question: string) => {
  const found = homeFaqs.find((f) => f.question === question);
  if (!found) throw new Error(`Unknown home FAQ: ${question}`);
  return found;
};

/** Pricing page FAQ. No prices, payment terms or fees until they are confirmed. */
export const pricingFaqs: Faq[] = [
  faq(
    "How is Ultimate POS priced?",
    "Ultimate POS uses modular licensing. Your price depends on the modules you switch on — such as deliveries, production, pharmacy, bundles or cash-up — and on the number of branches and users or tills you need. Request a quote and we will send you a price in shillings for your business.",
  ),
  faq(
    "Is the demo really free?",
    "Yes. A demo is free and there is no obligation. We show you Ultimate POS using examples from your type of business, on-site, on a video call or over the phone.",
  ),
  faq(
    "Do I pay for modules I don't use?",
    "No. You switch on only the modules your business needs, and leave out the rest. If your business grows into new areas — deliveries or a second branch, for example — talk to us about adding them.",
  ),
  faq(
    "Do I need to buy a server?",
    "No. Ultimate POS is cloud-based, so there is no server to buy or maintain at your premises. You and your team log in over the internet, and updates are applied automatically.",
  ),
  faq(
    "What about hardware like receipt printers and barcode scanners?",
    "Tell us on the quote form whether you need hardware, and list what you have in mind. We will discuss it with you when we go through your quote.",
  ),
];

/** The /faq page, grouped by topic. */
export const faqGroups: { id: string; title: string; faqs: Faq[] }[] = [
  {
    id: "getting-started",
    title: "Getting started",
    faqs: [
      homeFaq("What is Ultimate POS?"),
      homeFaq("Which types of businesses is Ultimate POS for?"),
      homeFaq("How do I get started?"),
      homeFaq("Can I import my existing products?"),
    ],
  },
  {
    id: "features",
    title: "Features",
    faqs: [
      homeFaq("Does Ultimate POS accept M-Pesa payments?"),
      homeFaq("Can I manage more than one branch?"),
      homeFaq("Can I control what my staff can see and do?"),
      faq(
        "Can I sell on credit to my customers?",
        "Yes. Customers can have accounts for credit sales. Receivables and the customer aging report show who owes you, how much, and for how long.",
      ),
      faq(
        "Does Ultimate POS track expiry dates?",
        "Yes. Batch and expiry tracking records the batch and expiry date of your stock, and expiry reports show what is approaching its date — useful for pharmacies, agrovets and anyone selling products with a shelf life.",
      ),
      faq(
        "Can Ultimate POS manage deliveries and riders?",
        "Yes. The deliveries module covers delivery orders, assigning orders to riders, rider cash-up, and trips and fuel tracking.",
      ),
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    faqs: [pricingFaqs[0], pricingFaqs[1], pricingFaqs[2], pricingFaqs[3]],
  },
  {
    id: "support",
    title: "Support and your data",
    faqs: [
      faq(
        "How do I reach you if I need help?",
        `WhatsApp or call us on ${site.phone.display}, or email ${site.email.sales}. We are available ${site.hours.display}.`,
      ),
      faq(
        "Can I check my business when I'm away from the shop?",
        "Yes. Ultimate POS is cloud-based, so you can log in from anywhere with an internet connection and see sales, stock and reports for every branch.",
      ),
      faq(
        "How do you handle the details I send through this website?",
        "We use them only to respond to your enquiry. Our privacy policy explains what we collect, who we share it with, how long we keep it and how to exercise your rights under the Kenya Data Protection Act, 2019.",
      ),
    ],
  },
];
