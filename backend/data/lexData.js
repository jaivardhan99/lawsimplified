export const lexEaseData = {
    // ──────────────────────────────────────────────────────
    // 1. ISSUE PROFILES – keyword-triggered issue detection
    // ──────────────────────────────────────────────────────
    issueProfiles: [
        {
            issue_id: "EMP_001",
            issue_name: "Salary Not Paid",
            keywords: ["salary not paid", "company not paying salary", "salary delayed", "unpaid salary", "didn't get paid", "wage not received", "no salary", "salary stuck", "employer not paying"],
            legal_domain: "Employment Law",
            severity: "Medium",
            clarifying_questions: [
                "How many months is the salary unpaid?",
                "Is the company registered in India?",
                "Do you have an offer letter or payslips?"
            ]
        },
        {
            issue_id: "CRIM_002",
            issue_name: "Police Refusing FIR",
            keywords: ["police refusing fir", "police won't register case", "fir not filed", "police ignored complaint", "police not filing", "fir refused"],
            legal_domain: "Criminal Law",
            severity: "High",
            clarifying_questions: [
                "Has it been more than 24 hours since you tried to complain?",
                "Do you have a written copy of the complaint submitted to the station?"
            ]
        },
        {
            issue_id: "RENT_003",
            issue_name: "Rent / Tenancy Dispute",
            keywords: ["rent agreement", "tenant issue", "landlord problem", "rent dispute", "tenant not paying", "eviction", "rental agreement", "renting", "lease problem", "tenant rights", "landlord rights"],
            legal_domain: "Property Law",
            severity: "Medium",
            clarifying_questions: [
                "Are you the tenant or the landlord?",
                "Do you currently have a written rent agreement?",
                "What city/state is the property located in?"
            ]
        },
        {
            issue_id: "NDA_004",
            issue_name: "Confidentiality / NDA Issue",
            keywords: ["nda", "non-disclosure", "confidential", "trade secret", "confidentiality agreement", "secret information", "business secret"],
            legal_domain: "Business Law",
            severity: "Medium",
            clarifying_questions: [
                "Is this for protecting your business information or for a job/partnership?",
                "How many parties are involved?"
            ]
        },
        {
            issue_id: "SVC_005",
            issue_name: "Service Agreement / Freelancer Contract",
            keywords: ["service agreement", "freelance contract", "freelancer", "service contract", "consulting contract", "client not paying", "scope of work", "service terms"],
            legal_domain: "Business Law",
            severity: "Medium",
            clarifying_questions: [
                "Are you the service provider or the client?",
                "What type of service is being provided?",
                "Is there an existing agreement, or do you need a new one?"
            ]
        },
        {
            issue_id: "PART_006",
            issue_name: "Partnership Dispute / New Partnership",
            keywords: ["partnership", "business partner", "profit sharing", "partnership agreement", "partner dispute", "co-founder", "start business together"],
            legal_domain: "Business Law",
            severity: "Medium",
            clarifying_questions: [
                "Is this a new partnership or a dispute in an existing one?",
                "How many partners are involved?",
                "Has there been a written agreement before?"
            ]
        },
        {
            issue_id: "PROP_007",
            issue_name: "Property Sale / Transfer",
            keywords: ["property sale", "sell property", "buy property", "property transfer", "sale deed", "sale agreement", "real estate", "flat purchase", "land sale", "house sale", "property registration"],
            legal_domain: "Property Law",
            severity: "High",
            clarifying_questions: [
                "Are you buying or selling?",
                "Is the property residential or commercial?",
                "Is the property already registered in your name?"
            ]
        },
        {
            issue_id: "EMP_008",
            issue_name: "Employment / Job Contract",
            keywords: ["employment contract", "job agreement", "offer letter", "employment terms", "joining letter", "work contract", "hiring someone", "employee agreement"],
            legal_domain: "Employment Law",
            severity: "Medium",
            clarifying_questions: [
                "Are you the employer or the employee?",
                "Is this for a new hire or modifying an existing contract?",
                "What is the type of employment (full-time, part-time, contract)?"
            ]
        },
        {
            issue_id: "WILL_009",
            issue_name: "Will / Estate Planning",
            keywords: ["will", "testament", "estate planning", "inheritance", "property after death", "succession", "heir", "legal heir", "write a will", "last will"],
            legal_domain: "Personal Law",
            severity: "High",
            clarifying_questions: [
                "Do you want to create a new will or modify an existing one?",
                "How many beneficiaries do you want to include?",
                "What types of assets are involved (property, bank accounts, etc.)?"
            ]
        },
        {
            issue_id: "POA_010",
            issue_name: "Power of Attorney",
            keywords: ["power of attorney", "poa", "authorize someone", "legal authority", "act on behalf", "representative", "agent authority"],
            legal_domain: "Personal Law",
            severity: "Medium",
            clarifying_questions: [
                "What actions should the attorney be authorized to perform?",
                "Is this a general or specific power of attorney?",
                "Is it for property matters, bank matters, or other?"
            ]
        },
        {
            issue_id: "LEASE_011",
            issue_name: "Lease Agreement",
            keywords: ["lease agreement", "long-term lease", "commercial lease", "lease contract", "leasing property"],
            legal_domain: "Property Law",
            severity: "Medium",
            clarifying_questions: [
                "Is this a residential or commercial lease?",
                "What is the intended lease duration?",
                "Are you the lessor (owner) or lessee (tenant)?"
            ]
        },
        {
            issue_id: "LOAN_012",
            issue_name: "Loan Agreement",
            keywords: ["loan agreement", "lending money", "borrowing money", "loan contract", "personal loan", "money lending", "loan terms", "friend loan", "family loan"],
            legal_domain: "Personal Law",
            severity: "Medium",
            clarifying_questions: [
                "Are you lending or borrowing?",
                "What is the approximate loan amount?",
                "Is there an interest rate agreed upon?"
            ]
        },
        {
            issue_id: "FRAN_013",
            issue_name: "Franchise Agreement",
            keywords: ["franchise", "franchise agreement", "franchising", "franchise business", "franchise rights"],
            legal_domain: "Business Law",
            severity: "High",
            clarifying_questions: [
                "Are you the franchisor or the franchisee?",
                "What type of business is being franchised?",
                "What territory or region is involved?"
            ]
        },
        {
            issue_id: "NONCOMP_014",
            issue_name: "Non-Compete Agreement",
            keywords: ["non-compete", "non compete", "competition clause", "restrictive covenant", "prevent competition", "joining competitor"],
            legal_domain: "Business Law",
            severity: "Medium",
            clarifying_questions: [
                "Is this for an employee or a business partner?",
                "What duration of restriction is expected?",
                "What geographic area should it cover?"
            ]
        },
        {
            issue_id: "GIFT_015",
            issue_name: "Gift Deed",
            keywords: ["gift deed", "gifting property", "gift asset", "property gift", "transfer as gift", "free transfer"],
            legal_domain: "Personal Law",
            severity: "Medium",
            clarifying_questions: [
                "What is being gifted (property, money, etc.)?",
                "What is the relationship between donor and recipient?",
                "Is the gift of immovable property (like land/house)?"
            ]
        },
        {
            issue_id: "AFFI_016",
            issue_name: "Affidavit",
            keywords: ["affidavit", "sworn statement", "declaration", "self-declaration", "oath", "notarized statement", "court affidavit"],
            legal_domain: "Personal Law",
            severity: "Low",
            clarifying_questions: [
                "What is the purpose of the affidavit?",
                "Is it for a court, government office, or personal use?",
                "What facts need to be declared?"
            ]
        },
        {
            issue_id: "JV_017",
            issue_name: "Joint Venture",
            keywords: ["joint venture", "jv agreement", "business collaboration", "two companies working together", "project partnership"],
            legal_domain: "Business Law",
            severity: "High",
            clarifying_questions: [
                "What type of project or business is the joint venture for?",
                "How many parties are involved?",
                "What is the expected duration of the joint venture?"
            ]
        },
        {
            issue_id: "MOU_018",
            issue_name: "Memorandum of Understanding",
            keywords: ["mou", "memorandum of understanding", "preliminary agreement", "letter of intent", "mutual understanding"],
            legal_domain: "Business Law",
            severity: "Low",
            clarifying_questions: [
                "What is the purpose of the MOU?",
                "Is it a precursor to a formal contract?",
                "How many parties are involved?"
            ]
        },
        {
            issue_id: "SHARE_019",
            issue_name: "Shareholders Agreement",
            keywords: ["shareholders", "shareholder agreement", "equity", "company shares", "investor agreement", "share distribution"],
            legal_domain: "Business Law",
            severity: "High",
            clarifying_questions: [
                "How many shareholders are involved?",
                "Is this for a new company or existing company?",
                "What is the share distribution?"
            ]
        },
        {
            issue_id: "CONSULT_020",
            issue_name: "Consultancy Agreement",
            keywords: ["consultancy", "consultant agreement", "consulting", "advisory agreement", "professional services", "consultant contract"],
            legal_domain: "Business Law",
            severity: "Medium",
            clarifying_questions: [
                "Are you the consultant or the hiring party?",
                "What type of consulting services are involved?",
                "What is the expected duration?"
            ]
        },
        {
            issue_id: "PROPTRANS_021",
            issue_name: "Property Transfer",
            keywords: ["property transfer", "transfer deed", "ownership transfer", "conveyance deed", "transfer property ownership"],
            legal_domain: "Property Law",
            severity: "High",
            clarifying_questions: [
                "Is this a sale, gift, or inheritance-based transfer?",
                "Is the property residential or commercial?",
                "Is the property already registered?"
            ]
        },
        {
            issue_id: "DIVORCE_022",
            issue_name: "Divorce Settlement",
            keywords: ["divorce", "divorce settlement", "separation", "marriage end", "alimony", "divorce agreement", "mutual divorce", "contested divorce"],
            legal_domain: "Family Law",
            severity: "High",
            clarifying_questions: [
                "Is this a mutual or contested divorce?",
                "Are there children involved?",
                "Are there shared assets or properties to be divided?"
            ]
        },
        {
            issue_id: "PRENUP_023",
            issue_name: "Prenuptial Agreement",
            keywords: ["prenuptial", "prenup", "pre-marriage agreement", "before marriage", "asset protection marriage"],
            legal_domain: "Family Law",
            severity: "Medium",
            clarifying_questions: [
                "What assets do you want to protect?",
                "Are both parties in agreement about creating a prenup?",
                "Is this for an upcoming marriage?"
            ]
        },
        {
            issue_id: "CUSTODY_024",
            issue_name: "Child Custody",
            keywords: ["child custody", "custody agreement", "kids custody", "parental rights", "custody battle", "child visitation", "guardianship"],
            legal_domain: "Family Law",
            severity: "High",
            clarifying_questions: [
                "Is this part of a divorce or a separate custody matter?",
                "How many children are involved?",
                "Is the other parent cooperating?"
            ]
        },
        {
            issue_id: "SUPPLY_025",
            issue_name: "Supplier / Distribution Agreement",
            keywords: ["supplier agreement", "supply contract", "distribution agreement", "distributor", "supply terms", "wholesale agreement", "vendor agreement"],
            legal_domain: "Business Law",
            severity: "Medium",
            clarifying_questions: [
                "Are you the supplier or the buyer/distributor?",
                "What products or services are involved?",
                "Is this a one-time or ongoing arrangement?"
            ]
        }
    ],

    // ──────────────────────────────────────────────────────
    // 2. ISSUE → DOCUMENT MAPPING RULES
    // ──────────────────────────────────────────────────────
    issueToDocumentRules: {
        EMP_001: {
            recommended_documents: [{
                document_name: "Legal Notice for Non-Payment of Salary",
                document_type: "Legal Notice",
                trigger_condition: "Salary unpaid beyond agreed pay cycle",
                why_this_document: "Creates formal demand and legal record before escalation",
                legal_basis: ["Payment of Wages Act", "Industrial Disputes Act"],
                priority: 1
            }]
        },
        CRIM_002: {
            recommended_documents: [{
                document_name: "Written Complaint to SP",
                document_type: "Official Letter",
                trigger_condition: "SHO refuses to register FIR",
                why_this_document: "Escalates the matter to the Superintendent of Police under Section 154(3) CrPC.",
                priority: 1
            }]
        },
        RENT_003: {
            recommended_documents: [{
                document_name: "Rent Agreement",
                document_type: "Agreement",
                trigger_condition: "Renting a residential or commercial property",
                why_this_document: "Protects both landlord and tenant by clearly defining terms: rent, deposit, duration, and responsibilities. Legally important for disputes.",
                legal_basis: ["Transfer of Property Act", "State Rent Control Acts"],
                priority: 1
            }]
        },
        NDA_004: {
            recommended_documents: [{
                document_name: "NDA",
                document_type: "Agreement",
                trigger_condition: "Sharing confidential business information with another party",
                why_this_document: "Legally binds the receiving party from disclosing confidential information. Essential before any business discussion or partnership talks.",
                legal_basis: ["Indian Contract Act 1872"],
                priority: 1
            }]
        },
        SVC_005: {
            recommended_documents: [{
                document_name: "Service Agreement",
                document_type: "Agreement",
                trigger_condition: "Hiring or providing professional services",
                why_this_document: "Defines scope of work, payment terms, deliverables, and liabilities. Prevents disputes between service providers and clients.",
                legal_basis: ["Indian Contract Act 1872"],
                priority: 1
            }, {
                document_name: "Consultancy Agreement",
                document_type: "Agreement",
                trigger_condition: "Engaging a consultant for advisory services",
                why_this_document: "If the work is advisory/consulting in nature, this specialized agreement provides better terms coverage.",
                priority: 2
            }]
        },
        PART_006: {
            recommended_documents: [{
                document_name: "Partnership Agreement",
                document_type: "Agreement",
                trigger_condition: "Starting a new business partnership or formalizing an existing one",
                why_this_document: "Clearly defines each partner's roles, profit-sharing ratio, investment, and exit clauses. Critical to prevent future disputes.",
                legal_basis: ["Indian Partnership Act 1932"],
                priority: 1
            }]
        },
        PROP_007: {
            recommended_documents: [{
                document_name: "Sale Agreement",
                document_type: "Agreement",
                trigger_condition: "Buying or selling immovable property",
                why_this_document: "Records the agreed sale terms before the actual sale deed. Required for property registration.",
                legal_basis: ["Transfer of Property Act 1882", "Indian Registration Act 1908"],
                priority: 1
            }]
        },
        EMP_008: {
            recommended_documents: [{
                document_name: "Employment Contract",
                document_type: "Agreement",
                trigger_condition: "Hiring a new employee or formalizing existing employment",
                why_this_document: "Defines salary, role, responsibilities, notice period, and other employment terms. Protects both employer and employee.",
                legal_basis: ["Indian Contract Act 1872", "Industrial Disputes Act 1947"],
                priority: 1
            }]
        },
        WILL_009: {
            recommended_documents: [{
                document_name: "Will",
                document_type: "Legal Document",
                trigger_condition: "Planning how assets will be distributed after death",
                why_this_document: "Ensures your wishes for asset distribution are legally recorded. Prevents family disputes and intestate succession issues.",
                legal_basis: ["Indian Succession Act 1925"],
                priority: 1
            }]
        },
        POA_010: {
            recommended_documents: [{
                document_name: "Power of Attorney",
                document_type: "Legal Document",
                trigger_condition: "Need someone to act legally on your behalf",
                why_this_document: "Grants legal authority to a trusted person to handle your affairs — property, banking, court matters, etc.",
                legal_basis: ["Power of Attorney Act 1882"],
                priority: 1
            }]
        },
        LEASE_011: {
            recommended_documents: [{
                document_name: "Lease Agreement",
                document_type: "Agreement",
                trigger_condition: "Long-term property rental or commercial leasing",
                why_this_document: "Covers long-term tenancy with more detailed terms than a standard rent agreement. Typically for 1+ years.",
                legal_basis: ["Transfer of Property Act 1882"],
                priority: 1
            }, {
                document_name: "Commercial Lease",
                document_type: "Agreement",
                trigger_condition: "Leasing commercial or office space",
                why_this_document: "Specialized lease for commercial properties with clauses for business use, fit-out, signage, etc.",
                priority: 2
            }]
        },
        LOAN_012: {
            recommended_documents: [{
                document_name: "Loan Agreement",
                document_type: "Agreement",
                trigger_condition: "Lending or borrowing money",
                why_this_document: "Documents the loan amount, interest rate, repayment schedule, and consequences of default. Crucial even for family/friend loans.",
                legal_basis: ["Indian Contract Act 1872", "Negotiable Instruments Act 1881"],
                priority: 1
            }]
        },
        FRAN_013: {
            recommended_documents: [{
                document_name: "Franchise Agreement",
                document_type: "Agreement",
                trigger_condition: "Franchising a business model to another party",
                why_this_document: "Governs the entire franchise relationship — brand usage, fees, territory, operating standards, and termination.",
                legal_basis: ["Indian Contract Act 1872"],
                priority: 1
            }]
        },
        NONCOMP_014: {
            recommended_documents: [{
                document_name: "Non-Compete Agreement",
                document_type: "Agreement",
                trigger_condition: "Preventing an employee or partner from joining a competitor",
                why_this_document: "Restricts a party from competing in a specific market/geography for a defined period after the relationship ends.",
                legal_basis: ["Indian Contract Act 1872 (Section 27)"],
                priority: 1
            }]
        },
        GIFT_015: {
            recommended_documents: [{
                document_name: "Gift Deed",
                document_type: "Legal Document",
                trigger_condition: "Gifting property or assets to someone",
                why_this_document: "Legally transfers ownership of property or assets as a gift. Must be registered for immovable property.",
                legal_basis: ["Transfer of Property Act 1882 (Section 122-129)"],
                priority: 1
            }]
        },
        AFFI_016: {
            recommended_documents: [{
                document_name: "Affidavit",
                document_type: "Legal Document",
                trigger_condition: "Need a sworn statement for court, government, or personal use",
                why_this_document: "A notarized sworn statement used for name change, address proof, lost documents, court proceedings, and more.",
                legal_basis: ["Indian Evidence Act 1872", "Code of Civil Procedure"],
                priority: 1
            }]
        },
        JV_017: {
            recommended_documents: [{
                document_name: "Joint Venture Agreement",
                document_type: "Agreement",
                trigger_condition: "Two or more parties collaborating on a specific project",
                why_this_document: "Defines each party's contribution, profit/loss sharing, management structure, and exit provisions for the venture.",
                legal_basis: ["Indian Contract Act 1872"],
                priority: 1
            }]
        },
        MOU_018: {
            recommended_documents: [{
                document_name: "Memorandum of Understanding",
                document_type: "Agreement",
                trigger_condition: "Parties want to document mutual understanding before a formal contract",
                why_this_document: "A non-binding preliminary agreement that outlines intent and basic terms. Used as a stepping stone to a formal contract.",
                legal_basis: ["Indian Contract Act 1872"],
                priority: 1
            }]
        },
        SHARE_019: {
            recommended_documents: [{
                document_name: "Shareholders Agreement",
                document_type: "Agreement",
                trigger_condition: "Multiple shareholders in a private company",
                why_this_document: "Governs the relationship between shareholders — voting rights, transfer restrictions, decision-making, and exit options.",
                legal_basis: ["Companies Act 2013", "Indian Contract Act 1872"],
                priority: 1
            }]
        },
        CONSULT_020: {
            recommended_documents: [{
                document_name: "Consultancy Agreement",
                document_type: "Agreement",
                trigger_condition: "Hiring a consultant or providing consulting services",
                why_this_document: "Specialized agreement for advisory/consulting engagements with clauses for scope, fees, IP ownership, and confidentiality.",
                legal_basis: ["Indian Contract Act 1872"],
                priority: 1
            }]
        },
        PROPTRANS_021: {
            recommended_documents: [{
                document_name: "Property Transfer Deed",
                document_type: "Legal Document",
                trigger_condition: "Transferring property ownership from one person to another",
                why_this_document: "The legal instrument that effects the actual transfer of property title. Must be registered.",
                legal_basis: ["Transfer of Property Act 1882", "Indian Registration Act 1908"],
                priority: 1
            }]
        },
        DIVORCE_022: {
            recommended_documents: [{
                document_name: "Divorce Settlement",
                document_type: "Legal Document",
                trigger_condition: "Settling terms of a divorce",
                why_this_document: "Documents the agreed division of assets, alimony, and other terms in a divorce. Important for court proceedings.",
                legal_basis: ["Hindu Marriage Act 1955", "Special Marriage Act 1954"],
                priority: 1
            }]
        },
        PRENUP_023: {
            recommended_documents: [{
                document_name: "Prenuptial Agreement",
                document_type: "Agreement",
                trigger_condition: "Planning asset protection before marriage",
                why_this_document: "Defines how assets will be divided in case of divorce. Increasingly important for protecting individual assets.",
                legal_basis: ["Indian Contract Act 1872"],
                priority: 1
            }]
        },
        CUSTODY_024: {
            recommended_documents: [{
                document_name: "Child Custody Agreement",
                document_type: "Legal Document",
                trigger_condition: "Deciding custody terms for children",
                why_this_document: "Legally documents custody arrangement, visitation schedule, and financial responsibilities for children.",
                legal_basis: ["Guardians and Wards Act 1890", "Hindu Minority and Guardianship Act 1956"],
                priority: 1
            }]
        },
        SUPPLY_025: {
            recommended_documents: [{
                document_name: "Supplier Agreement",
                document_type: "Agreement",
                trigger_condition: "Establishing a supply relationship",
                why_this_document: "Defines supply terms, pricing, quality standards, delivery schedules, and liability.",
                legal_basis: ["Indian Contract Act 1872", "Sale of Goods Act 1930"],
                priority: 1
            }, {
                document_name: "Distribution Agreement",
                document_type: "Agreement",
                trigger_condition: "Setting up a distribution channel for products",
                why_this_document: "Governs the distribution relationship including territory, pricing, exclusivity, and brand standards.",
                priority: 2
            }]
        }
    },

    // ──────────────────────────────────────────────────────
    // 3. DOCUMENT PROFILES (knowledge about each document)
    // ──────────────────────────────────────────────────────
    documentProfiles: {
        "Legal Notice for Non-Payment of Salary": {
            document_type: "Legal Notice",
            used_when: "Employer fails to pay salary",
            purpose: "Formal legal demand before court or authority",
            who_sends: "Employee or advocate",
            who_receives: "Employer",
            response_time_expected: "15 days",
            next_steps_after_sending: ["Labour Commissioner complaint", "Labour Court case"],
            risk_if_skipped: "Weakens case in court"
        },
        "Written Complaint to SP": {
            document_type: "Official Letter",
            used_when: "Police Station refuses to file FIR",
            purpose: "Escalate to higher authority to order investigation",
            who_sends: "Complainant",
            who_receives: "Superintendent of Police (SP)",
            response_time_expected: "7-14 days",
            next_steps_after_sending: ["Application under Section 156(3) to Magistrate"]
        },
        "Rent Agreement": {
            document_type: "Agreement",
            used_when: "Renting residential or commercial property",
            purpose: "Define rental terms, protect both landlord and tenant",
            who_sends: "Landlord (usually drafts)",
            who_receives: "Tenant (signs)",
            response_time_expected: "Before occupancy",
            next_steps_after_sending: ["Registration if > 11 months", "Stamp duty payment"],
            risk_if_skipped: "No legal protection in disputes, difficulty proving terms"
        },
        "NDA": {
            document_type: "Non-Disclosure Agreement",
            used_when: "Sharing sensitive business information",
            purpose: "Legally prevent disclosure of confidential information",
            who_sends: "Disclosing party",
            who_receives: "Receiving party",
            response_time_expected: "Before sharing information",
            next_steps_after_sending: ["Both parties sign before info sharing"],
            risk_if_skipped: "No legal recourse if information is leaked"
        },
        "Service Agreement": {
            document_type: "Agreement",
            used_when: "Hiring or providing professional services",
            purpose: "Define scope, payment, deliverables, and liabilities",
            who_sends: "Service provider (usually drafts)",
            who_receives: "Client (reviews and signs)",
            response_time_expected: "Before work begins",
            next_steps_after_sending: ["Both parties sign", "Work begins per terms"],
            risk_if_skipped: "Disputes over scope, payment, and liability"
        },
        "Partnership Agreement": {
            document_type: "Agreement",
            used_when: "Starting or formalizing a business partnership",
            purpose: "Define roles, profit-sharing, investment, and exit clauses",
            who_sends: "All partners jointly",
            who_receives: "All partners",
            response_time_expected: "Before starting operations",
            next_steps_after_sending: ["Register partnership firm if needed"],
            risk_if_skipped: "Major disputes over profit, control, and dissolution"
        },
        "Sale Agreement": {
            document_type: "Agreement",
            used_when: "Buying or selling property",
            purpose: "Record agreed sale terms before actual registration",
            who_sends: "Seller",
            who_receives: "Buyer",
            response_time_expected: "Before sale deed registration",
            next_steps_after_sending: ["Due diligence", "Sale deed execution", "Registration"],
            risk_if_skipped: "No proof of agreed terms, risk of fraud"
        },
        "Employment Contract": {
            document_type: "Agreement",
            used_when: "Hiring an employee",
            purpose: "Define salary, role, responsibilities, and notice period",
            who_sends: "Employer",
            who_receives: "Employee",
            response_time_expected: "Before or on joining date",
            next_steps_after_sending: ["Employee signs and joins", "HR records"],
            risk_if_skipped: "Labor disputes, unclear obligations"
        },
        "Will": {
            document_type: "Legal Document",
            used_when: "Planning distribution of assets after death",
            purpose: "Ensure your wishes for asset distribution are followed",
            who_sends: "Testator (person making the will)",
            who_receives: "Beneficiaries (after death)",
            response_time_expected: "Anytime during lifetime",
            next_steps_after_sending: ["Keep safe", "Register if desired", "Inform executor"],
            risk_if_skipped: "Assets distributed per intestate succession laws, family disputes"
        },
        "Power of Attorney": {
            document_type: "Legal Document",
            used_when: "Need someone to act legally on your behalf",
            purpose: "Grant legal authority to another person",
            who_sends: "Principal (person granting power)",
            who_receives: "Attorney/Agent (person receiving power)",
            response_time_expected: "Before need arises",
            next_steps_after_sending: ["Notarize", "Register if for property matters"],
            risk_if_skipped: "No one can legally act on your behalf"
        },
        "Lease Agreement": {
            document_type: "Agreement",
            used_when: "Long-term property rental (typically > 11 months)",
            purpose: "Define long-term tenancy terms",
            who_sends: "Lessor (property owner)",
            who_receives: "Lessee (tenant)",
            response_time_expected: "Before occupancy",
            next_steps_after_sending: ["Registration (mandatory for > 11 months)", "Stamp duty"],
            risk_if_skipped: "Lease unenforceable if not registered"
        },
        "Loan Agreement": {
            document_type: "Agreement",
            used_when: "Lending or borrowing money",
            purpose: "Document loan terms, interest, and repayment schedule",
            who_sends: "Lender",
            who_receives: "Borrower",
            response_time_expected: "Before disbursement",
            next_steps_after_sending: ["Both sign", "Disbursement", "Track repayment"],
            risk_if_skipped: "No legal proof of loan, difficulty recovering money"
        },
        "Franchise Agreement": {
            document_type: "Agreement",
            used_when: "Franchising a business model",
            purpose: "Govern the franchise relationship end-to-end",
            who_sends: "Franchisor",
            who_receives: "Franchisee",
            response_time_expected: "Before franchise setup",
            next_steps_after_sending: ["Franchisee setup", "Training", "Operations launch"],
            risk_if_skipped: "No control over brand usage, no revenue terms"
        },
        "Non-Compete Agreement": {
            document_type: "Agreement",
            used_when: "Restricting someone from competing with your business",
            purpose: "Prevent key employees/partners from joining competitors",
            who_sends: "Employer/Business",
            who_receives: "Employee/Partner",
            response_time_expected: "At time of employment/partnership",
            next_steps_after_sending: ["Sign as part of employment/partnership"],
            risk_if_skipped: "No legal recourse if person joins competitor"
        },
        "Gift Deed": {
            document_type: "Legal Document",
            used_when: "Gifting property or assets",
            purpose: "Legally transfer ownership as a gift",
            who_sends: "Donor",
            who_receives: "Donee (recipient)",
            response_time_expected: "Before or during transfer",
            next_steps_after_sending: ["Registration (mandatory for immovable property)", "Stamp duty"],
            risk_if_skipped: "Gift of immovable property invalid without registration"
        },
        "Affidavit": {
            document_type: "Legal Document",
            used_when: "Sworn statement needed for court, government, or personal purposes",
            purpose: "Declare facts under oath",
            who_sends: "Deponent (person making statement)",
            who_receives: "Court/Government/Authority",
            response_time_expected: "As needed",
            next_steps_after_sending: ["Notarize", "Submit to relevant authority"],
            risk_if_skipped: "Cannot prove facts formally"
        },
        "Joint Venture Agreement": {
            document_type: "Agreement",
            used_when: "Two or more parties collaborating on a project",
            purpose: "Define contributions, profit-sharing, and management of the venture",
            who_sends: "All JV parties",
            who_receives: "All JV parties",
            response_time_expected: "Before project/venture begins",
            next_steps_after_sending: ["Set up JV operations", "Open joint accounts if needed"],
            risk_if_skipped: "Disputes over contributions, profits, and control"
        },
        "Memorandum of Understanding": {
            document_type: "Agreement (Non-binding)",
            used_when: "Parties want to document mutual intent before a formal contract",
            purpose: "Outline preliminary understanding and key terms",
            who_sends: "All parties",
            who_receives: "All parties",
            response_time_expected: "Before formal agreement",
            next_steps_after_sending: ["Negotiate formal contract", "Due diligence"],
            risk_if_skipped: "No documented understanding, misaligned expectations"
        },
        "Shareholders Agreement": {
            document_type: "Agreement",
            used_when: "Multiple shareholders in a company",
            purpose: "Govern shareholder relationships, voting, and exits",
            who_sends: "All shareholders",
            who_receives: "All shareholders",
            response_time_expected: "At company incorporation or investment",
            next_steps_after_sending: ["File with company records", "Board acknowledgment"],
            risk_if_skipped: "Shareholder disputes, deadlocks, unfair treatment"
        },
        "Consultancy Agreement": {
            document_type: "Agreement",
            used_when: "Engaging a consultant for advisory/professional services",
            purpose: "Define consulting scope, fees, IP, and confidentiality",
            who_sends: "Hiring party or consultant",
            who_receives: "Other party",
            response_time_expected: "Before consulting begins",
            next_steps_after_sending: ["Both sign", "Begin engagement"],
            risk_if_skipped: "Disputes over fees, scope, and IP ownership"
        },
        "Property Transfer Deed": {
            document_type: "Legal Document",
            used_when: "Transferring property ownership",
            purpose: "Legally effect the transfer of property title",
            who_sends: "Transferor (current owner)",
            who_receives: "Transferee (new owner)",
            response_time_expected: "At time of transfer",
            next_steps_after_sending: ["Registration", "Stamp duty", "Mutation of records"],
            risk_if_skipped: "Transfer is legally incomplete and unenforceable"
        },
        "Divorce Settlement": {
            document_type: "Legal Document",
            used_when: "Settling terms of a divorce",
            purpose: "Document agreed division of assets, alimony, and custody",
            who_sends: "Both spouses (jointly or through lawyers)",
            who_receives: "Court",
            response_time_expected: "During divorce proceedings",
            next_steps_after_sending: ["File with family court", "Court approval"],
            risk_if_skipped: "Court decides terms, which may not favor either party"
        },
        "Prenuptial Agreement": {
            document_type: "Agreement",
            used_when: "Before marriage, to protect assets",
            purpose: "Define how assets will be divided in case of divorce",
            who_sends: "Both future spouses",
            who_receives: "Both future spouses",
            response_time_expected: "Before marriage",
            next_steps_after_sending: ["Both sign", "Notarize"],
            risk_if_skipped: "Assets divided per law which may not reflect wishes"
        },
        "Child Custody Agreement": {
            document_type: "Legal Document",
            used_when: "Deciding custody of children (during or outside divorce)",
            purpose: "Document custody, visitation, and financial responsibilities",
            who_sends: "Both parents",
            who_receives: "Court",
            response_time_expected: "During family proceedings",
            next_steps_after_sending: ["File with family court", "Court approval"],
            risk_if_skipped: "Court decides custody which may not be in child's best interest"
        },
        "Commercial Lease": {
            document_type: "Agreement",
            used_when: "Leasing commercial or office space",
            purpose: "Define commercial tenancy terms, fit-out, and business use",
            who_sends: "Lessor",
            who_receives: "Lessee (business tenant)",
            response_time_expected: "Before occupancy",
            next_steps_after_sending: ["Registration", "Fit-out period"],
            risk_if_skipped: "Commercial disputes, no legal protection"
        },
        "Supplier Agreement": {
            document_type: "Agreement",
            used_when: "Establishing a supply relationship",
            purpose: "Define supply terms, pricing, quality, and delivery schedules",
            who_sends: "Buyer or supplier",
            who_receives: "Other party",
            response_time_expected: "Before first supply",
            next_steps_after_sending: ["Both sign", "Begin supply chain"],
            risk_if_skipped: "Supply disputes, unclear quality/pricing terms"
        },
        "Distribution Agreement": {
            document_type: "Agreement",
            used_when: "Setting up a distribution channel",
            purpose: "Govern distribution terms, territory, and brand standards",
            who_sends: "Manufacturer/Brand owner",
            who_receives: "Distributor",
            response_time_expected: "Before distribution begins",
            next_steps_after_sending: ["Distributor setup", "Stock supply"],
            risk_if_skipped: "No control over distribution, territory conflicts"
        }
    },

    // ──────────────────────────────────────────────────────
    // 4. TEMPLATE INPUT SCHEMAS
    // ──────────────────────────────────────────────────────
    templateInputSchema: {
        "Legal Notice for Non-Payment of Salary": {
            inputs_required: [
                { field: "Employee Name", mandatory: true },
                { field: "Employer Name", mandatory: true },
                { field: "Company Address", mandatory: true },
                { field: "Salary Amount Due", mandatory: true },
                { field: "Period of Non-Payment", mandatory: true }
            ],
            tone: "Formal",
            language: "English (India)"
        }
    },

    // ──────────────────────────────────────────────────────
    // 5. ESCALATION PATHS
    // ──────────────────────────────────────────────────────
    escalationPaths: {
        CRIM_002: [
            { step: 1, document: "Written Complaint to SP" },
            { step: 2, document: "Application under Section 156(3)" }
        ]
    },

    // ──────────────────────────────────────────────────────
    // 6. RESPONSE / BEHAVIOR RULES
    // ──────────────────────────────────────────────────────
    responseRules: [
        { scenario: "User asks a vague question", bot_action: "Ask clarifying questions before suggesting a document" },
        { scenario: "User asks for an illegal action", bot_action: "Refuse and suggest the lawful alternative" },
        { scenario: "User greets or says hi", bot_action: "Greet back warmly and ask how you can help with their legal query" },
        { scenario: "User asks what you can do", bot_action: "Explain you can help identify legal issues, recommend the right document, explain documents in simple language, and guide them to the Docs Library" },
        { scenario: "User mentions a specific document name", bot_action: "Provide details about that document from your knowledge and recommend they visit the Docs Library to draft or download it" },
        { scenario: "User's issue is too complex for self-service", bot_action: "Recommend they connect with a lawyer through the Lawyer Connect page" }
    ],

    // ──────────────────────────────────────────────────────
    // 7. LANGUAGE SIMPLIFICATION
    // ──────────────────────────────────────────────────────
    languageSimplification: {
        "Legal Notice": "A formal written demand sent before taking legal action",
        "FIR": "First Information Report – the initial police record of a crime",
        "Affidavit": "A written statement confirmed by oath or affirmation",
        "Jurisdiction": "The official power of a court or authority to make legal decisions",
        "NDA": "Non-Disclosure Agreement – a contract that prevents sharing of secret information",
        "Power of Attorney": "A legal document that lets someone act on your behalf",
        "Will": "A legal document that says how your property and money should be distributed after you pass away",
        "Gift Deed": "A legal document used to transfer ownership of property or assets as a free gift",
        "Stamp Duty": "A tax paid to the government when you register certain legal documents",
        "Registration": "The process of officially recording a document with the government",
        "Notarize": "Getting a document officially witnessed and stamped by a Notary Public",
        "Alimony": "Financial support paid to a spouse after separation or divorce",
        "Conveyance Deed": "A legal document that transfers property ownership from one person to another",
        "Memorandum of Understanding": "A preliminary agreement that shows both parties want to work together, but isn't legally binding",
        "Joint Venture": "When two or more businesses join hands for a specific project while staying separate otherwise",
        "Franchise": "A business model where someone pays to use another company's brand and system",
        "Non-Compete": "An agreement that says you won't work for or start a competing business for a certain time"
    },

    // ──────────────────────────────────────────────────────
    // 8. AVAILABLE DOCUMENTS LIST (matches Docs Library)
    // ──────────────────────────────────────────────────────
    availableDocuments: [
        { name: "Rent Agreement", category: "Property", price: 299 },
        { name: "NDA", category: "Business", price: 299 },
        { name: "Service Agreement", category: "Business", price: 299 },
        { name: "Partnership Agreement", category: "Business", price: 399 },
        { name: "Sale Agreement", category: "Property", price: 399 },
        { name: "Employment Contract", category: "Business", price: 299 },
        { name: "Will", category: "Personal", price: 399 },
        { name: "Power of Attorney", category: "Personal", price: 299 },
        { name: "Lease Agreement", category: "Property", price: 299 },
        { name: "Loan Agreement", category: "Personal", price: 299 },
        { name: "Franchise Agreement", category: "Business", price: 499 },
        { name: "Non-Compete Agreement", category: "Business", price: 299 },
        { name: "Gift Deed", category: "Personal", price: 299 },
        { name: "Affidavit", category: "Personal", price: 199 },
        { name: "Joint Venture Agreement", category: "Business", price: 499 },
        { name: "Memorandum of Understanding", category: "Business", price: 299 },
        { name: "Shareholders Agreement", category: "Business", price: 499 },
        { name: "Consultancy Agreement", category: "Business", price: 299 },
        { name: "Property Transfer Deed", category: "Property", price: 399 },
        { name: "Divorce Settlement", category: "Personal", price: 499 },
        { name: "Prenuptial Agreement", category: "Personal", price: 399 },
        { name: "Child Custody Agreement", category: "Personal", price: 399 },
        { name: "Commercial Lease", category: "Property", price: 349 },
        { name: "Supplier Agreement", category: "Business", price: 299 },
        { name: "Distribution Agreement", category: "Business", price: 399 }
    ]
}
