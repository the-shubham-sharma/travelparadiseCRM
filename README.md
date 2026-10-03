# Travel Paradise CRM Workflow & Governance System

An enterprise-grade, interactive web application visualizing the complete **Travel Paradise CRM Workflow & Governance System**.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **React Flow (@xyflow/react)**.

---

## 🌟 Key Features

- **100% Authentic Source Fidelity**: Every workflow step, branch, decision condition (`YES`/`NO`), communication channel, and cross-section connection from the original source diagram has been preserved with zero omitted logic.
- **Interactive Flowchart Canvas**:
  - Pan, Zoom, and Fit-to-screen controls.
  - Section focus navigation with smooth animated camera transitions.
  - Interactive step selection with connected node and connector path highlighting.
  - Labeled decision diamond nodes with explicit `YES` and `NO` branches.
  - Custom communication channel nodes (*Phone, Email, WhatsApp, In-Person*).
  - Terminal state badges (*Completed, Lost, Cancelled, CRM Access, Data Recovery*).
  - Embedded Minimap overview navigator.
  - Fullscreen viewing mode.
- **Collapsible Sidebar & Navigation**:
  - Filter by category: *All Sections*, *Core Flow (1–6)*, *Governance*, *Analytics*.
  - Real-time search with instant filtering across all active workflow steps.
  - Jump directly to any section or specific step.
- **Node Inspector & Details Drawer**:
  - Comprehensive step metadata, section tag, and role authorization.
  - Predecessor (Incoming) and Successor (Outgoing) clickable jump buttons.
  - Associated Business Governance Rules and SLA measurements.
  - Immutability locking badges (*Rule 2*).
- **The 8 Golden Business Rules & SLA Measurement System (Section 13)**:
  - Detailed explorer for the 8 foundation business rules, First Response Time (FRT) SLA formulas, and audit immutability standards.
- **Spotlight Search (`⌘K` / `Ctrl+K`)**:
  - Instant keyboard-driven global search across nodes, sections, and rules with one-click navigation.
- **Theme Support**:
  - Full Dark Mode and Light Mode with persistent local storage.

---

## 🗂️ Workflow Sections Directory

| # | Section Name | Category | Description |
|---|---|---|---|
| **1** | **1. ENQUIRY MANAGEMENT** | Core | Omnichannel lead ingestion, client deduplication, immutable Query/Client ID generation, SLA reset, and auto-allocation. |
| **2** | **2. RESPONSE & FOLLOW-UP** | Core | Consultant assignment, 4-channel communication logging (Phone, Email, WhatsApp, In-Person), First Response Time measurement, and attention alerts. |
| **3** | **3. ENQUIRY PIPELINE** | Core | Status transitions: *Incoming* → *Quoted* → *Negotiating* → *Confirmed* vs *Lost / Cancelled* with mandatory reason recording. |
| **4** | **4. BOOKING MANAGEMENT** | Core | Gross booking creation across Air Tickets, Package Tours, Hotel Accommodations, and Visa/Forex/Transfers. |
| **5** | **5. PAYMENT & FINANCE** | Core | Customer receipts, outstanding balance tracking, supplier/vendor invoice logging, and gross profit margin calculation. |
| **6** | **6. CLOSING & CLIENT RETURN** | Core | On-tour support, completion certification, Time-to-Closure calculation, travel history archiving, and repeat client re-engagement loops. |
| **7** | **7. ADMINISTRATION** | Governance | Executive dashboard, omniscient lead visibility, user account lifecycle, bulk/temporary reassignment, immutable audit log, and query reopening safeguards. |
| **8** | **8. SECURITY & AUDIT** | Governance | MFA authentication, session recovery, role-based record filtering (Staff row-level vs Admin unrestricted), continuous event logging, and automated disaster recovery. |
| **9** | **9. REPORTS & ANALYTICS** | Analytics | Executive KPI grid (Pipeline, Follow-Ups, Staff Workload, Booking & Finance) and 8 specialized operational report generators. |
| **11** | **LOCKING & ADMIN CORRECTION** | Governance | Submitter data immutability for staff, and audited correction workflow for administrators with mandatory justification logging. |
| **13** | **BUSINESS RULES & MEASUREMENT** | Governance | 8 foundation rules governing Query/Client entities, append-only logs, terminal states, FRT SLAs, and audit governance. |

---

## 📜 The 8 Golden Business Rules

1. **Permanent Query ID & Stable Client ID**: Every genuine enquiry gets a permanent Query ID; every client gets a stable Client ID. Multiple enquiries belong to one client.
2. **Locked Submitter Data & Append-Only Activity**: Submitter fields are locked. Staff append activity rather than overwrite it. Activity chronologies retain old and new modes.
3. **Enquiry-to-Booking Linkage & Terminal States**: Every booking links to its originating enquiry. *Confirmed*, *Completed*, *Lost*, and *Cancelled* are terminal states.
4. **First Response Time (FRT) SLA**: First Response Time runs from enquiry receipt to the first qualifying outbound response.
5. **Independent Timing Measures**: Time to confirmation and Time to closure get separate measures; missing timing data is not fatal.
6. **Dynamic Follow-Up Alert Stripping**: On-screen alerts strip prior overdue follow-up alerts upon rescheduling or action logging.
7. **Lead Reassignment History**: Reassigned leads preserve full history; the previous owner's write access is revoked.
8. **Mandatory Administrative Audit Logging**: Important corrections and administrative actions are strictly audited with mandatory reason capture.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

The application is accessible at: `http://localhost:5173/`

### Production Build

```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment to Production & Custom Domain Setup

This project is **domain-independent** and ready for static hosting.

### Option 1: Vercel (Recommended)
1. Push this repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import this repository. The `vercel.json` configuration is automatically recognized.
4. Click **Deploy**.

**Connecting Custom Domain on Vercel:**
- In the Vercel project dashboard, go to **Settings → Domains**.
- Enter your custom domain (e.g., `crm.travelparadise.com` or `travelparadise.com`).
- Add the DNS records provided by Vercel in your domain registrar:
  - **A Record**: `@` → `76.76.21.21`
  - **CNAME Record**: `www` (or subdomain `crm`) → `cname.vercel-dns.com`

---

### Option 2: Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. The included `netlify.toml` automatically handles SPA routing and caching.

---

### Option 3: Docker & Nginx
You can run this app with Nginx using the included `nginx.conf`:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🛡️ License & Credits

- Designed and engineered for **Travel Paradise CRM Workflow & Governance System**.
- Built with React Flow (@xyflow/react), Vite, TypeScript, and Tailwind CSS.
