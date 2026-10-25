import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "multi-branch-business-software",
  metaTitle: "Multi-Branch Business Software",
  metaDescription:
    "Run every branch from one account: real-time stock per branch, stock transfers with an inbox, roles, permissions, an audit log and cloud access.",
  h1: "Multi-branch business management software: every branch, one account",
  intro: [
    "Opening a second or third branch is a sign of success — and the moment many owners lose sight of their business. You can't be in every shop at once, stock moves between branches without proper records, and each manager runs things their own way.",
    "Ultimate POS puts every branch under one account. Each branch keeps its own real-time stock and sales, stock moves between branches with proper transfers, staff only see what their role allows, and an audit log shows who did what — wherever you happen to be.",
  ],
  highlights: ["All branches in one account", "Stock transfers with an inbox", "Roles, permissions and audit log"],
  challengesHeading: "The problems of growing to many branches — solved",
  challenges: [
    {
      problem: "Driving from branch to branch just to find out how each one is doing.",
      solution:
        "Ultimate POS is cloud-based. Use the branch switcher to look at any branch's sales, stock and reports from wherever you are.",
      features: ["multi-branch", "cloud", "dashboard"],
    },
    {
      problem: "Stock moved between branches on a phone call, with nobody sure whether it arrived.",
      solution:
        "Record stock transfers between branches. The receiving branch sees incoming stock in its transfer inbox, so every transfer has a clear trail from one shop to the other.",
      features: ["stock-adjustments-transfers", "stock-levels"],
    },
    {
      problem: "Managers and cashiers in different branches with access to more than they need.",
      solution:
        "Create users and give each one a role with fine-grained permissions, so every person sees and does only what their job requires.",
      features: ["roles-permissions"],
    },
    {
      problem: "Something goes wrong in a branch, and nobody knows who did it or when.",
      solution:
        "The audit log records who did what across the whole business, so questions are answered with facts — and staff know their actions are recorded.",
      features: ["audit-log"],
    },
  ],
  story: {
    heading: "Running a chain of branches with Ultimate POS",
    paragraphs: [
      "Each morning, the owner opens Ultimate POS from wherever they are and switches between branches to check yesterday's sales, cash-ups and stock status.",
      "One branch is running low on a fast seller while another has too much. The owner, or the branch manager if their role allows, creates a stock transfer, and the receiving branch takes it in from its transfer inbox.",
      "A new cashier joins one of the branches. They get their own login with a cashier role that gives them only the access a cashier needs.",
      "When a question comes up — a price changed, a refund issued — the audit log shows exactly who did it and when. As the business grows, new branches are added to the same account and the same way of working.",
    ],
  },
  gettingStarted:
    "Moving a group of branches onto Ultimate POS can be done branch by branch or all at once, whichever suits you. We import your products once for the whole business, set up each branch with its own stock, and create users with roles for owners, managers and cashiers. Each branch team is trained on the till, cash-ups and transfers, and you have a view of every branch from day one.",
  featureIds: [
    "multi-branch",
    "stock-levels",
    "stock-adjustments-transfers",
    "roles-permissions",
    "audit-log",
    "cloud",
    "cash-up",
    "dashboard",
    "profit-reports",
    "stock-reports",
    "purchase-orders",
    "modular-licensing",
  ],
  faqs: [
    {
      question: "Can I manage all my branches from one account?",
      answer:
        "Yes. All branches live under one account with a branch switcher, and each branch has its own real-time stock and sales.",
    },
    {
      question: "How do stock transfers between branches work?",
      answer:
        "You record a stock transfer from one branch to another, and the receiving branch sees it in its inbox for incoming transfers, so every transfer is tracked.",
    },
    {
      question: "Can I control what staff in each branch can see?",
      answer:
        "Yes. Users are given roles with fine-grained permissions, and a full audit log records who did what, and when.",
    },
    {
      question: "Can I check on my branches when I'm travelling?",
      answer:
        "Yes. Ultimate POS is cloud-based, so you can access every branch from anywhere with an internet connection.",
    },
    {
      question: "Can I add a new branch later?",
      answer:
        "Yes. When you open a new branch, talk to us and we add it to your account, with its own stock and users, working the same way as your other branches.",
    },
  ],
  related: ["supermarket-minimart-pos", "wholesale-distribution-pos", "pharmacy-chemist-pos"],
};

export default content;
