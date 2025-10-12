
Valley Mix Concrete - Light Theme, Mobile-Ready, Formspree/Google Sheets Hook
=============================================================================

WHAT'S INCLUDED
- Fully responsive light theme (mobile/tablet/desktop)
- Sticky mobile action bar (Call / Get a Quote)
- Social icons linked to your real Facebook/Instagram (edit header in HTML if needed)
- Service Area map (Google Maps embed of 6005 FM 1732, Brownsville, TX)
- Quote Form with PSI selector (2500/3000/3500/4000/4500), Name, Email, Message
- Form posts via fetch() to a configurable endpoint:
  - FORM_ENDPOINT (Formspree) OR GOOGLE_APPS_SCRIPT_URL (Google Sheets)

HOW TO ENABLE FORMS (No email app needed)
Option A: Formspree (fastest)
1) Create a free Formspree form and get your endpoint URL, looks like:
   https://formspree.io/f/xxxxxxxx
2) Open /script.js and set:
   const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
   const GOOGLE_APPS_SCRIPT_URL = "";
3) Deploy. Submissions will go to Formspree (and optionally your email via Formspree settings).

Option B: Google Sheets (Apps Script)
1) Create a new Google Sheet named "Valley Mix Leads" with columns:
   timestamp, name, email, psi, message, source
2) Extensions → Apps Script → paste the code from /google_sheets_appscript_example.gs
3) Deploy:
   - Click "Deploy" → "New deployment" → Type: Web app
   - Who has access: "Anyone"
   - Copy the Web app URL
4) In /script.js, set:
   const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/xxxxxxxx/exec";
   const FORM_ENDPOINT = "";   // leave empty to use Sheets only

TECH NOTES
- If both FORM_ENDPOINT and GOOGLE_APPS_SCRIPT_URL are set, the form will try Formspree first and fallback to Sheets on error.
- Success and error messages are displayed inline; no mail client opens.
- PSI selector value is included in the payload.

Support: send me your chosen endpoint and I'll wire it in for you.
