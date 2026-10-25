import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "water-refill-delivery-pos",
  updatedAt: "2026-10-25",
  metaTitle: "Water Refilling & Delivery POS Kenya",
  metaDescription:
    "POS for water refilling stations in Kenya: refills and bundles at the counter, delivery orders, rider cash-up, trips and fuel tracking, and M-Pesa.",
  h1: "POS for water refilling stations and water delivery businesses",
  intro: [
    "A water business is really two businesses: a counter where customers walk in for refills and new bottles, and a fleet of riders delivering to homes, offices and shops across town. Both need to be counted, and both handle money.",
    "Ultimate POS handles refills and bundles at the counter, and delivery orders, rider assignment, rider cash-up, and trips and fuel on the road — so you know what was sold, what was delivered, and what each delivery really cost.",
  ],
  highlights: ["Refills and bundles at the counter", "Delivery orders and rider cash-up", "Trips and fuel tracking"],
  challengesHeading: "What makes a water business hard to run — and how we help",
  challenges: [
    {
      problem:
        "Riders collect cash and M-Pesa on their routes, and reconciling them at the end of the day takes forever.",
      solution:
        "Every delivery is a delivery order assigned to a rider. When riders return, rider cash-up compares what each one collected with what they delivered.",
      features: ["delivery-orders", "rider-cash-up"],
    },
    {
      problem: "Fuel is one of your biggest costs, but you can't tell which routes or riders are using it.",
      solution:
        "Record trips and fuel against each rider and route. You see what each delivery costs, and spot routes or vehicles that are using more than they should.",
      features: ["trips-fuel"],
    },
    {
      problem: "Selling refills, new bottles, dispensers and combo offers at the counter without a clear record.",
      solution:
        "Each product — a 20-litre refill, a new bottle, a dispenser — is set up once and sold from a fast till. Bundles let you offer a combo, like a new bottle with a refill, at one price while stock is deducted correctly.",
      features: ["pos-checkout", "bundles", "mpesa"],
    },
    {
      problem: "Regular customers and offices that pay at month-end, tracked in a notebook.",
      solution:
        "Give regular customers an account and record their deliveries as credit sales. Customer aging shows who owes you and for how long.",
      features: ["customer-credit"],
    },
  ],
  story: {
    heading: "A day at a water refilling station on Ultimate POS",
    paragraphs: [
      "At opening, the counter attendant starts a shift. Walk-in customers buy refills and pay by cash or M-Pesa; a family buying their first bottle gets the bottle-plus-refill bundle.",
      "Meanwhile, phone and WhatsApp orders become delivery orders. The supervisor assigns them to riders, and each rider heads out with a clear list of where to go.",
      "As the day goes on, every trip and fuel top-up is logged. An office that pays monthly has its delivery recorded on its account rather than collected in cash.",
      "When riders return, each one is cashed up against their deliveries. The counter shift is cashed up too, and the owner sees the day's counter sales, deliveries and fuel costs side by side.",
    ],
  },
  gettingStarted:
    "Getting a water business started is quick because the product list is short: refills, bottles, dispensers and any combos you offer. We set those up, add your riders and switch on the deliveries module, and if you have more than one station we add each one as a branch. Your counter staff and supervisors are then trained on selling, dispatching deliveries and cashing up riders.",
  featureIds: [
    "pos-checkout",
    "bundles",
    "mpesa",
    "cash-up",
    "delivery-orders",
    "rider-cash-up",
    "trips-fuel",
    "customer-credit",
    "customer-insights",
    "expenses",
    "dashboard",
    "multi-branch",
  ],
  faqs: [
    {
      question: "Can Ultimate POS manage water delivery riders?",
      answer:
        "Yes. The deliveries module covers delivery orders, assigning orders to riders, rider cash-up when they return, and trips and fuel tracking.",
    },
    {
      question: "Can I sell refill and bottle combos?",
      answer:
        "Yes. Product bundles let you sell items together at a combo price, such as a new bottle with a refill, while stock is deducted for each item.",
    },
    {
      question: "Can customers pay with M-Pesa?",
      answer:
        "Yes. M-Pesa is built in: send an STK push at the counter, match payments to sales, and review every transaction in the M-Pesa payment log.",
    },
    {
      question: "I have more than one refilling station. Can I manage them together?",
      answer:
        "Yes. Each station is a branch under one account, with its own stock and sales, and you can switch between them or transfer stock between them.",
    },
    {
      question: "Can I see which customers order most often?",
      answer:
        "Yes. Customer buying insights show who buys what and how often, which helps you look after regular households and offices and plan delivery routes around them.",
    },
  ],
  related: ["wholesale-distribution-pos", "manufacturing-production-software", "multi-branch-business-software"],
};

export default content;
