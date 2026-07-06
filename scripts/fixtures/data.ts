// FIXTURE / MOCK DATA ONLY.
// All properties, developers, projects, unit numbers, and document text below are
// entirely fictional, invented for the PropertyDoc demo app. Any resemblance to real
// Dubai off-plan listings or legal documents is coincidental. Do not treat any figure,
// clause, or quote in this file as real financial or legal information.

export type DocType = "BROCHURE" | "SPA" | "PAYMENT_PLAN" | "MARKET_REPORT" | "OTHER";
export type ThreadType = "GENERAL" | "FINANCIAL" | "LEGAL" | "LOCATION";
export type Severity = "HIGH" | "MEDIUM" | "LOW";

export type PageBlock = {
  anchorId: string;
  heading: string;
  paragraphs: string[];
};

export type DocFixture = {
  id: string;
  type: DocType;
  title: string;
  pages: PageBlock[];
};

export type CitationRef = { docId: string; anchorId: string; snippet: string };

export type ChatMessageFixture = {
  role: "USER" | "ASSISTANT";
  content: string;
  citations?: CitationRef[];
};

export type ThreadFixture = {
  type: ThreadType;
  messages: ChatMessageFixture[];
};

export type AuditFindingFixture = {
  docId: string;
  anchorId: string;
  clauseRef: string;
  title: string;
  quote: string;
  severity: Severity;
  explanation: string;
  recommendation: string;
};

export type ExtractionFieldFixture = {
  key: string;
  label: string;
  value: string;
  confidence: number;
  docId?: string;
  anchorId?: string;
};

export type PropertyFixture = {
  id: string;
  name: string;
  developer: string;
  area: string;
  status: "TRACKING" | "UNDER_REVIEW" | "OFFER_MADE" | "RESERVED" | "PASSED";
  bedrooms: string;
  sizeSqft: number;
  handoverQuarter: string;
  listPrice: number;
  pricePerSqft: number;
  downPaymentPct: number;
  serviceChargePerSqft: number;
  expectedRentAnnual: number;
  dldFeePct: number;
  documents: DocFixture[];
  chatThreads: ThreadFixture[];
  auditFindings: AuditFindingFixture[];
  extractionFields: ExtractionFieldFixture[];
};

