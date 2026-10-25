import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "manufacturing-production-software",
  metaTitle: "Manufacturing & Production Software",
  metaDescription:
    "Production software for Kenyan manufacturers: production formulas, production runs, cost per unit, raw material stock and sales in one system.",
  h1: "Production and manufacturing software for Kenyan businesses that make what they sell",
  intro: [
    "If you bake, blend, pack, bottle or assemble, your stock problem is twice as hard: raw materials go in, finished goods come out, and the cost of each unit depends on what you used to make it. Spreadsheets struggle to keep up, and the true cost per unit is often a guess.",
    "Ultimate POS lets you define production formulas, record production runs that use up raw materials and add finished goods to stock, and see what each run actually cost — then sell those goods from the same system.",
  ],
  highlights: ["Production formulas (bills of materials)", "Production runs that update stock", "True cost per unit"],
  challengesHeading: "Manufacturing headaches Ultimate POS was built for",
  challenges: [
    {
      problem: "Not knowing how much each finished product really costs to make, so prices are set on instinct.",
      solution:
        "Define a production formula — a recipe or bill of materials — for each product. Production cost reports show the cost of each run and each unit, based on the materials actually used.",
      features: ["production-formulas", "production-costing"],
    },
    {
      problem: "Raw material stock and finished goods stock tracked separately, so neither is ever right.",
      solution:
        "Each production run consumes raw materials from stock and adds finished goods to stock in one step, so both are always current.",
      features: ["production-runs", "stock-levels"],
    },
    {
      problem: "Buying raw materials without seeing which suppliers have become more expensive.",
      solution:
        "Raise purchase orders for raw materials, keep supplier ledgers, and track supplier price trends to see the cost pressure before it hits your margins.",
      features: ["purchase-orders", "supplier-price-trends"],
    },
    {
      problem: "Selling and distributing finished goods in a separate system from production.",
      solution:
        "Sell finished goods from the same system — over the counter, on credit to distributors, or through delivery orders — and see profit by product with real production costs behind it.",
      features: ["customer-credit", "delivery-orders", "profit-reports"],
    },
  ],
  story: {
    heading: "How a small manufacturer runs production on Ultimate POS",
    paragraphs: [
      "Take a bakery or a juice maker. Each product has a production formula listing the raw materials and quantities needed for a batch. Raw materials are bought on purchase orders and received into stock.",
      "When the team makes a batch, they record a production run. Ultimate POS deducts the flour, sugar or concentrate used and adds the finished loaves or bottles to stock — no separate spreadsheet needed.",
      "The production cost report shows what that run cost, and what each unit cost. If a supplier's price rises, it shows up in your supplier price trends and in your production costs.",
      "Finished goods are then sold: at the factory shop, on credit to retailers and distributors, or delivered by riders. Profit by product reports reflect what each item really cost to produce.",
    ],
  },
  gettingStarted:
    "Setting up production starts with your materials and products. We import your raw materials and finished goods from Excel or CSV, then work with you to enter a production formula for each product. Once the formulas are in place, your team records production runs as they happen, and stock, costs and reports follow. We switch on the production module — plus deliveries if you distribute your own goods — and train your team.",
  featureIds: [
    "production-formulas",
    "production-runs",
    "production-costing",
    "stock-levels",
    "stock-valuation",
    "purchase-orders",
    "supplier-price-trends",
    "customer-credit",
    "delivery-orders",
    "profit-reports",
    "batch-expiry",
    "modular-licensing",
  ],
  faqs: [
    {
      question: "What is a production formula?",
      answer:
        "A production formula is a recipe or bill of materials: the raw materials and quantities needed to make a product. Ultimate POS uses it to deduct materials and calculate costs when you record a production run.",
    },
    {
      question: "Does recording a production run update my stock?",
      answer:
        "Yes. A production run consumes the raw materials in the formula from stock and adds the finished goods to stock.",
    },
    {
      question: "Can I see the cost of each production run?",
      answer: "Yes. Production cost reports show the cost of each production run and of every unit produced.",
    },
    {
      question: "Can I also sell and deliver my finished goods with Ultimate POS?",
      answer:
        "Yes. Finished goods are sold from the same system — at the counter, on credit to customers, or through delivery orders with the deliveries module.",
    },
    {
      question: "Can I track what I owe my raw-material suppliers?",
      answer:
        "Yes. Supplier ledgers and payables show what you owe each supplier, alongside purchase orders, open orders and supplier price trends.",
    },
  ],
  related: ["wholesale-distribution-pos", "water-refill-delivery-pos", "multi-branch-business-software"],
};

export default content;
