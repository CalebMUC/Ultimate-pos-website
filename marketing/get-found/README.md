# Step 2: Get found

Everything needed to put Ultimate POS on Google, Bing and social media. Text in the grey boxes
is ready to copy and paste. Images are in [`images/`](images/).

Every profile must use exactly the same **name, phone and website**. Google trusts a business
more when its details match everywhere.

| Field   | Use exactly                                                   |
| ------- | ------------------------------------------------------------- |
| Name    | Ultimate POS                                                  |
| Phone   | 0720 463 710 (international: +254 720 463 710)                |
| Website | https://ultimatepos.co.ke                                     |
| Email   | sales@ultimatepos.co.ke                                       |
| Hours   | Monday to Saturday, 8:00am to 6:00pm. Closed on Sunday        |
| Area    | Based on Kiambu Road, Kiambu. Serving businesses across Kenya |
| Tagline | Ultimate solution for your business                           |

## Order of work

1. [ ] Google Search Console (about 15 minutes, plus DNS wait). [Jump](#1-google-search-console)
2. [ ] Bing Webmaster Tools (5 minutes, after step 1). [Jump](#2-bing-webmaster-tools)
3. [ ] Google Business Profile (30 minutes, then verification takes a few days). [Jump](#3-google-business-profile)
4. [ ] WhatsApp Business profile (10 minutes). [Jump](#4-whatsapp-business-profile)
5. [ ] Facebook, Instagram and LinkedIn pages (about 1 hour). [Jump](#5-social-media-profiles)
6. [ ] TikTok, YouTube and X: only once you have videos or regular posts to put there
7. [ ] Send the new profile links to the developer so they are added to the website. [Jump](#6-send-these-back)

None of this needs a rebuild on the server the live POS runs on.

---

## 1. Google Search Console

Shows which Google searches bring people to the site, and tells Google about every page.

Use the **Domain** method. It is verified with a DNS record at HostPinnacle, so nothing on the
website or the server changes, and it covers `www.` and every subdomain at once.

1. Go to <https://search.google.com/search-console> and sign in with the Google account the
   business will keep long term (not a personal account that might leave with an employee).
2. Click **Add property** and choose **Domain** (the left box). Type `ultimatepos.co.ke` and click **Continue**.
3. Google shows a **TXT record** starting with `google-site-verification=`. Click **Copy**.
4. In a new tab, log in to **HostPinnacle**. Open **Domains → My Domains → ultimatepos.co.ke → Manage → DNS Management**
   (if the DNS is hosted in a cPanel account, use **cPanel → Zone Editor** instead).
5. Add a record:
   - Type: `TXT`
   - Host / Name: `@` (or leave empty, or `ultimatepos.co.ke`, whichever the form accepts)
   - Value: paste the whole `google-site-verification=…` text
   - TTL: default
6. Save, then go back to Search Console and click **Verify**. If it fails, wait an hour and try again (DNS can take up to 48 hours).
   **Do not delete the TXT record afterwards.** Google checks it regularly.
7. Submit the sitemap. In the left menu open **Sitemaps**, enter `https://ultimatepos.co.ke/sitemap.xml` and click **Submit**.
8. Ask Google to index the most important pages now. Paste each URL into the search bar at the top
   (**URL inspection**), then click **Request indexing**:

   ```
   https://ultimatepos.co.ke/
   https://ultimatepos.co.ke/features
   https://ultimatepos.co.ke/pricing
   https://ultimatepos.co.ke/request-demo
   https://ultimatepos.co.ke/solutions
   https://ultimatepos.co.ke/solutions/supermarket-minimart-pos
   https://ultimatepos.co.ke/solutions/pharmacy-chemist-pos
   https://ultimatepos.co.ke/solutions/hardware-shop-pos
   ```

9. Optional: **Settings → Users and permissions → Add user** to give the developer "Full" access.

Data starts appearing after 2 to 3 days.

## 2. Bing Webmaster Tools

Bing also powers search in Microsoft Edge, Windows, DuckDuckGo and Yahoo. Do this after Search Console is verified.

1. Go to <https://www.bing.com/webmasters> and sign in (the same Google account works).
2. Choose **Import from Google Search Console**, allow access, tick `ultimatepos.co.ke` and click **Import**.
   The site is verified straight away, and the sitemap is imported with it.
3. If the import does not offer the site, use **Add site manually → DNS (CNAME)**, and add that record at HostPinnacle the same way as step 1.

## 3. Google Business Profile

This is what appears in Google Maps and on the right of Google search results when someone
searches for "POS system Kiambu" or "Ultimate POS".

Ultimate POS has no walk-in office, so set it up as a **service-area business** (the address is used only to verify and is never shown).

### Create the profile

1. Go to <https://business.google.com/create> with the same Google account as Search Console.
2. Business name: **Ultimate POS**
   > Use only the real name. Adding words like "POS System Kenya" to the name breaks Google's rules and can get the profile suspended.
3. Business category: **Software company**
4. "Do you want to add a location customers can visit?": **No**
5. Service areas: add the places you actually serve (up to 20). Suggested start:

   ```
   Kiambu County
   Nairobi County
   Murang'a County
   Machakos County
   Kajiado County
   Nakuru County
   Nyeri County
   Mombasa County
   Kisumu County
   Uasin Gishu County
   ```

6. Phone: `0720 463 710`. Website: use the address below. The `utm_` part lets the website's analytics
   tell visits from Google Maps apart from other Google visits:

   ```
   https://ultimatepos.co.ke/?utm_source=google&utm_medium=organic&utm_campaign=business_profile
   ```

7. When asked for an address for verification, enter the real business address on Kiambu Road. It stays hidden.

### Verify

Google usually asks for a **video** recording. Plan it before you press record, and record it in one take, with no cuts:

- Start outside: show the street sign or a landmark on Kiambu Road, then the building.
- Walk to where the business is run, and show business equipment (the computers, POS demo devices, any printers or scanners).
- Show proof you manage the business. For example, open the Ultimate POS admin dashboard on screen, or show a
  business document (business registration or KRA PIN certificate) with the name "Ultimate POS".

Verification normally takes 1 to 5 working days. The profile is not public until it is verified.

### Fill in the profile (after creating it)

**Description** (Edit profile → Business information → Description; 702 of 750 characters used):

```
Ultimate POS is cloud point of sale (POS) and business management software built in Kenya. It helps shops, supermarkets, pharmacies, hardware stores, agrovets, wholesalers and manufacturers sell faster, control stock and see their profit in real time.

M-Pesa payments are built in, so every till payment is matched to the sale automatically. Run one shop or many branches from one system: stock per branch, transfers between branches, purchase orders, supplier and customer accounts, staff roles, cash-up and shift reports.

We set up your branches, import your products from Excel, and train your cashiers, storekeepers and managers. Based on Kiambu Road, Kiambu, and serving businesses across Kenya.
```

**Hours:** Monday to Saturday 8:00am to 6:00pm. Sunday closed.

**Opening date:** the month and year Ultimate POS started.

**Services** (Edit services). Add each one under "Software company":

| Service                             | Description (paste)                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| POS software                        | Cloud point of sale software for Kenyan businesses: fast checkout, receipts, discounts, cash-up and shift reports.     |
| M-Pesa POS integration              | M-Pesa till payments recorded and matched to each sale automatically, so cash-up is quick and accurate.                |
| Stock management software           | Real-time stock per branch, adjustments, transfers, batch and expiry tracking, and bulk import from Excel or CSV.      |
| Multi-branch business software      | Run every branch from one system, with stock, sales and reports for each branch and for the whole business.            |
| Supermarket and minimart POS        | POS and stock control for supermarkets and minimarts, with M-Pesa built in.                                            |
| Pharmacy POS                        | POS for pharmacies and chemists, with batch and expiry tracking.                                                       |
| Hardware shop POS                   | POS for hardware stores: units, bulk items and stock across branches.                                                  |
| Wholesale and distribution software | Customer accounts, credit sales, purchase orders and supplier management for wholesalers and distributors.             |
| POS setup and staff training        | We set up your branches and users, import your products and train your staff before you go live.                       |
| Free POS demo                       | A free walk-through of Ultimate POS using examples from your type of business. Book at ultimatepos.co.ke/request-demo. |

**Photos** (Photos → Add photos):

| What                   | File                                        |
| ---------------------- | ------------------------------------------- |
| Logo                   | `images/google-business-logo-1080.png`      |
| Cover photo            | `images/google-business-cover-1080x608.png` |
| At least 3 real photos | Take them yourself (see below)              |

Google ranks profiles with real photos higher than ones with only designed images. Good ones to add:
the team at work, Ultimate POS running at a client's till (with the client's permission), the dashboard
on a laptop, a staff training session. Add a few new photos every month.

### Get reviews (most important for ranking)

After verification, open the profile, click **Ask for reviews** and copy the link. Send it to every
existing client, one at a time, on WhatsApp:

```
Hi {name}, thank you for using Ultimate POS at {business}. Would you take a minute to share your experience on Google? It really helps other Kenyan businesses find us: {review link}
```

Rules: never offer a discount or gift for a review, and never post reviews yourself or ask staff
to. Google removes them and can suspend the profile. Reply to every review, good or bad, within a few days.

### First 3 posts (Add update)

Post once a week. Each post can have a button; use **Book** or **Learn more** with the link shown.

1. **Welcome**

   ```
   Ultimate POS is now on Google. We help Kenyan shops, supermarkets, pharmacies and wholesalers sell faster with M-Pesa built in, control stock in every branch and see their profit in real time. Book a free demo and we'll show you how it works for your type of business.
   ```

   Button: Book → `https://ultimatepos.co.ke/request-demo?utm_source=google&utm_medium=organic&utm_campaign=business_profile`

2. **M-Pesa**

   ```
   Tired of matching M-Pesa messages to sales at the end of the day? Ultimate POS records every till payment against the sale automatically, so cash-up takes minutes, not hours.
   ```

   Button: Learn more → `https://ultimatepos.co.ke/features?utm_source=google&utm_medium=organic&utm_campaign=business_profile`

3. **Multi-branch**
   ```
   Opening a second branch? See the stock, sales and profit of every branch from one dashboard, move stock between branches and control what each staff member can do.
   ```
   Button: Learn more → `https://ultimatepos.co.ke/solutions/multi-branch-business-software?utm_source=google&utm_medium=organic&utm_campaign=business_profile`

---

## 4. WhatsApp Business profile

The website sends many visitors straight to WhatsApp, so this profile is often the first thing a lead sees.
In the **WhatsApp Business** app: **Settings → Business tools → Business profile**.

- Profile photo: `images/profile-picture-white-1080.png`
- Name: `Ultimate POS`
- Category: `Software` (or `IT Services`)
- Description:
  ```
  Ultimate solution for your business. Cloud POS for Kenyan businesses: M-Pesa built in, stock control, multi-branch and real-time reports. Free demo.
  ```
- Hours: Monday to Saturday 8:00am to 6:00pm
- Email: `sales@ultimatepos.co.ke`
- Website: `https://ultimatepos.co.ke`

**Business tools → Greeting message** (sent to new chats):

```
Hi, thanks for contacting Ultimate POS! Tell us your type of business and how many branches you have, and we'll show you how Ultimate POS can help. We reply within 1 business day, usually much sooner.
```

**Business tools → Away message** (outside business hours):

```
Thanks for your message! We're open Monday to Saturday, 8am to 6pm, and will reply first thing. You can also book a free demo any time at ultimatepos.co.ke/request-demo
```

---

## 5. Social media profiles

Try to get the **same handle on every network**. Check them in this order and use the first one that is free everywhere:

1. `ultimateposke`
2. `uposkenya`
3. `ultimatepos.ke` (Instagram and TikTok only allow dots)

Use these images on every network:

- Profile picture: `images/profile-picture-white-1080.png`, or `profile-picture-green-1080.png` if you
  prefer the green one. Both keep the logo inside the circle the networks crop to.
- Covers: the file named after each network in `images/`.

### Facebook page

Start at <https://www.facebook.com/pages/create>.

- Page name: `Ultimate POS`
- Category: `Software Company`
- Bio (101 characters max; 96 used):
  ```
  Ultimate solution for your business. Cloud POS for Kenya with M-Pesa built in. Book a free demo.
  ```
- Profile picture: `profile-picture-white-1080.png`. Cover: `facebook-cover-1640x624.png`
- Contact: phone, email, website (`https://ultimatepos.co.ke/?utm_source=facebook&utm_medium=social&utm_campaign=profile`)
- Location: tick "service area" / do not show a street address. Hours as above.
- Action button: **Send WhatsApp message** (connect the 0720 463 710 WhatsApp Business number)
- Link the page to Instagram (**Settings → Linked accounts**) so you can post to both at once.

### Instagram (business account)

Create it from the Facebook page (**Settings → Linked accounts → Instagram**) so it becomes a business account automatically.

- Name: `Ultimate POS`
- Category: `Software Company`
- Bio (150 characters max; 122 used):
  ```
  Ultimate solution for your business 🇰🇪
  Cloud POS: M-Pesa built in, stock control, every branch in one system.
  Free demo ⬇️
  ```
- Link: `https://ultimatepos.co.ke/request-demo?utm_source=instagram&utm_medium=social&utm_campaign=profile`
- Contact buttons: WhatsApp (0720 463 710) and Email.

### LinkedIn company page

Start at <https://www.linkedin.com/company/setup/new/> (you need a personal LinkedIn account first).

- Name: `Ultimate POS`. Public URL: `linkedin.com/company/ultimatepos` (or your chosen handle)
- Website: `https://ultimatepos.co.ke/?utm_source=linkedin&utm_medium=social&utm_campaign=profile`
- Industry: `Software Development`. Company size: your real size. Type: `Privately Held`
- Logo: `profile-picture-white-1080.png`. Cover: `linkedin-cover-1128x191.png`
- Tagline (120 max; 107 used):
  ```
  Ultimate solution for your business: cloud POS for Kenya with M-Pesa built in, stock control, multi-branch.
  ```
- Overview:
  ```
  Ultimate POS is cloud point of sale and business management software built in Kenya.

  We help supermarkets, retail shops, pharmacies, hardware stores, agrovets, wholesalers, distributors and manufacturers sell faster, control their stock and see their profit in real time, across every branch.

  What's included:
  • Fast checkout with M-Pesa payments built in
  • Real-time stock per branch, transfers, batch and expiry tracking
  • Purchase orders, suppliers, customer accounts and credit sales
  • Staff roles and permissions, cash-up and shift reports
  • Sales, profit and stock reports for each branch and the whole business

  We set up your branches, import your products from Excel and train your staff, then stay a phone call or WhatsApp message away.

  Based on Kiambu Road, Kiambu. Serving businesses across Kenya.
  Book a free demo: ultimatepos.co.ke/request-demo
  ```
- Ask the team to list Ultimate POS as their employer, so the page appears on their profiles.

### Later: TikTok, YouTube and X

Create these when you have short videos (TikTok, YouTube) or regular updates (X). An empty profile looks worse than none.
Reserve the handle now if you like, so nobody else takes it.

| Network | Image                                            | Bio                                                                                                                                         |
| ------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| TikTok  | profile picture                                  | `Cloud POS for Kenyan businesses. M-Pesa built in. Free demo ⬇️` (80 max; 62 used)                                                          |
| YouTube | profile picture + `youtube-banner-2560x1440.png` | Use the LinkedIn overview                                                                                                                   |
| X       | profile picture + `x-header-1500x500.png`        | `Ultimate solution for your business. Cloud POS for Kenya: M-Pesa built in, stock control, every branch in one system.` (160 max; 117 used) |

Website links: replace `instagram` in the Instagram link with `tiktok`, `youtube` or `x`.

---

## 6. Send these back

Once a profile is live, send its link to the developer. It is then added to the website footer and to
the site's structured data, which tells Google these profiles belong to the same business:

- [ ] Google Business Profile link (from the profile: **Share profile**)
- [ ] Facebook page link
- [ ] Instagram link
- [ ] LinkedIn page link
- [ ] TikTok / YouTube / X links (when created)

They go in `social` in `src/config/site.ts`.

---

To regenerate the images (for example after getting a higher-resolution logo), run
`python scripts/build_social_assets.py` from the repo root.