export const PROPERTIES: PropertyFixture[] = [
  // ==========================================================================================
  // 1. MARINA VISTA RESIDENCES — Dubai Marina — 1BR — moderate yield, moderate SPA risk
  // ==========================================================================================
  {
    id: "marina-vista-residences",
    name: "Marina Vista Residences",
    developer: "Azure Bay Developments",
    area: "Dubai Marina",
    status: "UNDER_REVIEW",
    bedrooms: "1BR",
    sizeSqft: 750,
    handoverQuarter: "Q4 2027",
    listPrice: 1912500,
    pricePerSqft: 2550,
    downPaymentPct: 20,
    serviceChargePerSqft: 18,
    expectedRentAnnual: 130000,
    dldFeePct: 4,
    documents: [
      {
        id: "marina-vista-brochure",
        type: "BROCHURE",
        title: "Marina Vista Residences — Investor Brochure",
        pages: [
          {
            anchorId: "project-overview",
            heading: "Project Overview",
            paragraphs: [
              "Marina Vista Residences is a 42-storey waterfront tower rising on the last remaining plot along the Dubai Marina promenade, developed by Azure Bay Developments. The tower comprises 318 residential units ranging from studios to three-bedroom sky villas, with the 1BR collection occupying floors 9 through 30. Construction commenced in Q1 2025 following completion of the shared podium with the adjacent Azure Bay Retail Walk.",
              "The building is designed by the same architectural practice behind two of the Marina's most recognised towers, with a curved glass facade intended to maximise both marina and sea views. Azure Bay Developments is positioning Marina Vista Residences as a premium but attainable entry point into the Marina compared to older stock, with fully fitted kitchens and smart-home wiring included as standard rather than as a paid upgrade.",
              "At launch, 61% of inventory was allocated to the 1BR and 2BR collections, reflecting anticipated demand from both end-users and buy-to-let investors. The remaining units are studios and larger three-bedroom and penthouse configurations on the top eight floors.",
            ],
          },
          {
            anchorId: "unit-specifications",
            heading: "Unit Specifications — 1BR Collection",
            paragraphs: [
              "The 1BR units in Marina Vista Residences range from 720 to 810 sqft, with the standard mid-floor layout (Unit Type 1B-04) measuring 750 sqft including a 68 sqft balcony. Each unit includes one master bedroom with an en-suite bathroom, a separate guest powder room, an open-plan living and dining area, and a fully equipped kitchen with integrated European appliances.",
              "Floor-to-ceiling windows run the full width of the living area, and units on the odd-numbered floors above level 15 are oriented to capture uninterrupted marina views rather than the neighbouring tower's service wing. Flooring throughout is porcelain tile in living areas with engineered timber in the bedroom.",
              "Each 1BR unit is allocated one covered parking bay in the podium and one storage locker on the same floor as the unit. Ceiling height is 2.95m, above the Marina norm of roughly 2.7m for comparable-era towers.",
            ],
          },
          {
            anchorId: "amenities-lifestyle",
            heading: "Amenities & Lifestyle",
            paragraphs: [
              "Residents have access to a 45-metre infinity-edge pool on the 6th-floor podium level overlooking the marina channel, a separate children's pool, and a fully equipped fitness centre with a dedicated yoga studio and sauna. A co-working lounge with private call booths is included for residents working from home.",
              "The podium level also houses a landscaped garden, a padel court, and direct pedestrian access to the Marina Walk promenade without needing to cross Al Marsa Street. A concierge desk operates 24 hours, alongside valet parking for visitors.",
              "Ground-floor retail includes a supermarket unit, a specialty coffee operator, and two restaurant units, all pre-leased ahead of handover according to Azure Bay Developments' leasing update circulated to registered investors in March 2026.",
            ],
          },
          {
            anchorId: "developer-track-record",
            heading: "Developer Track Record",
            paragraphs: [
              "Azure Bay Developments has delivered four residential towers in Dubai Marina and Jumeirah Beach Residence since 2014, totalling approximately 1,650 units, with a stated on-time delivery record of three out of four projects handed over within four months of the original contractual date.",
              "The developer's most recent completed project, Azure Bay Tower 3, was handed over in Q2 2024, seven weeks behind its original Q4 2023 target, which the developer attributed to finishing works on the shared retail podium rather than the residential floors themselves.",
              "Azure Bay Developments is privately held and discloses project-level escrow account numbers registered with the Dubai Land Department on its investor portal, consistent with standard RERA escrow requirements for off-plan sales in Dubai.",
            ],
          },
          {
            anchorId: "location-connectivity",
            heading: "Location & Connectivity",
            paragraphs: [
              "Marina Vista Residences sits approximately 350 metres from Dubai Marina Mall and a six-minute walk from the DMCC Metro Station on the Red Line. The Dubai Tram's Marina Towers stop is closer still, roughly 220 metres from the building's main entrance, connecting residents to both the tram and onward metro interchange.",
              "Sheikh Zayed Road access is via Al Sufouh Road, roughly four minutes' drive from the building's basement exit during off-peak hours. Dubai Marina Yacht Club and the wider Marina Walk retail and dining strip are within a ten-minute walk.",
              "Dubai International Airport is approximately 35 minutes by car under normal traffic conditions, while Al Maktoum International Airport in Dubai South is approximately 40 minutes via Sheikh Zayed Road.",
            ],
          },
          {
            anchorId: "investment-highlights",
            heading: "Investment Highlights",
            paragraphs: [
              "Azure Bay Developments cites Dubai Marina's constrained new-supply pipeline as a key demand driver for Marina Vista Residences, noting that no new waterfront plots have been released for sale in the immediate Marina district since 2021.",
              "The developer's internal leasing comparables, based on similarly sized 1BR units in neighbouring towers completed within the last three years, suggest achievable rents in the range of AED 120,000 to AED 140,000 per annum at current market conditions, though PropertyDoc notes these are developer-supplied comparables and should be cross-checked against independent market data.",
              "Marina Vista Residences is scheduled for handover in Q4 2027, with the developer's marketing materials citing construction progress of approximately 22% as of Q2 2026.",
            ],
          },
        ],
      },
      {
        id: "marina-vista-spa",
        type: "SPA",
        title: "Marina Vista Residences — Sale and Purchase Agreement",
        pages: [
          {
            anchorId: "definitions-parties",
            heading: "Article 1 — Definitions and Parties",
            paragraphs: [
              "This Sale and Purchase Agreement (the \"Agreement\") is entered into between Azure Bay Developments LLC (the \"Developer\") and the party identified in Schedule 1 (the \"Purchaser\") for the sale and purchase of Unit 1B-04-17 within the project known as Marina Vista Residences (the \"Project\"), located on Plot No. MV-114, Dubai Marina, Dubai, United Arab Emirates (the \"Unit\").",
              "1.2 \"Handover Date\" means the date on which the Developer notifies the Purchaser in writing that the Unit is ready for handover in accordance with Clause 9. \"Completion\" means the date on which the Developer obtains the Building Completion Certificate from the relevant Dubai authorities.",
              "1.3 \"Purchase Price\" means the total consideration payable by the Purchaser for the Unit as set out in Schedule 2, exclusive of the Oqood registration fee, the Dubai Land Department transfer fee, and any applicable value added tax.",
              "1.4 References to \"RERA\" mean the Real Estate Regulatory Agency of the Emirate of Dubai, and references to the \"Escrow Account\" mean the project-specific escrow account opened by the Developer pursuant to Law No. 8 of 2007 concerning escrow accounts for real estate development in Dubai.",
            ],
          },
          {
            anchorId: "purchase-price-payment",
            heading: "Article 4 — Purchase Price and Payment Terms",
            paragraphs: [
              "4.1 The Purchase Price for the Unit is AED 1,912,500 (Dirhams One Million Nine Hundred and Twelve Thousand Five Hundred only), payable in accordance with the payment schedule set out in Schedule 2 and further detailed in the Payment Plan issued to the Purchaser.",
              "4.2 The Purchaser shall pay a booking deposit of AED 95,625, equivalent to 5% of the Purchase Price, upon execution of the reservation form, with the balance of the down payment due within 30 days of signing this Agreement, together constituting 20% of the Purchase Price.",
              "4.3 All subsequent instalments shall be paid into the Escrow Account maintained with a bank licensed by the Central Bank of the UAE, and the Developer shall provide the Purchaser with written confirmation of receipt within 10 business days of each payment.",
              "4.4 Instalments linked to construction milestones shall become due within 14 days of the Developer issuing a certified progress notice from the appointed project consultant confirming that the relevant percentage of construction has been achieved.",
            ],
          },
          {
            anchorId: "handover-clause",
            heading: "Article 9 — Handover and Completion",
            paragraphs: [
              "9.1 The Developer shall use reasonable commercial endeavours to complete construction of the Unit and deliver Handover by the end of Q4 2027 (the \"Anticipated Completion Date\"), subject to a grace period of twelve (12) months from the Anticipated Completion Date (the \"Grace Period\") during which no compensation, penalty, or right of termination shall accrue to the Purchaser on account of delay.",
              "9.2 Should Handover not occur within the Grace Period, the Purchaser shall be entitled to serve written notice on the Developer, and if Handover does not occur within 90 days of such notice, the Purchaser may elect to terminate this Agreement and receive a refund of amounts paid, less any amounts deducted pursuant to Clause 14.",
              "9.3 The Developer shall notify the Purchaser in writing not less than 60 days prior to the anticipated Handover Date to enable the Purchaser to arrange final payment and inspection. The Purchaser shall attend a joint snagging inspection within 14 days of such notice.",
              "9.4 Delay caused by Force Majeure Events as defined in Clause 16 shall extend the Grace Period by a period equivalent to the duration of the Force Majeure Event, provided the Developer notifies the Purchaser of such event within 30 days of its occurrence.",
            ],
          },
          {
            anchorId: "service-charge-clause",
            heading: "Article 11 — Service Charges and Owners Association",
            paragraphs: [
              "11.1 Upon formation of the Owners Association for the Project, the Purchaser shall be liable for service charges calculated on a per-square-foot basis, determined annually by the Owners Association budget and approved in accordance with applicable Dubai Land Department regulations governing jointly owned property.",
              "11.2 The initial estimated service charge is AED 18 per sqft per annum, provided that the Developer reserves the right to make reasonable adjustments to this estimate prior to formation of the Owners Association to reflect actual operating costs of shared facilities, and such adjustment shall not require the Purchaser's consent.",
              "11.3 Following formation of the Owners Association, service charges shall be reviewed annually and any dispute regarding the reasonableness of the approved budget shall be referred to the Rental Dispute Settlement Centre or successor body in accordance with applicable law.",
              "11.4 The Purchaser acknowledges that shared facility costs, including but not limited to the podium pool, gymnasium, and retail podium common areas, shall be apportioned across all units in the Project regardless of individual usage.",
            ],
          },
          {
            anchorId: "default-termination",
            heading: "Article 14 — Default and Termination",
            paragraphs: [
              "14.1 If the Purchaser fails to pay any instalment within 30 days of its due date, the Developer shall issue a written notice affording the Purchaser a cure period of 15 days from the date of such notice within which to remedy the default.",
              "14.2 If the Purchaser fails to remedy the default within the cure period referred to in Clause 14.1, the Developer may terminate this Agreement by written notice, in which case the Developer shall be entitled to retain 25% of the Purchase Price as agreed liquidated damages, with the balance refunded to the Purchaser within 60 days of resale of the Unit to a third party.",
              "14.3 Where termination occurs after 80% of the Purchase Price has been paid, the Developer shall, at its discretion, either complete the Unit and transfer title against payment of the balance, or terminate in accordance with Clause 14.2.",
              "14.4 Nothing in this Clause 14 shall limit the Developer's right to pursue the Purchaser for any shortfall between the amount retained under Clause 14.2 and the Developer's actual proven losses arising from the default.",
            ],
          },
          {
            anchorId: "assignment-resale",
            heading: "Article 17 — Assignment and Resale",
            paragraphs: [
              "17.1 The Purchaser may not assign, sell, or otherwise transfer its rights under this Agreement prior to payment of 40% of the Purchase Price without the prior written consent of the Developer, such consent not to be unreasonably withheld.",
              "17.2 Any permitted assignment shall be subject to payment of an administrative and No Objection Certificate (NOC) fee of AED 5,250 or 0.5% of the Purchase Price, whichever is greater, payable by the Purchaser prior to issuance of the NOC.",
              "17.3 The assignee shall execute a deed of adherence to this Agreement and shall assume all obligations of the Purchaser, including any outstanding instalments, as a condition of the Developer's consent.",
              "17.4 The Developer shall issue or reject the NOC within 15 business days of receiving a complete assignment request together with proof of payment of the fee referred to in Clause 17.2.",
            ],
          },
        ],
      },
      {
        id: "marina-vista-payment-plan",
        type: "PAYMENT_PLAN",
        title: "Marina Vista Residences — Payment Plan",
        pages: [
          {
            anchorId: "payment-structure-overview",
            heading: "Payment Structure Overview",
            paragraphs: [
              "Marina Vista Residences is offered on a construction-linked payment plan, requiring 20% at booking and signing, 70% across seven construction-linked instalments through to structural completion, and a final 10% due on Handover. This structure carries a lower post-handover exposure than many current Dubai Marina launches, which have shifted toward heavier post-handover weighting.",
              "No instalment exceeds 15% of the Purchase Price at any single milestone, and the largest single payment after the initial down payment is the final Handover instalment. Purchasers financing via mortgage should note that most UAE lenders will only finance a unit once it reaches approximately 50% construction completion.",
              "All instalments are payable directly into the project's RERA-registered Escrow Account. The Developer does not accept instalment payments to any account other than the Escrow Account referenced in the Agreement.",
            ],
          },
          {
            anchorId: "payment-schedule",
            heading: "Installment Schedule",
            paragraphs: [
              "The full instalment schedule for Unit 1B-04-17 is set out below, expressed as a percentage of the AED 1,912,500 Purchase Price and the corresponding AED amount.",
              "Installment 1 — On Booking — 5% — AED 95,625\nInstallment 2 — On Signing (within 30 days) — 15% — AED 286,875\nInstallment 3 — 20% Construction Complete — 10% — AED 191,250\nInstallment 4 — 35% Construction Complete — 10% — AED 191,250\nInstallment 5 — 50% Construction Complete — 10% — AED 191,250\nInstallment 6 — 65% Construction Complete — 10% — AED 191,250\nInstallment 7 — 80% Construction Complete — 10% — AED 191,250\nInstallment 8 — 90% Construction Complete — 10% — AED 191,250\nInstallment 9 — On Handover — 10% — AED 191,250",
              "Purchasers should note that instalments 3 through 8 are triggered by certified construction milestones rather than fixed calendar dates, meaning the actual payment dates will track the pace of construction reported by the appointed project consultant.",
            ],
          },
          {
            anchorId: "construction-milestones",
            heading: "Construction-Linked Milestones",
            paragraphs: [
              "Construction milestones are certified by an independent project consultant appointed by the Developer and reported to purchasers via quarterly construction update notices. As of Q2 2026, the Developer reports overall project completion at approximately 22%, consistent with the milestone underlying Instalment 4.",
              "Each milestone notice specifies the certified percentage of completion for structural works, MEP (mechanical, electrical, plumbing) rough-in, and finishing works separately, with the overall percentage used for payment purposes being a weighted blend of the three.",
              "In the event that construction proceeds faster than anticipated, multiple milestone instalments may fall due within a short period; the Developer will provide no less than 14 days' notice before any instalment becomes payable.",
            ],
          },
          {
            anchorId: "late-payment-penalty",
            heading: "Late Payment Penalty",
            paragraphs: [
              "Instalments not paid within 30 days of their due date accrue a late payment charge of 1% per month of the overdue amount, calculated from the original due date until the date of actual payment.",
              "Persistent late payment (defined as any instalment more than 30 days overdue on two or more occasions) entitles the Developer to issue a default notice under Article 14 of the Agreement, which may ultimately lead to termination and forfeiture as described in that Article.",
              "Purchasers are encouraged to set up standing payment reminders, as the Developer's payment portal does not currently send automated reminders more than 7 days before an instalment falls due.",
            ],
          },
          {
            anchorId: "handover-balance",
            heading: "Handover Balance and Fees",
            paragraphs: [
              "The final 10% instalment (AED 191,250) becomes due upon the Developer's Handover notice and must be settled, together with all outstanding amounts, before keys are released and title registration is initiated.",
              "In addition to the final instalment, purchasers should budget for the Dubai Land Department transfer fee of 4% of the Purchase Price (AED 76,500), an Oqood registration fee paid at signing, and a one-off owners association contribution collected at handover to fund initial common-area operating costs.",
              "Mortgage-financed purchasers should ensure their lender has issued a final disbursement letter at least 15 business days before the anticipated Handover Date to avoid late payment charges under Article 14.",
            ],
          },
        ],
      },
      {
        id: "marina-vista-market-report",
        type: "MARKET_REPORT",
        title: "Dubai Marina Submarket Report — H1 2026",
        pages: [
          {
            anchorId: "marina-market-overview",
            heading: "Dubai Marina Submarket Overview",
            paragraphs: [
              "Dubai Marina recorded 2,340 off-plan and secondary-market apartment transactions in H1 2026, up 9% year-on-year, according to aggregated Dubai Land Department transaction data. The submarket remains one of the three most liquid apartment markets in Dubai by transaction count, alongside Business Bay and Downtown Dubai.",
              "Average price per square foot for 1BR units across the Marina reached approximately AED 2,480 in H1 2026, up from AED 2,260 a year earlier, driven in part by constrained new supply following a wave of completions between 2021 and 2023.",
              "New off-plan launches in the immediate Marina waterfront have been scarce since 2021, with Marina Vista Residences and one other tower representing the only new waterfront-facing launches identified in this submarket over the past 18 months.",
            ],
          },
          {
            anchorId: "rental-yield-analysis",
            heading: "Rental Yield Analysis — 1BR Units",
            paragraphs: [
              "Gross rental yields for 1BR units in Dubai Marina averaged 6.6% in H1 2026, based on a sample of 140 active lease renewals and new-let transactions tracked across the submarket. Achieved annual rents for 1BR units of 700-800 sqft ranged from AED 110,000 to AED 145,000 depending on floor level, view, and building age.",
              "After accounting for typical owners association service charges of AED 16-20 per sqft per annum in comparable towers, net yields for well-let 1BR units in the Marina typically fall in the range of 5.3% to 6.1%, before financing costs.",
              "Occupancy for well-located 1BR stock in the Marina has remained above 92% through H1 2026, with average time-to-lease for newly handed-over units reported at under three weeks by two of the submarket's largest leasing brokerages.",
            ],
          },
          {
            anchorId: "comparable-projects",
            heading: "Comparable Projects",
            paragraphs: [
              "Three recently completed or under-construction towers provide the closest comparables to Marina Vista Residences: Marina Bay Heights (completed 2023, average 1BR resale price/sqft AED 2,610), Waterside Residences (completed 2022, average 1BR resale price/sqft AED 2,390), and Marina Quay Tower (under construction, off-plan price/sqft AED 2,480 at last recorded launch pricing).",
              "Marina Vista Residences' launch price of AED 2,550 per sqft sits within this comparable range, roughly 3% above Waterside Residences on a secondary-market basis but broadly in line with Marina Quay Tower's most recent off-plan pricing.",
              "All three comparable towers report owners association service charges between AED 15.50 and AED 19.80 per sqft per annum, consistent with the AED 18 per sqft estimate disclosed for Marina Vista Residences.",
            ],
          },
          {
            anchorId: "infrastructure-catalysts",
            heading: "Infrastructure Catalysts",
            paragraphs: [
              "The Roads and Transport Authority's planned Marina Promenade pedestrian upgrade, expected to complete in phases through 2027, will widen the waterfront walkway connecting Marina Walk to the JBR beachfront, an area planners expect to increase footfall to ground-floor retail along the route.",
              "A previously announced feasibility study into a Dubai Metro Blue Line spur serving the Marina and JBR corridor remains at planning stage as of Q2 2026, with no confirmed construction timeline; investors should treat this as a longer-term, non-guaranteed catalyst rather than a near-term certainty.",
              "Improvements to the Al Sufouh Road interchange with Sheikh Zayed Road, completed in late 2025, have measurably reduced peak-hour congestion for Marina residents commuting toward Downtown Dubai and DIFC.",
            ],
          },
          {
            anchorId: "price-trend-forecast",
            heading: "Price Trend Forecast",
            paragraphs: [
              "Analysts tracking the Marina submarket project price-per-square-foot growth of 4-7% annually through 2028 for well-located waterfront stock, assuming no material change to Dubai's population growth trajectory or interest rate environment.",
              "Absorption of new waterfront inventory has historically been rapid in the Marina; the two most recent comparable launches sold out their initial release phases within four and six months respectively.",
              "Risks to the forecast include a broader slowdown in end-user mortgage lending should UAE interest rates rise materially, and the possibility of new waterfront supply being released on adjacent plots currently held for future development.",
            ],
          },
        ],
      },
    ],
    chatThreads: [
      {
        type: "GENERAL",
        messages: [
          {
            role: "USER",
            content: "Can you give me a quick rundown on Marina Vista Residences and who's building it?",
          },
          {
            role: "ASSISTANT",
            content: "Marina Vista Residences is a 42-storey, 318-unit waterfront tower in Dubai Marina developed by Azure Bay Developments, with the 1BR collection you're looking at on floors 9-30. Azure Bay has delivered four towers in the Marina/JBR area since 2014 totalling roughly 1,650 units, with three of four projects handed over within four months of schedule — their most recent tower, Azure Bay Tower 3, was about seven weeks late in 2024. Construction on Marina Vista started Q1 2025 and the brochure cites ~22% progress as of Q2 2026, targeting Q4 2027 handover.",
            citations: [
              { docId: "marina-vista-brochure", anchorId: "project-overview", snippet: "Marina Vista Residences is a 42-storey waterfront tower rising on the last remaining plot along the Dubai Marina promenade" },
              { docId: "marina-vista-brochure", anchorId: "developer-track-record", snippet: "on-time delivery record of three out of four projects handed over within four months" },
            ],
          },
          {
            role: "USER",
            content: "Is this unit a good size compared to other 1BRs in the building?",
          },
          {
            role: "ASSISTANT",
            content: "Your unit, Type 1B-04, is 750 sqft including a 68 sqft balcony, which sits right in the middle of the building's 1BR range of 720-810 sqft — so it's a fairly standard mid-size layout, not the smallest or largest option. It has floor-to-ceiling windows, one covered parking bay, and a storage locker on the same floor, with ceiling heights of 2.95m versus the Marina norm of roughly 2.7m for comparable towers. If marina views matter to you, note that odd-numbered floors above level 15 are specifically oriented to avoid the neighboring tower's service wing.",
            citations: [
              { docId: "marina-vista-brochure", anchorId: "unit-specifications", snippet: "The 1BR units in Marina Vista Residences range from 720 to 810 sqft" },
            ],
          },
        ],
      },
      {
        type: "FINANCIAL",
        messages: [
          {
            role: "USER",
            content: "What does the actual payment schedule look like, and does it match what I'd expect for a Marina launch?",
          },
          {
            role: "ASSISTANT",
            content: "It's a 90/10 construction-linked plan: 20% across booking and signing, seven milestone-linked instalments of 10% each from 20% to 90% construction completion, and a final 10% on handover — so nothing above 20% is due until the unit is actually built out. That's a lighter post-handover burden than several current Marina launches that have shifted toward heavier post-handover weighting, per the payment plan overview. At AED 1,912,500, each 10% milestone instalment works out to AED 191,250.",
            citations: [
              { docId: "marina-vista-payment-plan", anchorId: "payment-structure-overview", snippet: "This structure carries a lower post-handover exposure than many current Dubai Marina launches" },
              { docId: "marina-vista-payment-plan", anchorId: "payment-schedule", snippet: "Installment 4 — 35% Construction Complete — 10% — AED 191,250" },
            ],
          },
          {
            role: "USER",
            content: "How does the yield actually pencil out once you factor in service charges?",
          },
          {
            role: "ASSISTANT",
            content: "Using the AED 130,000 expected annual rent against the AED 18/sqft service charge on 750 sqft (AED 13,500/year), net operating income is about AED 116,500. Against the all-in acquisition cost of AED 1,912,500 plus 4% DLD fee (AED 1,989,000 total), that's a net yield of roughly 5.9% before financing costs — which lines up well with the market report's estimate of 5.3-6.1% net yields for comparable Marina 1BRs after service charges.",
            citations: [
              { docId: "marina-vista-market-report", anchorId: "rental-yield-analysis", snippet: "net yields for well-let 1BR units in the Marina typically fall in the range of 5.3% to 6.1%" },
            ],
          },
        ],
      },
      {
        type: "LEGAL",
        messages: [
          {
            role: "USER",
            content: "What happens if I miss a payment — how much could I actually lose?",
          },
          {
            role: "ASSISTANT",
            content: "Under Clause 14.1, missing an instalment by 30 days triggers a default notice with a 15-day cure period. If you don't cure within that window, Clause 14.2 lets the Developer terminate and retain 25% of the Purchase Price — AED 478,125 on your unit — as liquidated damages, refunding the rest only after the unit is resold. That 25% forfeiture is on the higher side of what's typical, though it's meaningfully better than some competing projects that forfeit up to 40%, so it's worth building payment reminders into your calendar given the cure period is short.",
            citations: [
              { docId: "marina-vista-spa", anchorId: "default-termination", snippet: "the Developer shall be entitled to retain 25% of the Purchase Price as agreed liquidated damages" },
            ],
          },
          {
            role: "USER",
            content: "The brochure says AED 18/sqft for service charges — is that locked in by the SPA?",
          },
          {
            role: "ASSISTANT",
            content: "No — Clause 11.2 explicitly says AED 18/sqft is only an initial estimate, and the Developer reserves the right to make 'reasonable adjustments' before the Owners Association is even formed, without needing your consent. That's flagged in our audit as a medium-risk item because 'reasonable' is undefined and there's no cap, though it's less severe than fully uncapped escalation clauses we've seen elsewhere since disputes over the approved budget can eventually be referred to the Rental Dispute Settlement Centre under Clause 11.3.",
            citations: [
              { docId: "marina-vista-spa", anchorId: "service-charge-clause", snippet: "the Developer reserves the right to make reasonable adjustments to this estimate prior to formation of the Owners Association" },
            ],
          },
        ],
      },
      {
        type: "LOCATION",
        messages: [
          {
            role: "USER",
            content: "How walkable is this to the metro and tram, realistically?",
          },
          {
            role: "ASSISTANT",
            content: "Quite walkable — the Dubai Tram's Marina Towers stop is about 220 metres from the main entrance, and the DMCC Metro Station on the Red Line is roughly a six-minute walk, so you've got both tram and metro interchange within easy reach. Marina Mall is about 350 metres away, and Marina Walk's dining and retail strip is within a 10-minute walk as well.",
            citations: [
              { docId: "marina-vista-brochure", anchorId: "location-connectivity", snippet: "The Dubai Tram's Marina Towers stop is closer still, roughly 220 metres from the building's main entrance" },
            ],
          },
          {
            role: "USER",
            content: "Is this priced reasonably against other Marina towers nearby?",
          },
          {
            role: "ASSISTANT",
            content: "It's in line with the comp set. At AED 2,550/sqft, Marina Vista is about 3% above Waterside Residences' secondary-market price of AED 2,390/sqft, but close to Marina Quay Tower's most recent off-plan pricing of AED 2,480/sqft, and below completed Marina Bay Heights resales at AED 2,610/sqft. Service charges across all three comparables run AED 15.50-19.80/sqft, so the AED 18/sqft estimate here is squarely within range rather than an outlier.",
            citations: [
              { docId: "marina-vista-market-report", anchorId: "comparable-projects", snippet: "Marina Vista Residences' launch price of AED 2,550 per sqft sits within this comparable range" },
            ],
          },
        ],
      },
    ],
    auditFindings: [
      {
        docId: "marina-vista-spa",
        anchorId: "service-charge-clause",
        clauseRef: "Clause 11.2",
        title: "Unilateral service charge adjustment before Owners Association formation",
        quote: "the Developer reserves the right to make reasonable adjustments to this estimate prior to formation of the Owners Association to reflect actual operating costs of shared facilities, and such adjustment shall not require the Purchaser's consent",
        severity: "MEDIUM",
        explanation: "The AED 18/sqft figure quoted throughout the marketing materials is only an estimate the Developer can revise unilaterally before the Owners Association exists to push back, and 'reasonable' is not defined by reference to any index or ceiling. This creates uncertainty in yield calculations that rely on the quoted service charge.",
        recommendation: "Ask the Developer to cap any pre-formation adjustment at a fixed percentage (e.g. no more than 10% above the quoted estimate) or tie it to a published cost index.",
      },
      {
        docId: "marina-vista-spa",
        anchorId: "default-termination",
        clauseRef: "Clause 14.2",
        title: "25% forfeiture on default with short cure period",
        quote: "the Developer may terminate this Agreement by written notice, in which case the Developer shall be entitled to retain 25% of the Purchase Price as agreed liquidated damages",
        severity: "MEDIUM",
        explanation: "A 15-day cure period combined with a flat 25% forfeiture is a significant penalty for what could be a single missed instalment, and the refund of the balance is only due after resale of the unit, with no fixed timeline given for that resale to occur.",
        recommendation: "Negotiate a longer cure period (30 days) and a fixed maximum timeframe (e.g. 120 days) for refunding the balance after termination, regardless of whether resale has completed.",
      },
      {
        docId: "marina-vista-spa",
        anchorId: "handover-clause",
        clauseRef: "Clause 9.1",
        title: "12-month grace period with no compensation for delay",
        quote: "subject to a grace period of twelve (12) months from the Anticipated Completion Date (the \"Grace Period\") during which no compensation, penalty, or right of termination shall accrue to the Purchaser on account of delay",
        severity: "MEDIUM",
        explanation: "A full 12-month grace period is longer than the 6-month period seen in some other Dubai off-plan SPAs, meaning the Purchaser has no contractual remedy for delay for up to three years after signing (handover date plus grace period) without any compensation accruing.",
        recommendation: "Push to shorten the grace period to 6 months, or negotiate a per-month compensation mechanism (e.g. a rent-equivalent credit) for delays beyond the Anticipated Completion Date.",
      },
      {
        docId: "marina-vista-spa",
        anchorId: "assignment-resale",
        clauseRef: "Clause 17.1",
        title: "Resale restricted until 40% paid, plus NOC fee",
        quote: "The Purchaser may not assign, sell, or otherwise transfer its rights under this Agreement prior to payment of 40% of the Purchase Price without the prior written consent of the Developer",
        severity: "LOW",
        explanation: "This limits the Purchaser's exit flexibility during the first several construction-linked instalments, and any permitted assignment still carries an NOC fee of AED 5,250 or 0.5% of the Purchase Price. This is a fairly standard restriction in Dubai off-plan contracts, but investors planning to flip pre-handover should be aware of the 40% threshold.",
        recommendation: "If early resale is part of your strategy, confirm the exact percentage paid at each milestone against the 40% threshold before committing, and budget for the NOC fee in your exit math.",
      },
    ],
    extractionFields: [
      { key: "unitNumber", label: "Unit Number", value: "1B-04-17", confidence: 0.97, docId: "marina-vista-spa", anchorId: "definitions-parties" },
      { key: "unitType", label: "Unit Type", value: "1 Bedroom", confidence: 0.98, docId: "marina-vista-brochure", anchorId: "unit-specifications" },
      { key: "sizeSqft", label: "Size (sqft)", value: "750", confidence: 0.96, docId: "marina-vista-brochure", anchorId: "unit-specifications" },
      { key: "listPrice", label: "List Price (AED)", value: "1,912,500", confidence: 0.99, docId: "marina-vista-spa", anchorId: "purchase-price-payment" },
      { key: "pricePerSqft", label: "Price per sqft (AED)", value: "2,550", confidence: 0.93, docId: "marina-vista-market-report", anchorId: "marina-market-overview" },
      { key: "downPaymentPct", label: "Down Payment (%)", value: "20", confidence: 0.95, docId: "marina-vista-payment-plan", anchorId: "payment-structure-overview" },
      { key: "handoverQuarter", label: "Handover Quarter", value: "Q4 2027", confidence: 0.9, docId: "marina-vista-spa", anchorId: "handover-clause" },
      { key: "serviceChargePerSqft", label: "Service Charge (AED/sqft/yr)", value: "18", confidence: 0.7, docId: "marina-vista-spa", anchorId: "service-charge-clause" },
      { key: "developer", label: "Developer", value: "Azure Bay Developments", confidence: 0.99, docId: "marina-vista-spa", anchorId: "definitions-parties" },
      { key: "area", label: "Area", value: "Dubai Marina", confidence: 0.99, docId: "marina-vista-brochure", anchorId: "project-overview" },
      { key: "dldFeePct", label: "DLD Transfer Fee (%)", value: "4", confidence: 0.96, docId: "marina-vista-payment-plan", anchorId: "handover-balance" },
      { key: "constructionProgress", label: "Construction Progress (as of Q2 2026)", value: "~22%", confidence: 0.62, docId: "marina-vista-payment-plan", anchorId: "construction-milestones" },
    ],
  },
  // ==========================================================================================
  // 2. CREEK HORIZON TOWER — Dubai Creek Harbour — Studio — aggressive PHPP, worst SPA clauses
  // ==========================================================================================
  {
    id: "creek-horizon-tower",
    name: "Creek Horizon Tower",
    developer: "Vantage Point Developments",
    area: "Dubai Creek Harbour",
    status: "TRACKING",
    bedrooms: "Studio",
    sizeSqft: 420,
    handoverQuarter: "Q2 2029",
    listPrice: 840000,
    pricePerSqft: 2000,
    downPaymentPct: 10,
    serviceChargePerSqft: 16,
    expectedRentAnnual: 60000,
    dldFeePct: 4,
    documents: [
      {
        id: "creek-horizon-brochure",
        type: "BROCHURE",
        title: "Creek Horizon Tower — Investor Brochure",
        pages: [
          {
            anchorId: "project-overview",
            heading: "Project Overview",
            paragraphs: [
              "Creek Horizon Tower is a 58-storey residential tower planned for the Island District of Dubai Creek Harbour, developed by Vantage Point Developments. The tower will comprise 512 units across studio, 1BR, and 2BR configurations, with studios occupying floors 6 through 22 facing the Ras Al Khor Wildlife Sanctuary and the future Creek Tower site.",
              "Vantage Point Developments describes Creek Horizon Tower as an entry-level investment product within Dubai Creek Harbour, targeting investors priced out of the district's larger flagship towers. Piling works began in Q3 2025, with the developer targeting a Q2 2029 handover.",
              "The project sits within the wider Dubai Creek Harbour master plan being developed in phases, with Creek Horizon Tower forming part of the second release phase of the Island District.",
            ],
          },
          {
            anchorId: "unit-specifications",
            heading: "Unit Specifications — Studio Collection",
            paragraphs: [
              "Studio units in Creek Horizon Tower range from 390 to 460 sqft. The standard unit, Type ST-06, measures 420 sqft including a 40 sqft balcony, and comprises a combined living/sleeping area, a kitchenette along one wall, and a single bathroom.",
              "Units are delivered with a fitted kitchenette including a hob, extractor fan, and undercounter fridge, but full-size appliances such as a washing machine are listed as a purchaser-funded upgrade rather than a standard inclusion.",
              "Each studio is allocated a single uncovered parking bay in the podium's upper levels; covered parking is available only as a paid upgrade of AED 25,000, payable separately from the Purchase Price.",
            ],
          },
          {
            anchorId: "amenities-lifestyle",
            heading: "Amenities & Lifestyle",
            paragraphs: [
              "The podium level includes a 35-metre lap pool, a gymnasium, and a shared co-working lounge. Unlike some larger towers in the district, Creek Horizon Tower does not include a dedicated cinema room or private dining facilities, positioning it as a value-oriented rather than ultra-amenitised product.",
              "A retail podium fronting the planned Creek promenade will include a convenience store and a small selection of food and beverage outlets, though the brochure notes these are 'planned' rather than pre-leased at this stage.",
              "Residents will have access to the wider Dubai Creek Harbour community amenities, including the Central Park and waterfront boardwalk, both currently under construction as part of the master developer's public realm programme.",
            ],
          },
          {
            anchorId: "developer-track-record",
            heading: "Developer Track Record",
            paragraphs: [
              "Vantage Point Developments has delivered two residential projects in Dubai since 2018, both in Business Bay, totalling approximately 640 units. Its first project was delivered nine months behind its original schedule; its second was delivered approximately four months behind schedule.",
              "This is Vantage Point Developments' first project in Dubai Creek Harbour and its largest to date by unit count. The developer states that it has engaged the same main contractor used on its second Business Bay project.",
              "Vantage Point Developments maintains a RERA-registered escrow account for Creek Horizon Tower, and publishes quarterly construction updates on its investor portal.",
            ],
          },
          {
            anchorId: "location-connectivity",
            heading: "Location & Connectivity",
            paragraphs: [
              "Creek Horizon Tower is located within the Island District of Dubai Creek Harbour, approximately 15 minutes by car from Downtown Dubai via Ras Al Khor Road, and roughly 20 minutes from Dubai International Airport.",
              "The nearest planned metro connection is the Creek Harbour extension of the Dubai Metro, currently under construction, with the developer's marketing materials citing an expected opening in 2027, ahead of the tower's own anticipated handover.",
              "Internal district transport, including a planned water taxi service connecting the Island District to Ras Al Khor and Downtown Dubai, remains at proposal stage according to the master developer's public disclosures.",
            ],
          },
          {
            anchorId: "investment-highlights",
            heading: "Investment Highlights",
            paragraphs: [
              "Vantage Point Developments markets Creek Horizon Tower on its low entry price point relative to other Dubai Creek Harbour studios, citing the AED 2,000 per sqft launch price as roughly 10-15% below flagship towers in the district's first release phase.",
              "The developer's payment plan is structured to minimise upfront cash requirements, with only 10% due before construction-linked instalments begin, and a significant post-handover component intended to let investors fund later payments partly from rental income once the unit is let.",
              "The brochure notes that Dubai Creek Harbour has seen strong secondary-market price appreciation since its first towers were handed over, though it also notes this district remains earlier in its build-out cycle than Dubai Marina or Downtown Dubai, with several master-plan amenities still under construction.",
            ],
          },
        ],
      },
      {
        id: "creek-horizon-spa",
        type: "SPA",
        title: "Creek Horizon Tower — Sale and Purchase Agreement",
        pages: [
          {
            anchorId: "definitions-parties",
            heading: "Article 1 — Definitions and Parties",
            paragraphs: [
              "This Sale and Purchase Agreement (the \"Agreement\") is entered into between Vantage Point Developments LLC (the \"Developer\") and the party identified in Schedule 1 (the \"Purchaser\") for the sale and purchase of Unit ST-06-11 within the project known as Creek Horizon Tower (the \"Project\"), located on Plot No. CH-227, Dubai Creek Harbour, Dubai, United Arab Emirates (the \"Unit\").",
              "1.2 \"Practical Completion\" means the date on which the Developer, in its sole determination, considers the Unit substantially ready for occupation, notwithstanding that certain common area works, landscaping, or retail podium fit-out may remain ongoing.",
              "1.3 \"Purchase Price\" means the total consideration payable by the Purchaser for the Unit as set out in Schedule 2, exclusive of the Oqood registration fee, the Dubai Land Department transfer fee, and any applicable value added tax.",
              "1.4 References to the \"Specifications\" mean the finishes, fixtures, layout, and materials described in Schedule 3, which are provided for illustrative guidance and remain subject to Clause 12 of this Agreement.",
            ],
          },
          {
            anchorId: "purchase-price-payment",
            heading: "Article 4 — Purchase Price and Payment Terms",
            paragraphs: [
              "4.1 The Purchase Price for the Unit is AED 840,000 (Dirhams Eight Hundred and Forty Thousand only), payable in accordance with the payment schedule set out in Schedule 2 and further detailed in the Payment Plan issued to the Purchaser.",
              "4.2 The Purchaser shall pay a booking deposit of AED 42,000, equivalent to 5% of the Purchase Price, upon execution of the reservation form, with a further AED 42,000 due within 30 days of signing this Agreement, together constituting 10% of the Purchase Price.",
              "4.3 Instalments due after Practical Completion shall continue in accordance with Schedule 2 regardless of whether the Purchaser has taken physical possession, obtained a tenant, or completed snagging, save where the Developer has failed to issue a valid Handover Notice under Clause 9.",
              "4.4 The Developer shall be entitled to apply any payment received from the Purchaser first against outstanding late payment charges, then against the oldest outstanding instalment, before any amount is credited toward the current instalment due.",
            ],
          },
          {
            anchorId: "handover-clause",
            heading: "Article 9 — Handover and Completion",
            paragraphs: [
              "9.1 The Developer shall use reasonable commercial endeavours to achieve Practical Completion and deliver Handover by the end of Q2 2029 (the \"Anticipated Completion Date\"), subject to a grace period of twenty-four (24) months from the Anticipated Completion Date (the \"Grace Period\") during which no compensation, penalty, or right of termination shall accrue to the Purchaser on account of delay.",
              "9.2 The Grace Period shall be further extended, without limit, by any period during which a Developer Delay Event has occurred, which for the purposes of this Agreement includes delays attributable to the Developer's contractors, subcontractors, or consultants, in addition to the Force Majeure Events described in Clause 16.",
              "9.3 Should Handover not occur following expiry of the Grace Period as extended under Clause 9.2, the Purchaser's sole remedy shall be to serve written notice on the Developer, and if Handover does not occur within 120 days of such notice, the Purchaser may elect to terminate this Agreement subject to Clause 14.",
              "9.4 The Developer shall notify the Purchaser in writing not less than 30 days prior to the anticipated Handover Date. The Purchaser shall attend a joint snagging inspection within 7 days of such notice, failing which the Unit shall be deemed accepted in its condition as handed over.",
            ],
          },
          {
            anchorId: "service-charge-escalation",
            heading: "Article 11 — Service Charges and Owners Association",
            paragraphs: [
              "11.1 The initial estimated service charge is AED 16 per sqft per annum, provided that this estimate is indicative only and is not binding on the Developer or any subsequently formed Owners Association.",
              "11.2 The Developer may adjust the estimated service charge without limitation to reflect prevailing market rates for comparable developments in Dubai Creek Harbour, changes in utility costs, or the scope of shared amenities ultimately delivered, and no maximum annual increase or cap of any kind shall apply to such adjustments.",
              "11.3 Following formation of the Owners Association, the annual service charge budget shall be determined by the Owners Association in accordance with applicable law, provided that until such formation, the Developer's determination of the service charge shall be final and binding on the Purchaser.",
              "11.4 The Purchaser acknowledges that shared facility costs, including any amenities added to the Project after the date of this Agreement, may be apportioned across all units notwithstanding that such amenities were not contemplated at the time of purchase.",
            ],
          },
          {
            anchorId: "default-termination",
            heading: "Article 14 — Default and Termination",
            paragraphs: [
              "14.1 If the Purchaser fails to pay any instalment within 15 days of its due date, the Developer shall issue a written notice affording the Purchaser a cure period of 10 days from the date of such notice within which to remedy the default.",
              "14.2 If the Purchaser fails to remedy the default within the cure period referred to in Clause 14.1, the Developer may terminate this Agreement by written notice, in which case the Developer shall be entitled to retain up to 40% of the Purchase Price as agreed liquidated damages, calculated based on the proportion of the Purchase Price paid at the date of termination, with any balance refunded only after resale of the Unit to a third party and without interest.",
              "14.3 Where termination occurs after Practical Completion has been achieved, the Developer shall be entitled to retain the full 40% referred to in Clause 14.2 regardless of the amount actually paid by the Purchaser as at the date of termination, and may pursue the Purchaser for any shortfall.",
              "14.4 The Purchaser waives any right to claim that the liquidated damages set out in this Clause 14 are excessive or disproportionate to the Developer's actual loss, save as may be mandatorily required by UAE law.",
            ],
          },
          {
            anchorId: "force-majeure-clause",
            heading: "Article 16 — Force Majeure",
            paragraphs: [
              "16.1 \"Force Majeure Event\" means any event beyond the reasonable control of the Developer, including but not limited to acts of God, war, epidemic, governmental action, changes in law, shortage of materials or labour, contractor insolvency, adverse weather, and any other circumstance the Developer determines, acting reasonably, to be beyond its control.",
              "16.2 Upon the occurrence of a Force Majeure Event, the Developer's obligations under this Agreement, including the obligation to achieve Handover by the Anticipated Completion Date, shall be suspended for the duration of the Force Majeure Event and any reasonable period required to recover from its effects.",
              "16.3 No compensation, discount, rebate, or other remedy shall be payable or available to the Purchaser in respect of any delay, cost increase, or other consequence arising from a Force Majeure Event, and the Purchaser shall continue to be liable for all instalments falling due during the Force Majeure Event.",
              "16.4 The Developer shall notify the Purchaser of a Force Majeure Event within 60 days of its occurrence, provided that failure to provide such notice within this period shall not invalidate the Developer's reliance on this Clause 16.",
            ],
          },
          {
            anchorId: "specification-variation",
            heading: "Article 12 — Specifications and Variations",
            paragraphs: [
              "12.1 The Specifications set out in Schedule 3 are indicative and the Developer reserves the right, at its sole discretion, to substitute materials, finishes, brands, or fixtures with alternatives of comparable or better quality, without the Purchaser's consent and without any adjustment to the Purchase Price.",
              "12.2 The Developer reserves the right to make variations to the design, layout, or unit boundaries of the Unit or the Project of up to 5% of the Unit's total area, provided that any reduction beyond 5% shall entitle the Purchaser to a pro-rata reduction in the Purchase Price calculated on the same per-square-foot basis as the original sale.",
              "12.3 The Developer may also alter the specification, number, or configuration of shared amenities described in the brochure or marketing materials, provided that such marketing materials do not form part of this Agreement and shall not be relied upon by the Purchaser as contractual commitments.",
              "12.4 The Purchaser acknowledges having read and accepted this Clause 12 as a condition of entering into this Agreement, and waives any claim arising from variations made in accordance with this Clause.",
            ],
          },
          {
            anchorId: "assignment-noc-fee",
            heading: "Article 17 — Assignment and Resale",
            paragraphs: [
              "17.1 The Purchaser may not assign, sell, or otherwise transfer its rights under this Agreement prior to Practical Completion without the prior written consent of the Developer, which consent may be granted or withheld at the Developer's sole discretion.",
              "17.2 Any permitted assignment shall be subject to payment of an administrative and No Objection Certificate (NOC) fee equal to 2% of the Purchase Price, payable by the Purchaser prior to issuance of the NOC, in addition to any outstanding instalments which shall become immediately due upon assignment.",
              "17.3 The Developer may, at its discretion, decline to issue an NOC where less than 50% of the Purchase Price has been paid, irrespective of whether the proposed assignee is willing to assume all remaining obligations under this Agreement.",
              "17.4 The Developer shall have no obligation to issue or reject an NOC request within any specified timeframe, and any delay in processing shall not give rise to any claim by the Purchaser.",
            ],
          },
        ],
      },
      {
        id: "creek-horizon-payment-plan",
        type: "PAYMENT_PLAN",
        title: "Creek Horizon Tower — Payment Plan",
        pages: [
          {
            anchorId: "payment-structure-overview",
            heading: "Payment Structure Overview",
            paragraphs: [
              "Creek Horizon Tower is offered on an aggressive post-handover payment plan: only 10% is due before and at signing, 40% is spread across five construction-linked instalments, and the remaining 50% is deferred to ten quarterly instalments of 5% each, paid over two and a half years after Handover.",
              "This structure is designed to reduce upfront cash requirements, but it means half of the total Purchase Price remains outstanding after keys are handed over, and continues to fall due under Clause 4.3 of the Agreement regardless of whether the Purchaser has secured a tenant.",
              "Purchasers relying on rental income to fund post-handover instalments should stress-test their plan against periods of vacancy, since the quarterly instalment of AED 42,000 is due whether or not the Unit is let at that time.",
            ],
          },
          {
            anchorId: "payment-schedule",
            heading: "Installment Schedule",
            paragraphs: [
              "The full instalment schedule for Unit ST-06-11 is set out below, expressed as a percentage of the AED 840,000 Purchase Price and the corresponding AED amount.",
              "Installment 1 — On Booking — 5% — AED 42,000\nInstallment 2 — On Signing (within 30 days) — 5% — AED 42,000\nInstallment 3 — 20% Construction Complete — 10% — AED 84,000\nInstallment 4 — 40% Construction Complete — 10% — AED 84,000\nInstallment 5 — 60% Construction Complete — 10% — AED 84,000\nInstallment 6 — 80% Construction Complete — 5% — AED 42,000\nInstallment 7 — On Handover — 5% — AED 42,000\nInstallment 8 — 3 Months Post-Handover — 5% — AED 42,000\nInstallment 9 — 6 Months Post-Handover — 5% — AED 42,000\nInstallment 10 — 9 Months Post-Handover — 5% — AED 42,000\nInstallment 11 — 12 Months Post-Handover — 5% — AED 42,000\nInstallment 12 — 15 Months Post-Handover — 5% — AED 42,000\nInstallment 13 — 18 Months Post-Handover — 5% — AED 42,000\nInstallment 14 — 21 Months Post-Handover — 5% — AED 42,000\nInstallment 15 — 24 Months Post-Handover — 5% — AED 42,000\nInstallment 16 — 27 Months Post-Handover — 5% — AED 42,000",
              "In total, 50% of the Purchase Price (AED 420,000) falls due across the ten post-handover instalments listed above, spread over 27 months following Handover.",
            ],
          },
          {
            anchorId: "construction-milestones",
            heading: "Construction-Linked Milestones",
            paragraphs: [
              "Pre-handover milestones are certified by an independent project consultant appointed by the Developer. As of Q2 2026, the Developer reports overall project completion at approximately 14%, reflecting the early piling and foundation stage of the Project.",
              "Given the Project's long runway to its Q2 2029 target and the 24-month Grace Period described in the Agreement, purchasers should treat the anticipated Handover Date as an early-stage estimate rather than a firm date, particularly given Vantage Point Developments' history of four-to-nine-month delays on its two prior projects.",
              "The Developer's quarterly construction updates report structural, MEP, and finishing progress separately, with the blended percentage used to trigger milestone instalments 3 through 6.",
            ],
          },
          {
            anchorId: "post-handover-installments",
            heading: "Post-Handover Instalment Detail",
            paragraphs: [
              "The ten post-handover instalments (Instalments 7 through 16) are fixed calendar-based payments tied to the number of months elapsed since the Handover Notice date, not to any further construction or performance condition, since the Unit will already be complete.",
              "Because these instalments continue irrespective of occupancy or leasing status under Clause 4.3 of the Agreement, purchasers financing the post-handover period from rental income should build in a buffer for vacancy periods between tenants, typically 2-4 weeks per re-let in Dubai Creek Harbour based on current leasing data.",
              "Purchasers intending to sell shortly after Handover should note that any assignment before Practical Completion requires Developer consent under Clause 17.1, and that outstanding post-handover instalments become immediately due upon any permitted assignment.",
            ],
          },
          {
            anchorId: "late-payment-penalty",
            heading: "Late Payment Penalty",
            paragraphs: [
              "Instalments not paid within 15 days of their due date accrue a late payment charge of 1.5% per month of the overdue amount, calculated from the original due date until the date of actual payment, which is a shorter grace window and a higher rate than typically seen on pre-handover-weighted plans.",
              "Two or more instalments more than 15 days overdue entitle the Developer to issue a default notice under Article 14 of the Agreement, with only a 10-day cure period before termination and forfeiture rights arise.",
              "Given the length of the post-handover schedule, purchasers should set up automatic payments where possible, since a single missed post-handover instalment two and a half years after signing carries the same default consequences as a missed instalment during construction.",
            ],
          },
          {
            anchorId: "handover-balance",
            heading: "Handover Balance and Fees",
            paragraphs: [
              "The Instalment 7 payment of 5% (AED 42,000) becomes due upon the Developer's Handover Notice, alongside the Dubai Land Department transfer fee of 4% of the Purchase Price (AED 33,600) and an Oqood registration fee, both payable before title registration is initiated.",
              "Unlike fully front-loaded plans, purchasers here will still owe 45% of the Purchase Price (AED 378,000) after the Handover Balance is settled, spread across Instalments 8 through 16.",
              "Purchasers are advised to confirm with their bank whether post-handover instalments can be mortgage-financed, since most UAE lenders require the property to be fully paid or refinance the developer instalments into a single mortgage at handover, which may not align with this instalment structure.",
            ],
          },
        ],
      },
      {
        id: "creek-horizon-market-report",
        type: "MARKET_REPORT",
        title: "Dubai Creek Harbour Submarket Report — H1 2026",
        pages: [
          {
            anchorId: "creek-market-overview",
            heading: "Dubai Creek Harbour Submarket Overview",
            paragraphs: [
              "Dubai Creek Harbour recorded 1,180 off-plan apartment transactions in H1 2026, up 21% year-on-year, as the district continues its build-out with several towers reaching handover over the past two years. The district remains earlier in its lifecycle than Dubai Marina, with a higher proportion of off-plan versus secondary-market transactions.",
              "Average price per square foot for studio units in Dubai Creek Harbour reached approximately AED 1,950 in H1 2026, up from AED 1,760 a year earlier, reflecting continued investor interest in the district's waterfront positioning and proximity to the planned Creek Tower.",
              "Studios represent the fastest-selling unit type in the district by absorption rate, with several launches in the past year selling out their studio allocation within weeks of release.",
            ],
          },
          {
            anchorId: "rental-yield-analysis",
            heading: "Rental Yield Analysis — Studio Units",
            paragraphs: [
              "Gross rental yields for studio units in Dubai Creek Harbour averaged 7.4% in H1 2026, among the highest of any major Dubai submarket, based on a sample of completed towers with at least 12 months of leasing history. Achieved annual rents for studios of 380-460 sqft ranged from AED 52,000 to AED 68,000.",
              "After accounting for owners association service charges, which in completed Creek Harbour towers range from AED 14 to AED 19 per sqft per annum, net yields for studios typically fall between 6.0% and 6.9%, though this range assumes service charges remain within the disclosed estimate.",
              "Investors should note that several completed towers in the district have seen service charge increases of 15-30% in their second year of operation as Owners Associations took over budgeting from developers, which is not reflected in the gross yield figures cited by developers at launch.",
            ],
          },
          {
            anchorId: "comparable-projects",
            heading: "Comparable Projects",
            paragraphs: [
              "Two recently launched studio-heavy towers provide the closest comparables to Creek Horizon Tower: Harbour Point Residences (launched 2025, off-plan price/sqft AED 2,050) and Island Vista Tower (launched 2024, now under construction, off-plan price/sqft AED 1,890 at launch, currently reselling around AED 2,100).",
              "Creek Horizon Tower's launch price of AED 2,000 per sqft sits between these two comparables, and its Q2 2029 handover date is later than both, reflecting its earlier construction stage (piling only, versus structural works underway at both comparables).",
              "Both comparable projects disclosed initial service charge estimates in the AED 15-17 per sqft range at launch, broadly consistent with Creek Horizon Tower's AED 16 per sqft estimate, though as noted in the yield analysis, actual charges have trended higher after Owners Association handover in this district.",
            ],
          },
          {
            anchorId: "infrastructure-catalysts",
            heading: "Infrastructure Catalysts",
            paragraphs: [
              "The Dubai Metro's Creek Harbour extension, connecting the district to the existing Green Line, is under construction with an expected opening in 2027, ahead of Creek Horizon Tower's anticipated handover — though as with any infrastructure project, timelines can shift and investors should not treat 2027 as guaranteed.",
              "The long-delayed Creek Tower project, positioned as a signature landmark for the district, remains under review by the master developer as of Q2 2026, with no confirmed construction restart date; its eventual completion (or continued absence) is likely to influence district-wide sentiment and pricing.",
              "The master developer's Central Park and waterfront boardwalk phases are under construction and partially open, with full completion of the public realm programme expected in phases through 2028.",
            ],
          },
          {
            anchorId: "price-trend-forecast",
            heading: "Price Trend Forecast",
            paragraphs: [
              "Analysts project price-per-square-foot growth of 6-10% annually for Dubai Creek Harbour through 2028, reflecting the district's earlier stage in its build-out cycle relative to more established submarkets, though this also implies higher sensitivity to shifts in investor sentiment or delays to master-plan infrastructure.",
              "Given the district's higher proportion of investor-held (versus end-user) stock, analysts flag a greater risk of concentrated resale supply hitting the market around common handover windows, which could temper near-term price appreciation for units completing in the same period as several other towers.",
              "Long construction timelines and the prevalence of aggressive post-handover payment plans across the district mean investor returns are more sensitive to holding-period assumptions than in more mature submarkets; PropertyDoc recommends modelling both a base case and a delayed-handover scenario before committing capital.",
            ],
          },
        ],
      },
    ],
    chatThreads: [
      {
        type: "GENERAL",
        messages: [
          {
            role: "USER",
            content: "What's the story with Creek Horizon Tower and Vantage Point Developments — are they established?",
          },
          {
            role: "ASSISTANT",
            content: "Vantage Point Developments is a relatively young developer with only two completed projects, both in Business Bay since 2018, totalling about 640 units — and both were delivered late, by nine months and four months respectively. Creek Horizon Tower is their first project in Dubai Creek Harbour and their largest by unit count (512 units), currently at the piling stage with construction starting Q3 2025. Given that track record and the fact this is their first project in a new district for them, I'd treat the Q2 2029 handover target as fairly soft.",
            citations: [
              { docId: "creek-horizon-brochure", anchorId: "developer-track-record", snippet: "Its first project was delivered nine months behind its original schedule; its second was delivered approximately four months behind schedule" },
            ],
          },
          {
            role: "USER",
            content: "What exactly do you get in the studio unit?",
          },
          {
            role: "ASSISTANT",
            content: "Unit ST-06-11 is 420 sqft including a 40 sqft balcony — a combined living/sleeping area, a kitchenette along one wall, and one bathroom. Worth flagging: full-size appliances like a washing machine are a paid upgrade, not standard, and covered parking costs an extra AED 25,000 on top of the Purchase Price since the standard allocation is an uncovered bay. Amenity-wise it's fairly bare-bones for the district — no cinema room or private dining like some larger Creek Harbour towers offer.",
            citations: [
              { docId: "creek-horizon-brochure", anchorId: "unit-specifications", snippet: "covered parking is available only as a paid upgrade of AED 25,000, payable separately from the Purchase Price" },
            ],
          },
        ],
      },
      {
        type: "FINANCIAL",
        messages: [
          {
            role: "USER",
            content: "Walk me through this payment plan — it looks unusually back-loaded.",
          },
          {
            role: "ASSISTANT",
            content: "It is — only 10% is due before and at signing (AED 84,000), 40% is spread across five construction milestones, and the remaining 50% (AED 420,000) is deferred into ten quarterly instalments of 5% each stretching 27 months after handover. That means you'll still owe 45% of the price the moment you get the keys, and those post-handover instalments keep coming whether or not the unit is tenanted, per Clause 4.3 of the SPA.",
            citations: [
              { docId: "creek-horizon-payment-plan", anchorId: "payment-structure-overview", snippet: "half of the total Purchase Price remains outstanding after keys are handed over" },
              { docId: "creek-horizon-spa", anchorId: "purchase-price-payment", snippet: "Instalments due after Practical Completion shall continue in accordance with Schedule 2 regardless of whether the Purchaser has taken physical possession, obtained a tenant" },
            ],
          },
          {
            role: "USER",
            content: "Does the yield still work if I assume some vacancy in there?",
          },
          {
            role: "ASSISTANT",
            content: "Base case: AED 60,000 rent minus AED 16/sqft x 420 sqft (AED 6,720) service charge gives AED 53,280 net operating income, against the AED 873,600 all-in cost (price plus 4% DLD), for a net yield of about 6.1% — near the top of the market report's 6.0-6.9% studio range. But the market report also flags that Creek Harbour service charges have risen 15-30% in year two post-handover for several towers as Owners Associations take over budgeting, and Clause 11.2 here has no cap at all, so that 6.1% could compress meaningfully if charges climb the way they have elsewhere in the district.",
            citations: [
              { docId: "creek-horizon-market-report", anchorId: "rental-yield-analysis", snippet: "several completed towers in the district have seen service charge increases of 15-30% in their second year of operation" },
              { docId: "creek-horizon-spa", anchorId: "service-charge-escalation", snippet: "no maximum annual increase or cap of any kind shall apply to such adjustments" },
            ],
          },
        ],
      },
      {
        type: "LEGAL",
        messages: [
          {
            role: "USER",
            content: "This one worries me legally. What's the worst-case if I default on a payment?",
          },
          {
            role: "ASSISTANT",
            content: "It's genuinely one of the harsher default clauses I've seen in this set. Clause 14.1 gives you only a 10-day cure period after a default notice (versus 15-30 days elsewhere), and if you don't cure, Clause 14.2 lets the Developer keep up to 40% of the Purchase Price — AED 336,000 on your unit — as liquidated damages. Clause 14.4 also has you waive your right to argue that amount is disproportionate to their actual loss, and Clause 14.3 says if termination happens after Practical Completion, they can keep the full 40% even if you've paid less than that in total.",
            citations: [
              { docId: "creek-horizon-spa", anchorId: "default-termination", snippet: "the Developer shall be entitled to retain up to 40% of the Purchase Price as agreed liquidated damages" },
            ],
          },
          {
            role: "USER",
            content: "What about delays — how protected am I if construction drags on?",
          },
          {
            role: "ASSISTANT",
            content: "Not very. Clause 9.1 gives a 24-month grace period with zero compensation, and Clause 9.2 extends that further, without limit, for anything the Developer classifies as a 'Developer Delay Event' — which explicitly includes delays caused by the Developer's own contractors and subcontractors. On top of that, Clause 16.1's force majeure definition is extremely broad, covering things like contractor insolvency and adverse weather, and Clause 16.3 confirms no compensation is ever payable for force majeure delays while you keep paying instalments throughout. Combined, there's effectively no contractual mechanism that compensates you for a slow build.",
            citations: [
              { docId: "creek-horizon-spa", anchorId: "handover-clause", snippet: "The Grace Period shall be further extended, without limit, by any period during which a Developer Delay Event has occurred" },
              { docId: "creek-horizon-spa", anchorId: "force-majeure-clause", snippet: "No compensation, discount, rebate, or other remedy shall be payable or available to the Purchaser in respect of any delay" },
            ],
          },
          {
            role: "USER",
            content: "Can they change the unit or finishes from what's shown in the brochure?",
          },
          {
            role: "ASSISTANT",
            content: "Yes, quite broadly. Clause 12.1 lets the Developer substitute materials, finishes, and fixtures at its sole discretion with no price adjustment, as long as it considers them 'comparable or better quality' — a standard they alone judge. Clause 12.2 also permits layout or boundary changes of up to 5% of the unit's area before you're entitled to any price reduction, and Clause 12.3 states the brochure and marketing materials aren't contractually binding at all. If exact specifications matter to you, this SPA gives you very little recourse if the delivered unit differs from what was marketed.",
            citations: [
              { docId: "creek-horizon-spa", anchorId: "specification-variation", snippet: "the Developer reserves the right, at its sole discretion, to substitute materials, finishes, brands, or fixtures with alternatives of comparable or better quality, without the Purchaser's consent" },
            ],
          },
        ],
      },
      {
        type: "LOCATION",
        messages: [
          {
            role: "USER",
            content: "How reliant is this project on future infrastructure that isn't built yet?",
          },
          {
            role: "ASSISTANT",
            content: "Fairly reliant. The nearest planned metro connection is the Creek Harbour extension of the Green Line, still under construction with an expected 2027 opening — ahead of your Q2 2029 handover, but not guaranteed. More significantly, the signature Creek Tower project remains under review with no confirmed restart date, and a planned water taxi service connecting the Island District to Downtown is still only at proposal stage. None of these are contractual commitments, so I'd value the location on what exists today (Central Park and the boardwalk, partially open) rather than what's promised.",
            citations: [
              { docId: "creek-horizon-market-report", anchorId: "infrastructure-catalysts", snippet: "the Creek Tower project, positioned as a signature landmark for the district, remains under review by the master developer as of Q2 2026, with no confirmed construction restart date" },
            ],
          },
          {
            role: "USER",
            content: "How does the price compare to similar studios launching nearby?",
          },
          {
            role: "ASSISTANT",
            content: "At AED 2,000/sqft, Creek Horizon sits between Harbour Point Residences (AED 2,050/sqft at its 2025 launch) and Island Vista Tower (AED 1,890/sqft at its 2024 launch, now reselling around AED 2,100/sqft). The catch is that Creek Horizon is also the least advanced of the three — piling only, versus structural works underway at both comparables — and has the latest handover date of the group, so you're paying a similar price for a longer wait and more schedule risk.",
            citations: [
              { docId: "creek-horizon-market-report", anchorId: "comparable-projects", snippet: "Creek Horizon Tower's launch price of AED 2,000 per sqft sits between these two comparables, and its Q2 2029 handover date is later than both" },
            ],
          },
        ],
      },
    ],
    auditFindings: [
      {
        docId: "creek-horizon-spa",
        anchorId: "service-charge-escalation",
        clauseRef: "Clause 11.2",
        title: "Uncapped service charge escalation",
        quote: "no maximum annual increase or cap of any kind shall apply to such adjustments",
        severity: "HIGH",
        explanation: "There is no ceiling on how much the Developer can raise the estimated service charge before the Owners Association forms, and Clause 11.3 makes the Developer's determination 'final and binding' until then. This directly undermines any yield calculation based on the quoted AED 16/sqft figure.",
        recommendation: "Push for a hard cap (e.g. increases limited to a published inflation or cost index) or a maximum percentage increase per year until the Owners Association takes over budgeting.",
      },
      {
        docId: "creek-horizon-spa",
        anchorId: "default-termination",
        clauseRef: "Clause 14.2",
        title: "Up to 40% forfeiture on default, with waiver of proportionality challenge",
        quote: "the Developer shall be entitled to retain up to 40% of the Purchase Price as agreed liquidated damages",
        severity: "HIGH",
        explanation: "A 40% forfeiture rate is at the aggressive end of what's seen in Dubai off-plan contracts, and combined with only a 10-day cure period (Clause 14.1) and a waiver of the right to argue the penalty is disproportionate (Clause 14.4), a single missed post-handover instalment years into the plan could be catastrophic.",
        recommendation: "Negotiate a graduated forfeiture scale tied to how much has been paid, a longer cure period (30 days), and removal of the proportionality waiver in Clause 14.4.",
      },
      {
        docId: "creek-horizon-spa",
        anchorId: "force-majeure-clause",
        clauseRef: "Clause 16.1 / 16.3",
        title: "Overbroad force majeure definition with no purchaser compensation",
        quote: "No compensation, discount, rebate, or other remedy shall be payable or available to the Purchaser in respect of any delay, cost increase, or other consequence arising from a Force Majeure Event",
        severity: "HIGH",
        explanation: "The force majeure definition sweeps in ordinary commercial risks like contractor insolvency and material shortages, which are arguably within the Developer's control to manage, not truly external events. Combined with the 24-month grace period, this leaves the Purchaser with almost no delay remedy for years while instalments continue.",
        recommendation: "Narrow the force majeure definition to genuinely external events, and require the Developer to at minimum suspend post-handover-style instalment collection during any claimed force majeure period.",
      },
      {
        docId: "creek-horizon-spa",
        anchorId: "specification-variation",
        clauseRef: "Clause 12.1",
        title: "Unilateral right to substitute specifications and materials",
        quote: "the Developer reserves the right, at its sole discretion, to substitute materials, finishes, brands, or fixtures with alternatives of comparable or better quality, without the Purchaser's consent and without any adjustment to the Purchase Price",
        severity: "MEDIUM",
        explanation: "The Developer alone decides what counts as 'comparable or better quality,' and Clause 12.3 confirms brochure and marketing materials are not contractual, so a Purchaser has very limited recourse if delivered finishes differ materially from what was marketed.",
        recommendation: "Request that Schedule 3 finishes be incorporated as binding contractual specifications, with any substitution requiring purchaser sign-off for material changes.",
      },
      {
        docId: "creek-horizon-spa",
        anchorId: "assignment-noc-fee",
        clauseRef: "Clause 17.2",
        title: "High 2% assignment fee plus discretionary NOC refusal",
        quote: "Any permitted assignment shall be subject to payment of an administrative and No Objection Certificate (NOC) fee equal to 2% of the Purchase Price",
        severity: "MEDIUM",
        explanation: "A 2% fee (AED 16,800 on this unit) is markedly higher than the flat or 0.5%-style fees seen on comparable projects, and Clause 17.3 lets the Developer refuse an NOC entirely below the 50%-paid threshold at its sole discretion, with no processing-time commitment under Clause 17.4.",
        recommendation: "Negotiate the fee down toward a flat administrative charge or 0.5% of Purchase Price, and request a defined NOC processing timeframe (e.g. 15 business days).",
      },
      {
        docId: "creek-horizon-spa",
        anchorId: "handover-clause",
        clauseRef: "Clause 9.1 / 9.2",
        title: "24-month grace period with unlimited further extension",
        quote: "The Grace Period shall be further extended, without limit, by any period during which a Developer Delay Event has occurred, which for the purposes of this Agreement includes delays attributable to the Developer's contractors, subcontractors, or consultants",
        severity: "HIGH",
        explanation: "A 24-month grace period is already double what's seen in the Marina Vista Residences SPA, and the further unlimited extension for 'Developer Delay Events' — defined to include the Developer's own contractors — means the Purchaser has essentially no fixed outer date by which they can claim a remedy for delay.",
        recommendation: "Cap the total extension (grace period plus Developer Delay Events) at a fixed outer limit, e.g. 36 months, beyond which termination rights or compensation apply automatically.",
      },
    ],
    extractionFields: [
      { key: "unitNumber", label: "Unit Number", value: "ST-06-11", confidence: 0.96, docId: "creek-horizon-spa", anchorId: "definitions-parties" },
      { key: "unitType", label: "Unit Type", value: "Studio", confidence: 0.98, docId: "creek-horizon-brochure", anchorId: "unit-specifications" },
      { key: "sizeSqft", label: "Size (sqft)", value: "420", confidence: 0.95, docId: "creek-horizon-brochure", anchorId: "unit-specifications" },
      { key: "listPrice", label: "List Price (AED)", value: "840,000", confidence: 0.99, docId: "creek-horizon-spa", anchorId: "purchase-price-payment" },
      { key: "pricePerSqft", label: "Price per sqft (AED)", value: "2,000", confidence: 0.92, docId: "creek-horizon-market-report", anchorId: "creek-market-overview" },
      { key: "downPaymentPct", label: "Down Payment (%)", value: "10", confidence: 0.94, docId: "creek-horizon-payment-plan", anchorId: "payment-structure-overview" },
      { key: "postHandoverPct", label: "Post-Handover Balance (%)", value: "50", confidence: 0.93, docId: "creek-horizon-payment-plan", anchorId: "payment-structure-overview" },
      { key: "handoverQuarter", label: "Handover Quarter", value: "Q2 2029", confidence: 0.85, docId: "creek-horizon-spa", anchorId: "handover-clause" },
      { key: "serviceChargePerSqft", label: "Service Charge (AED/sqft/yr)", value: "16", confidence: 0.58, docId: "creek-horizon-spa", anchorId: "service-charge-escalation" },
      { key: "developer", label: "Developer", value: "Vantage Point Developments", confidence: 0.99, docId: "creek-horizon-spa", anchorId: "definitions-parties" },
      { key: "area", label: "Area", value: "Dubai Creek Harbour", confidence: 0.99, docId: "creek-horizon-brochure", anchorId: "project-overview" },
      { key: "constructionProgress", label: "Construction Progress (as of Q2 2026)", value: "~14%", confidence: 0.6, docId: "creek-horizon-payment-plan", anchorId: "construction-milestones" },
    ],
  },
  // PLACEHOLDER_PROPERTY_3
  // PLACEHOLDER_PROPERTY_4
];
