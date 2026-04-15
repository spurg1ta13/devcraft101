export type Lang = "en" | "el";

export const translations = {
  // Navbar
  nav: {
    aboutUs: { en: "About Us", el: "Σχετικά" },
    services: { en: "Services", el: "Υπηρεσίες" },
    work: { en: "Our Projects", el: "Τα Έργα μας" },
    blog: { en: "Blog", el: "Ιστολόγιο" },
    pricing: { en: "Plans", el: "Πακέτα" },
    contact: { en: "Contact", el: "Επικοινωνία" },
    letsTalk: { en: "Let's talk", el: "Επικοινωνήστε" },
  },

  // Hero
  hero: {
    line1: { en: "We don't do", el: "Δεν κάνουμε" },
    line2: { en: "ordinary", el: "το συνηθισμένο" },
    line3: { en: "We build them 4x faster.", el: "Τα χτίζουμε 4x πιο γρήγορα." },
    description: {
      en: "Combine Human Strategy with AI Efficiency to deliver bespoke, ISTQB-certified digital experiences.\nYour 1-month web project, delivered in just 1 week.",
      el: "Συνδυάζουμε Ανθρώπινη Στρατηγική με AI Αποδοτικότητα για εξατομικευμένες, ISTQB-πιστοποιημένες ψηφιακές εμπειρίες.\nΤο web project 1 μήνα, παραδίδεται σε μόλις 1 εβδομάδα.",
    },
    explore: { en: "Explore ↓", el: "Εξερεύνηση ↓" },
  },

  // Marquee
  marquee: {
    words: {
      en: ["Web Development", "UI/UX Design", "ISTQB Testing", "React", "TypeScript", "Performance", "Design Systems", "Quality Assurance", "API Architecture", "Cloud Deploy", "Accessibility", "Security Audits"],
      el: ["Ανάπτυξη Ιστοσελίδων", "Σχεδιασμός UI/UX", "Δοκιμές ISTQB", "React", "TypeScript", "Απόδοση", "Συστήματα Σχεδιασμού", "Διασφάλιση Ποιότητας", "Αρχιτεκτονική API", "Cloud Deploy", "Προσβασιμότητα", "Ελέγχοι Ασφαλείας"],
    },
  },

  // Services
  services: {
    label: { en: "What we do", el: "Τι κάνουμε" },
    heading1: { en: "Design, Development", el: "Σχεδιασμός, Ανάπτυξη" },
    heading2: { en: "& Quality Testing.", el: "& Ποιοτικός Έλεγχος." },
    items: [
      {
        title: { en: "Development", el: "Ανάπτυξη" },
        scope: { en: "Full-Stack Web Applications", el: "Full-Stack Εφαρμογές Ιστού" },
        description: {
          en: "React, TypeScript, Node.js, cloud-native architecture. Code that scales with your ambition.",
          el: "React, TypeScript, Node.js, cloud-native αρχιτεκτονική. Κώδικας που κλιμακώνεται μαζί με τη φιλοδοξία σας.",
        },
      },
      {
        title: { en: "Design", el: "Σχεδιασμός" },
        scope: { en: "Custom UI/UX Interfaces", el: "Εξατομικευμένες Διεπαφές UI/UX" },
        description: {
          en: "Research-driven design that converts. Not templates — bespoke digital experiences.",
          el: "Σχεδιασμός βασισμένος σε έρευνα που μετατρέπει. Όχι πρότυπα — εξατομικευμένες ψηφιακές εμπειρίες.",
        },
      },
      {
        title: { en: "Quality", el: "Ποιότητα" },
        scope: { en: "ISTQB-Certified Testing", el: "Πιστοποιημένες Δοκιμές ISTQB" },
        description: {
          en: "Certified engineers test every feature before it touches your users. Zero-defect launches.",
          el: "Πιστοποιημένοι μηχανικοί ελέγχουν κάθε λειτουργία πριν φτάσει στους χρήστες σας. Κυκλοφορίες χωρίς σφάλματα.",
        },
      },
    ],
  },

  // Showcase
  showcase: {
    label: { en: "Selected work", el: "Επιλεγμένα έργα" },
    heading1: { en: "Project quality", el: "Ποιότητα project" },
    heading2: { en: "speaks louder.", el: "που μιλάει μόνη της." },
    projects: [
      {
        title: { en: "Seamless Experience", el: "Απρόσκοπτη Εμπειρία" },
        tag: { en: "Responsive & Cross-Platform", el: "Responsive & Cross-Platform" },
        description: {
          en: "We deliver products that perform flawlessly across every operating system and device. From iOS and Android to Windows and macOS, we ensure a unified user experience without compromise.",
          el: "Παραδίδουμε προϊόντα που λειτουργούν άψογα σε κάθε λειτουργικό σύστημα και συσκευή. Από iOS και Android έως Windows και macOS, εξασφαλίζουμε ενιαία εμπειρία χρήστη χωρίς συμβιβασμούς.",
        },
        stat: { en: "100%", el: "100%" },
        statLabel: { en: "Multi-Platform", el: "Πολυπλατφορμικό" },
      },
      {
        title: { en: "ISTQB Certified Quality", el: "Πιστοποιημένη Ποιότητα ISTQB" },
        tag: { en: "Defects Policy", el: "Πολιτική Σφαλμάτων" },
        description: {
          en: "Our rigorous testing processes guarantee a bug-free product. By implementing strict quality control and ISTQB-certified standards, we achieve maximum stability and security before your first launch.",
          el: "Οι αυστηρές διαδικασίες ελέγχου μας εγγυώνται ένα προϊόν χωρίς σφάλματα. Εφαρμόζοντας αυστηρό ποιοτικό έλεγχο και πιστοποιημένα πρότυπα ISTQB, επιτυγχάνουμε μέγιστη σταθερότητα και ασφάλεια πριν από την πρώτη σας κυκλοφορία.",
        },
        stat: { en: "Zero", el: "Μηδέν" },
        statLabel: { en: "Defects", el: "Σφάλματα" },
      },
      {
        title: { en: "Custom Design Solutions", el: "Εξατομικευμένες Λύσεις Σχεδιασμού" },
        tag: { en: "UI/UX Excellence", el: "Αριστεία UI/UX" },
        description: {
          en: "We move beyond templates. When uniqueness is key, we build tailor-made design systems that not only represent your brand but turn users into loyal customers through intuitive interfaces.",
          el: "Προχωράμε πέρα από τα πρότυπα. Όταν η μοναδικότητα είναι κλειδί, δημιουργούμε εξατομικευμένα συστήματα σχεδιασμού που δεν αντιπροσωπεύουν απλά το brand σας, αλλά μετατρέπουν τους χρήστες σε πιστούς πελάτες μέσω διαισθητικών διεπαφών.",
        },
        stat: { en: "Bespoke", el: "Εξατομικευμένο" },
        statLabel: { en: "Design", el: "Σχεδιασμός" },
      },
    ],
  },

  // Process
  process: {
    label: { en: "How it works", el: "Πώς λειτουργεί" },
    heading1: { en: "Four steps.", el: "Τέσσερα βήματα." },
    heading2: { en: "Zero surprises.", el: "Μηδέν εκπλήξεις." },
    steps: [
      { title: { en: "Discover", el: "Ανακάλυψη" }, desc: { en: "Goals, users, constraints. We go deep before we go wide.", el: "Στόχοι, χρήστες, περιορισμοί. Εμβαθύνουμε πριν επεκταθούμε." } },
      { title: { en: "Design", el: "Σχεδιασμός" }, desc: { en: "Wireframes → prototypes → pixel-perfect UI. You approve every step.", el: "Wireframes → πρωτότυπα → pixel-perfect UI. Εγκρίνετε κάθε βήμα." } },
      { title: { en: "Build", el: "Κατασκευή" }, desc: { en: "Agile sprints, clean code, weekly demos. Full transparency.", el: "Agile sprints, καθαρός κώδικας, εβδομαδιαίες παρουσιάσεις. Πλήρης διαφάνεια." } },
      { title: { en: "Ship", el: "Παράδοση" }, desc: { en: "ISTQB-certified QA, performance tuning, and a flawless launch.", el: "Πιστοποιημένη QA ISTQB, βελτιστοποίηση απόδοσης και άψογη κυκλοφορία." } },
    ],
  },

  // FAQ
  faq: {
    label: { en: "FAQ", el: "Συχνές Ερωτήσεις" },
    heading1: { en: "Common", el: "Συχνές" },
    heading2: { en: "questions", el: "ερωτήσεις" },
    items: [
      {
        question: { en: "What technologies do you use for web development?", el: "Ποιες τεχνολογίες χρησιμοποιείτε για την ανάπτυξη ιστοσελίδων;" },
        answer: {
          en: "We specialize in modern technologies including React, TypeScript, Next.js, Node.js, and cloud-native architectures. Our stack is chosen to ensure scalability, performance, and maintainability for every project.",
          el: "Ειδικευόμαστε σε σύγχρονες τεχνολογίες όπως React, TypeScript, Next.js, Node.js και cloud-native αρχιτεκτονικές. Η τεχνολογική μας στοίβα επιλέγεται για να εξασφαλίζει κλιμακωσιμότητα, απόδοση και συντηρησιμότητα σε κάθε έργο.",
        },
      },
      {
        question: { en: "How long does a typical project take?", el: "Πόσο χρόνο απαιτεί ένα τυπικό έργο;" },
        answer: {
          en: "Timelines vary based on scope. A landing page can be delivered in 1–2 weeks, while a full web application typically takes 4–12 weeks. We provide a detailed timeline estimate after the initial consultation.",
          el: "Τα χρονοδιαγράμματα ποικίλλουν ανάλογα με το εύρος. Μια landing page μπορεί να παραδοθεί σε 1–2 εβδομάδες, ενώ μια πλήρης εφαρμογή ιστού χρειάζεται συνήθως 4–12 εβδομάδες. Παρέχουμε λεπτομερή εκτίμηση χρονοδιαγράμματος μετά την αρχική συνεδρία.",
        },
      },
      {
        question: { en: "Do you offer ongoing support after launch?", el: "Προσφέρετε συνεχή υποστήριξη μετά την κυκλοφορία;" },
        answer: {
          en: "Absolutely. We offer maintenance packages that include bug fixes, performance monitoring, security updates, and feature enhancements. We treat every project as a long-term partnership.",
          el: "Απολύτως. Προσφέρουμε πακέτα συντήρησης που περιλαμβάνουν διόρθωση σφαλμάτων, παρακολούθηση απόδοσης, ενημερώσεις ασφαλείας και βελτιώσεις λειτουργιών. Αντιμετωπίζουμε κάθε έργο ως μακροχρόνια συνεργασία.",
        },
      },
      {
        question: { en: "What does ISTQB-certified testing mean for my project?", el: "Τι σημαίνει η πιστοποιημένη δοκιμή ISTQB για το έργο μου;" },
        answer: {
          en: "ISTQB (International Software Testing Qualifications Board) certification means our QA engineers follow globally recognized testing standards. This ensures systematic test coverage, fewer defects, and a more reliable product at launch.",
          el: "Η πιστοποίηση ISTQB (International Software Testing Qualifications Board) σημαίνει ότι οι μηχανικοί QA μας ακολουθούν παγκοσμίως αναγνωρισμένα πρότυπα δοκιμών. Αυτό εξασφαλίζει συστηματική κάλυψη δοκιμών, λιγότερα σφάλματα και ένα πιο αξιόπιστο προϊόν κατά την κυκλοφορία.",
        },
      },
      {
        question: { en: "Can you redesign or improve an existing website?", el: "Μπορείτε να ανασχεδιάσετε ή να βελτιώσετε μια υπάρχουσα ιστοσελίδα;" },
        answer: {
          en: "Yes. We regularly work on redesigns, performance optimizations, and UX improvements for existing websites. We start with an audit of your current site and propose targeted improvements.",
          el: "Ναι. Εργαζόμαστε τακτικά σε ανασχεδιασμούς, βελτιστοποιήσεις απόδοσης και βελτιώσεις UX για υπάρχουσες ιστοσελίδες. Ξεκινάμε με έλεγχο της τρέχουσας ιστοσελίδας σας και προτείνουμε στοχευμένες βελτιώσεις.",
        },
      },
      {
        question: { en: "How do you handle communication during a project?", el: "Πώς διαχειρίζεστε την επικοινωνία κατά τη διάρκεια ενός έργου;" },
        answer: {
          en: "We use a transparent workflow with weekly progress updates, shared project boards, and direct access to your dedicated project lead. You'll always know what's happening and what's next.",
          el: "Χρησιμοποιούμε μια διαφανή ροή εργασίας με εβδομαδιαίες ενημερώσεις προόδου, κοινόχρηστους πίνακες έργου και άμεση πρόσβαση στον αφοσιωμένο υπεύθυνο έργου σας. Θα γνωρίζετε πάντα τι συμβαίνει και τι ακολουθεί.",
        },
      },
      {
        question: { en: "Do you use AI in your development process?", el: "Χρησιμοποιείτε τεχνητή νοημοσύνη στη διαδικασία ανάπτυξης;" },
        answer: {
          en: "Yes — AI is deeply integrated into our workflow. We use it to accelerate development, generate optimized code, and automate repetitive tasks. This allows us to deliver projects up to 4× faster without compromising quality, while keeping costs lower for our clients.",
          el: "Ναι — η τεχνητή νοημοσύνη είναι βαθιά ενσωματωμένη στη ροή εργασίας μας. Τη χρησιμοποιούμε για να επιταχύνουμε την ανάπτυξη, να δημιουργούμε βελτιστοποιημένο κώδικα και να αυτοματοποιούμε επαναλαμβανόμενες εργασίες. Αυτό μας επιτρέπει να παραδίδουμε έργα έως και 4 φορές πιο γρήγορα χωρίς συμβιβασμούς στην ποιότητα, διατηρώντας χαμηλότερο κόστος για τους πελάτες μας.",
        },
      },
    ],
  },

  // CTA / Contact
  cta: {
    label: { en: "Next step", el: "Επόμενο βήμα" },
    heading1: { en: "Got a project?", el: "Έχετε ένα έργο;" },
    heading2: { en: "Let's talk.", el: "Ας μιλήσουμε." },
    description: {
      en: "Scalable solutions for any need: from minimalist landing pages to bespoke enterprise platforms. Reach out with your idea, and watch us bring it to life!",
      el: "Κλιμακούμενες λύσεις για κάθε ανάγκη: από μινιμαλιστικές landing pages έως εξατομικευμένες εταιρικές πλατφόρμες. Επικοινωνήστε με την ιδέα σας και δείτε μας να τη ζωντανεύουμε!",
    },
    name: { en: "Your name", el: "Το όνομά σας" },
    email: { en: "Email", el: "Email" },
    phone: { en: "Phone number", el: "Τηλέφωνο" },
    message: { en: "Tell us about your project...", el: "Πείτε μας για το έργο σας..." },
    agree: { en: "I agree to the", el: "Συμφωνώ με την" },
    privacyPolicy: { en: "Privacy Policy", el: "Πολιτική Απορρήτου" },
    respond: { en: "We respond within 48 hours", el: "Απαντάμε εντός 48 ωρών" },
    send: { en: "Send message", el: "Αποστολή μηνύματος" },
    successTitle1: { en: "Message", el: "Μήνυμα" },
    successTitle2: { en: "sent!", el: "εστάλη!" },
    successDesc: { en: "We'll get back to you within 48 hours.", el: "Θα επικοινωνήσουμε μαζί σας εντός 48 ωρών." },
    errors: {
      nameRequired: { en: "Name is required", el: "Το όνομα είναι υποχρεωτικό" },
      nameMax: { en: "Max 100 characters", el: "Μέγιστο 100 χαρακτήρες" },
      contactRequired: { en: "Please provide either an email or phone number", el: "Παρακαλώ δώστε email ή τηλέφωνο" },
      invalidEmail: { en: "Invalid email", el: "Μη έγκυρο email" },
      invalidPhone: { en: "Invalid phone number", el: "Μη έγκυρος αριθμός τηλεφώνου" },
      messageRequired: { en: "Message is required", el: "Το μήνυμα είναι υποχρεωτικό" },
      messageMax: { en: "Max 1000 characters", el: "Μέγιστο 1000 χαρακτήρες" },
      privacyRequired: { en: "You must agree to the Privacy Policy", el: "Πρέπει να συμφωνήσετε με την Πολιτική Απορρήτου" },
    },
  },

  // Footer
  footer: {
    brand: {
      en: "AI-driven web development, bespoke interfaces, and ISTQB-certified quality assurance.",
      el: "Ανάπτυξη ιστοσελίδων με τεχνητή νοημοσύνη, εξατομικευμένες διεπαφές και πιστοποιημένη διασφάλιση ποιότητας ISTQB.",
    },
    navigation: { en: "Navigation", el: "Πλοήγηση" },
    ourWork: { en: "Our Projects", el: "Τα Έργα μας" },
    getInTouch: { en: "Get in touch", el: "Επικοινωνία" },
    rights: { en: "All rights reserved.", el: "Με επιφύλαξη παντός δικαιώματος." },
    privacyPolicy: { en: "Privacy Policy", el: "Πολιτική Απορρήτου" },
    termsOfService: { en: "Terms of Service", el: "Όροι Χρήσης" },
  },

  // About page
  about: {
    backToHome: { en: "Back to home", el: "Επιστροφή στην αρχική" },
    heading1: { en: "About", el: "Σχετικά" },
    heading2: { en: "us.", el: "με εμάς." },
    intro1: {
      en: "We are an enthusiastic team of professionals with 10 years of successful experience in the IT industry. A decade of working on international projects allows us to guarantee the highest quality of service.",
      el: "Είμαστε μια ενθουσιώδης ομάδα επαγγελματιών με 10 χρόνια επιτυχημένης εμπειρίας στον κλάδο της πληροφορικής. Μια δεκαετία εργασίας σε διεθνή έργα μας επιτρέπει να εγγυηθούμε την υψηλότερη ποιότητα υπηρεσιών.",
    },
    intro2: {
      en: "Our core team consists of field experts: a result-oriented Web developer, a certified UI/UX designer and an ISTQB-accredited tester. We strive to deliver modern, fast, and secure products, believing that the final result is our best calling card.",
      el: "Η βασική μας ομάδα αποτελείται από ειδικούς: έναν προσανατολισμένο σε αποτελέσματα Web developer, έναν πιστοποιημένο σχεδιαστή UI/UX και έναν διαπιστευμένο ελεγκτή ISTQB. Προσπαθούμε να παραδώσουμε σύγχρονα, γρήγορα και ασφαλή προϊόντα, πιστεύοντας ότι το τελικό αποτέλεσμα είναι η καλύτερη επαγγελματική μας κάρτα.",
    },
    stats: {
      years: { en: "Years Experience", el: "Χρόνια Εμπειρίας" },
      satisfaction: { en: "Client Satisfaction", el: "Ικανοποίηση Πελατών" },
      defect: { en: "Defect Policy", el: "Πολιτική Σφαλμάτων" },
    },
    teamLabel: { en: "The team", el: "Η ομάδα" },
    teamHeading1: { en: "Core", el: "Βασική" },
    teamHeading2: { en: "expertise.", el: "εξειδίκευση." },
    roles: {
      webDev: { en: "Web Developer", el: "Web Developer" },
      webDevDesc: {
        en: "Result-oriented full-stack developer with deep expertise in modern frameworks and cloud-native architecture.",
        el: "Προσανατολισμένος σε αποτελέσματα full-stack developer με βαθιά εξειδίκευση σε σύγχρονα frameworks και cloud-native αρχιτεκτονική.",
      },
      designer: { en: "UI/UX Designer", el: "Σχεδιαστής UI/UX" },
      designerDesc: {
        en: "Certified designer crafting intuitive interfaces that turn complex workflows into seamless user experiences.",
        el: "Πιστοποιημένος σχεδιαστής που δημιουργεί διαισθητικές διεπαφές μετατρέποντας σύνθετες ροές εργασίας σε απρόσκοπτες εμπειρίες χρήστη.",
      },
      qa: { en: "QA Engineer", el: "Μηχανικός QA" },
      qaDesc: {
        en: "ISTQB-accredited tester ensuring every product meets the highest standards of stability and security.",
        el: "Διαπιστευμένος ελεγκτής ISTQB που διασφαλίζει ότι κάθε προϊόν πληροί τα υψηλότερα πρότυπα σταθερότητας και ασφάλειας.",
      },
    },
    valuesHeading1: { en: "We believe the final result is our best", el: "Πιστεύουμε ότι το τελικό αποτέλεσμα είναι η καλύτερη" },
    valuesHeading2: { en: "calling card.", el: "επαγγελματική μας κάρτα." },
    valuesDesc: {
      en: "Every project we take on is a commitment to excellence. We combine technical expertise with creative vision to deliver solutions that exceed expectations.",
      el: "Κάθε έργο που αναλαμβάνουμε είναι μια δέσμευση στην αριστεία. Συνδυάζουμε τεχνική εξειδίκευση με δημιουργικό όραμα για να παραδώσουμε λύσεις που ξεπερνούν τις προσδοκίες.",
    },
  },

  // Privacy Policy
  privacy: {
    heading1: { en: "Privacy", el: "Πολιτική" },
    heading2: { en: "Policy.", el: "Απορρήτου." },
    lastUpdated: { en: "Last updated:", el: "Τελευταία ενημέρωση:" },
    sections: [
      {
        title: { en: "1. Data Controller", el: "1. Υπεύθυνος Επεξεργασίας Δεδομένων" },
        content: {
          en: `The data controller responsible for your personal data is:\n\n**DevCraft**\nThessaloniki, Greece\nPhone: +30 697 583 5277\n\nFor any data protection inquiries, you may contact us using the details above.`,
          el: `Ο υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων είναι:\n\n**DevCraft**\nΘεσσαλονίκη, Ελλάδα\nΤηλέφωνο: +30 697 583 5277\n\nΓια οποιοδήποτε ερώτημα σχετικά με την προστασία δεδομένων, μπορείτε να επικοινωνήσετε μαζί μας χρησιμοποιώντας τα παραπάνω στοιχεία.`,
        },
      },
      {
        title: { en: "2. Information We Collect", el: "2. Πληροφορίες που Συλλέγουμε" },
        content: {
          en: `We may collect the following types of information when you visit our website or use our services:\n\n• **Personal Information**: Name, email address, phone number, and other contact details you voluntarily provide through our contact form.\n• **Usage Data**: Browser type, IP address, pages visited, time spent on the site, and referring URLs.\n• **Cookies & Tracking**: Small data files stored on your device to improve functionality and analyze traffic patterns.`,
          el: `Ενδέχεται να συλλέξουμε τους ακόλουθους τύπους πληροφοριών όταν επισκέπτεστε τον ιστότοπό μας ή χρησιμοποιείτε τις υπηρεσίες μας:\n\n• **Προσωπικές Πληροφορίες**: Όνομα, διεύθυνση email, αριθμός τηλεφώνου και άλλα στοιχεία επικοινωνίας που παρέχετε εθελοντικά μέσω της φόρμας επικοινωνίας μας.\n• **Δεδομένα Χρήσης**: Τύπος προγράμματος περιήγησης, διεύθυνση IP, σελίδες που επισκεφτήκατε, χρόνος παραμονής στον ιστότοπο και URLs παραπομπής.\n• **Cookies & Παρακολούθηση**: Μικρά αρχεία δεδομένων που αποθηκεύονται στη συσκευή σας για τη βελτίωση της λειτουργικότητας και την ανάλυση προτύπων κίνησης.`,
        },
      },
      {
        title: { en: "3. Legal Basis for Processing", el: "3. Νομική Βάση Επεξεργασίας" },
        content: {
          en: `We process your personal data based on the following legal grounds under GDPR (Article 6):\n\n• **Consent (Art. 6(1)(a))**: When you submit a contact form or accept non-essential cookies, you provide explicit consent.\n• **Legitimate Interest (Art. 6(1)(f))**: We may process usage data to improve our website and services, provided this does not override your fundamental rights.\n• **Legal Obligation (Art. 6(1)(c))**: We may process data when required by applicable law.`,
          el: `Επεξεργαζόμαστε τα προσωπικά σας δεδομένα με βάση τις ακόλουθες νομικές βάσεις σύμφωνα με τον GDPR (Άρθρο 6):\n\n• **Συγκατάθεση (Άρθ. 6(1)(α))**: Όταν υποβάλλετε φόρμα επικοινωνίας ή αποδέχεστε μη απαραίτητα cookies, παρέχετε ρητή συγκατάθεση.\n• **Έννομο Συμφέρον (Άρθ. 6(1)(στ))**: Ενδέχεται να επεξεργαστούμε δεδομένα χρήσης για τη βελτίωση του ιστότοπου και των υπηρεσιών μας, υπό την προϋπόθεση ότι αυτό δεν υπερισχύει των θεμελιωδών σας δικαιωμάτων.\n• **Νομική Υποχρέωση (Άρθ. 6(1)(γ))**: Ενδέχεται να επεξεργαστούμε δεδομένα όταν απαιτείται από την ισχύουσα νομοθεσία.`,
        },
      },
      {
        title: { en: "4. AI Assistant & Interaction Data", el: "4. AI Βοηθός & Δεδομένα Αλληλεπίδρασης" },
        content: {
          en: `If you interact with our AI-powered assistant, we may collect and process the information you provide during the chat to deliver accurate responses.\n\n**Chat Storage**: AI assistant conversations may be stored for quality assurance purposes. These stored conversations help us monitor, evaluate, and improve the accuracy and reliability of the AI assistant's responses.\n\n**Data Minimization**: We encourage users not to share sensitive personal information (e.g., passwords, health data, or financial details) within the chat.\n\n**Purpose**: Chat logs are used solely to improve the quality of the AI responses and to assist with your inquiries in real-time.\n\n**Service Providers**: We use industry-leading AI models (such as OpenAI or Anthropic). Your data is processed securely and is not used by these providers to train their global models unless explicitly stated otherwise.\n\n**Retention**: Chat history is stored for a maximum of 6 months for quality assurance purposes, after which it is automatically deleted or anonymized.`,
          el: `Εάν αλληλεπιδράσετε με τον AI βοηθό μας, ενδέχεται να συλλέξουμε και να επεξεργαστούμε τις πληροφορίες που παρέχετε κατά τη διάρκεια της συνομιλίας για να παρέχουμε ακριβείς απαντήσεις.\n\n**Αποθήκευση Συνομιλιών**: Οι συνομιλίες με τον AI βοηθό ενδέχεται να αποθηκεύονται για σκοπούς διασφάλισης ποιότητας. Αυτές οι αποθηκευμένες συνομιλίες μας βοηθούν να παρακολουθούμε, να αξιολογούμε και να βελτιώνουμε την ακρίβεια και την αξιοπιστία των απαντήσεων του AI βοηθού.\n\n**Ελαχιστοποίηση Δεδομένων**: Ενθαρρύνουμε τους χρήστες να μην μοιράζονται ευαίσθητες προσωπικές πληροφορίες (π.χ. κωδικούς πρόσβασης, δεδομένα υγείας ή οικονομικά στοιχεία) μέσα στη συνομιλία.\n\n**Σκοπός**: Τα αρχεία καταγραφής συνομιλίας χρησιμοποιούνται αποκλειστικά για τη βελτίωση της ποιότητας των απαντήσεων του AI και για να σας βοηθήσουν με τα ερωτήματά σας σε πραγματικό χρόνο.\n\n**Πάροχοι Υπηρεσιών**: Χρησιμοποιούμε κορυφαία μοντέλα AI (όπως OpenAI ή Anthropic). Τα δεδομένα σας επεξεργάζονται με ασφάλεια και δεν χρησιμοποιούνται από αυτούς τους παρόχους για την εκπαίδευση των παγκόσμιων μοντέλων τους, εκτός εάν δηλωθεί ρητά διαφορετικά.\n\n**Διατήρηση**: Το ιστορικό συνομιλίας αποθηκεύεται για μέγιστο 6 μήνες για σκοπούς διασφάλισης ποιότητας, μετά από τους οποίους διαγράφεται αυτόματα ή ανωνυμοποιείται.`,
        },
      },
      {
        title: { en: "5. How We Use Your Information", el: "5. Πώς Χρησιμοποιούμε τις Πληροφορίες σας" },
        content: {
          en: `We use the collected information for the following purposes:\n\n• To provide, maintain, and improve our services\n• To respond to inquiries and communicate with you\n• To analyze website usage and optimize user experience\n• To comply with legal obligations\n• To send occasional updates about our services (only with your explicit consent)`,
          el: `Χρησιμοποιούμε τις συλλεγόμενες πληροφορίες για τους ακόλουθους σκοπούς:\n\n• Για την παροχή, τη συντήρηση και τη βελτίωση των υπηρεσιών μας\n• Για την απάντηση σε ερωτήματα και την επικοινωνία μαζί σας\n• Για την ανάλυση της χρήσης του ιστότοπου και τη βελτιστοποίηση της εμπειρίας χρήστη\n• Για τη συμμόρφωση με νομικές υποχρεώσεις\n• Για την αποστολή περιστασιακών ενημερώσεων σχετικά με τις υπηρεσίες μας (μόνο με τη ρητή συγκατάθεσή σας)`,
        },
      },
      {
        title: { en: "6. Data Retention", el: "6. Διατήρηση Δεδομένων" },
        content: {
          en: `We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy:\n\n• **Contact form submissions**: Up to 12 months after your last interaction, unless an ongoing business relationship requires longer retention.\n• **Usage/analytics data**: Up to 26 months (anonymized where possible).\n• **Cookie consent preferences**: Stored locally on your device until you clear your browser data.\n\nAfter the retention period, your data is securely deleted or anonymized.`,
          el: `Διατηρούμε τα προσωπικά σας δεδομένα μόνο για όσο χρόνο είναι απαραίτητο για την εκπλήρωση των σκοπών που περιγράφονται σε αυτήν την πολιτική:\n\n• **Υποβολές φόρμας επικοινωνίας**: Έως 12 μήνες μετά την τελευταία σας αλληλεπίδραση, εκτός εάν μια συνεχής επιχειρηματική σχέση απαιτεί μεγαλύτερη διατήρηση.\n• **Δεδομένα χρήσης/ανάλυσης**: Έως 26 μήνες (ανωνυμοποιημένα όπου είναι δυνατόν).\n• **Προτιμήσεις συγκατάθεσης cookies**: Αποθηκεύονται τοπικά στη συσκευή σας μέχρι να διαγράψετε τα δεδομένα του προγράμματος περιήγησής σας.\n\nΜετά την περίοδο διατήρησης, τα δεδομένα σας διαγράφονται με ασφάλεια ή ανωνυμοποιούνται.`,
        },
      },
      {
        title: { en: "7. Cookies", el: "7. Cookies" },
        content: {
          en: `Our website uses cookies to:\n\n• **Strictly necessary cookies**: Required for the website to function (e.g., cookie consent preference). These cannot be disabled.\n• **Analytics cookies**: Help us understand how visitors interact with our site (only with your consent).\n\nYou can manage your cookie preferences through the cookie banner or your browser settings. You may withdraw consent at any time by clearing your browser cookies.`,
          el: `Ο ιστότοπός μας χρησιμοποιεί cookies για:\n\n• **Αυστηρά απαραίτητα cookies**: Απαιτούνται για τη λειτουργία του ιστότοπου (π.χ. προτίμηση συγκατάθεσης cookies). Δεν μπορούν να απενεργοποιηθούν.\n• **Cookies ανάλυσης**: Μας βοηθούν να κατανοήσουμε πώς οι επισκέπτες αλληλεπιδρούν με τον ιστότοπό μας (μόνο με τη συγκατάθεσή σας).\n\nΜπορείτε να διαχειριστείτε τις προτιμήσεις σας για cookies μέσω του banner cookies ή των ρυθμίσεων του προγράμματος περιήγησής σας. Μπορείτε να αποσύρετε τη συγκατάθεσή σας ανά πάσα στιγμή καθαρίζοντας τα cookies του προγράμματος περιήγησής σας.`,
        },
      },
      {
        title: { en: "8. Data Sharing", el: "8. Κοινοποίηση Δεδομένων" },
        content: {
          en: `We do not sell, trade, or rent your personal information to third parties. We may share data with:\n\n• **Service providers** who assist in operating our website and services (under data processing agreements)\n• **Legal authorities** when required by law or to protect our rights\n• **Analytics partners** in anonymized form\n\nAll third-party processors are required to comply with GDPR and protect your data.`,
          el: `Δεν πουλάμε, ανταλλάσσουμε ή ενοικιάζουμε τις προσωπικές σας πληροφορίες σε τρίτους. Ενδέχεται να μοιραστούμε δεδομένα με:\n\n• **Παρόχους υπηρεσιών** που βοηθούν στη λειτουργία του ιστότοπου και των υπηρεσιών μας (βάσει συμφωνιών επεξεργασίας δεδομένων)\n• **Νομικές αρχές** όταν απαιτείται από τον νόμο ή για την προστασία των δικαιωμάτων μας\n• **Συνεργάτες ανάλυσης** σε ανωνυμοποιημένη μορφή\n\nΌλοι οι τρίτοι επεξεργαστές υποχρεούνται να συμμορφώνονται με τον GDPR και να προστατεύουν τα δεδομένα σας.`,
        },
      },
      {
        title: { en: "9. Data Security", el: "9. Ασφάλεια Δεδομένων" },
        content: {
          en: `We implement industry-standard security measures to protect your personal information, including encrypted data transmission (HTTPS/TLS) and secure hosting infrastructure. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.`,
          el: `Εφαρμόζουμε μέτρα ασφαλείας βιομηχανικού επιπέδου για την προστασία των προσωπικών σας πληροφοριών, συμπεριλαμβανομένης κρυπτογραφημένης μετάδοσης δεδομένων (HTTPS/TLS) και ασφαλούς υποδομής φιλοξενίας. Ωστόσο, καμία μέθοδος ηλεκτρονικής μετάδοσης ή αποθήκευσης δεν είναι 100% ασφαλής και δεν μπορούμε να εγγυηθούμε απόλυτη ασφάλεια.`,
        },
      },
      {
        title: { en: "10. Your Rights Under GDPR", el: "10. Τα Δικαιώματά σας βάσει GDPR" },
        content: {
          en: `Under the General Data Protection Regulation (GDPR), you have the following rights:\n\n• **Right of Access** (Art. 15): Obtain a copy of your personal data\n• **Right to Rectification** (Art. 16): Correct inaccurate data\n• **Right to Erasure** (Art. 17): Request deletion of your data ("right to be forgotten")\n• **Right to Restrict Processing** (Art. 18): Limit how we use your data\n• **Right to Data Portability** (Art. 20): Receive your data in a structured, machine-readable format\n• **Right to Object** (Art. 21): Object to processing based on legitimate interest\n• **Right to Withdraw Consent**: Withdraw consent at any time without affecting prior processing\n\nTo exercise any of these rights, contact us at +30 697 583 5277. We will respond within 30 days.\n\n**Right to Lodge a Complaint**: If you believe your data protection rights have been violated, you have the right to file a complaint with the **Hellenic Data Protection Authority (HDPA)**:\nWebsite: www.dpa.gr\nPhone: +30 210 647 5600`,
          el: `Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR), έχετε τα ακόλουθα δικαιώματα:\n\n• **Δικαίωμα Πρόσβασης** (Άρθ. 15): Λήψη αντιγράφου των προσωπικών σας δεδομένων\n• **Δικαίωμα Διόρθωσης** (Άρθ. 16): Διόρθωση ανακριβών δεδομένων\n• **Δικαίωμα Διαγραφής** (Άρθ. 17): Αίτημα διαγραφής των δεδομένων σας ("δικαίωμα στη λήθη")\n• **Δικαίωμα Περιορισμού Επεξεργασίας** (Άρθ. 18): Περιορισμός του τρόπου χρήσης των δεδομένων σας\n• **Δικαίωμα Φορητότητας Δεδομένων** (Άρθ. 20): Λήψη των δεδομένων σας σε δομημένη, αναγνώσιμη από μηχανή μορφή\n• **Δικαίωμα Εναντίωσης** (Άρθ. 21): Εναντίωση στην επεξεργασία βάσει έννομου συμφέροντος\n• **Δικαίωμα Ανάκλησης Συγκατάθεσης**: Ανάκληση συγκατάθεσης ανά πάσα στιγμή χωρίς επίπτωση στην προηγούμενη επεξεργασία\n\nΓια να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα, επικοινωνήστε μαζί μας στο +30 697 583 5277. Θα απαντήσουμε εντός 30 ημερών.\n\n**Δικαίωμα Υποβολής Καταγγελίας**: Εάν πιστεύετε ότι τα δικαιώματα προστασίας δεδομένων σας έχουν παραβιαστεί, έχετε το δικαίωμα να υποβάλετε καταγγελία στην **Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)**:\nΙστοσελίδα: www.dpa.gr\nΤηλέφωνο: +30 210 647 5600`,
        },
      },
      {
        title: { en: "11. International Data Transfers", el: "11. Διεθνείς Μεταφορές Δεδομένων" },
        content: {
          en: `Your data is primarily processed within the European Economic Area (EEA). If any data is transferred outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission.`,
          el: `Τα δεδομένα σας επεξεργάζονται κυρίως εντός του Ευρωπαϊκού Οικονομικού Χώρου (ΕΟΧ). Εάν μεταφερθούν δεδομένα εκτός ΕΟΧ, διασφαλίζουμε ότι υπάρχουν κατάλληλες εγγυήσεις, όπως Τυπικές Συμβατικές Ρήτρες (SCCs) εγκεκριμένες από την Ευρωπαϊκή Επιτροπή.`,
        },
      },
      {
        title: { en: "12. Third-Party Links", el: "12. Σύνδεσμοι Τρίτων" },
        content: {
          en: `Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these external websites. We encourage you to read their privacy policies.`,
          el: `Ο ιστότοπός μας ενδέχεται να περιέχει συνδέσμους προς ιστότοπους τρίτων. Δεν φέρουμε ευθύνη για τις πρακτικές απορρήτου ή το περιεχόμενο αυτών των εξωτερικών ιστότοπων. Σας ενθαρρύνουμε να διαβάσετε τις πολιτικές απορρήτου τους.`,
        },
      },
      {
        title: { en: "13. Changes to This Policy", el: "13. Αλλαγές σε αυτήν την Πολιτική" },
        content: {
          en: `We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date. For significant changes, we will make reasonable efforts to notify you.`,
          el: `Διατηρούμε το δικαίωμα να ενημερώσουμε αυτήν την Πολιτική Απορρήτου ανά πάσα στιγμή. Οι αλλαγές θα δημοσιεύονται σε αυτή τη σελίδα με ενημερωμένη ημερομηνία ισχύος. Για σημαντικές αλλαγές, θα καταβάλλουμε εύλογες προσπάθειες να σας ειδοποιήσουμε.`,
        },
      },
      {
        title: { en: "14. Contact Us", el: "14. Επικοινωνήστε μαζί μας" },
        content: {
          en: `If you have questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:`,
          el: `Αν έχετε ερωτήσεις σχετικά με αυτήν την Πολιτική Απορρήτου ή επιθυμείτε να ασκήσετε τα δικαιώματα προστασίας δεδομένων σας, επικοινωνήστε μαζί μας:`,
        },
        contactInfo: true,
      },
    ],
  },

  // Terms of Service
  terms: {
    heading1: { en: "Terms of", el: "Όροι" },
    heading2: { en: "Service", el: "Χρήσης" },
    lastUpdated: { en: "Last updated:", el: "Τελευταία ενημέρωση:" },
    sections: [
      {
        title: { en: "1. Acceptance of Terms", el: "1. Αποδοχή Όρων" },
        content: {
          en: `By accessing and using the DevCraft website (devcraft.gr) and our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services.`,
          el: `Με την πρόσβαση και χρήση του ιστότοπου DevCraft (devcraft.gr) και των υπηρεσιών μας, συμφωνείτε ότι δεσμεύεστε από αυτούς τους Όρους Χρήσης. Εάν δεν συμφωνείτε με οποιοδήποτε μέρος αυτών των όρων, δεν πρέπει να χρησιμοποιείτε τον ιστότοπο ή τις υπηρεσίες μας.`,
        },
      },
      {
        title: { en: "2. Services Description", el: "2. Περιγραφή Υπηρεσιών" },
        content: {
          en: `DevCraft provides web development, UI/UX design, and quality assurance services. The specific scope, deliverables, timelines, and fees for each project are defined in individual project agreements between DevCraft and the client.`,
          el: `Η DevCraft παρέχει υπηρεσίες ανάπτυξης ιστοσελίδων, σχεδιασμού UI/UX και διασφάλισης ποιότητας. Το συγκεκριμένο πεδίο εφαρμογής, τα παραδοτέα, τα χρονοδιαγράμματα και οι αμοιβές για κάθε έργο καθορίζονται σε ξεχωριστές συμφωνίες έργου μεταξύ της DevCraft και του πελάτη.`,
        },
      },
      {
        title: { en: "3. Intellectual Property", el: "3. Πνευματική Ιδιοκτησία" },
        content: {
          en: `All content on this website — including text, graphics, logos, icons, images, and software — is the property of DevCraft or its content suppliers and is protected by international copyright laws.\n\nFor client projects, intellectual property rights transfer is governed by individual project agreements. Unless otherwise agreed in writing, upon full payment, clients receive ownership of the custom code and designs created specifically for their project.`,
          el: `Όλο το περιεχόμενο αυτού του ιστότοπου — συμπεριλαμβανομένων κειμένων, γραφικών, λογοτύπων, εικονιδίων, εικόνων και λογισμικού — αποτελεί ιδιοκτησία της DevCraft ή των παρόχων περιεχομένου της και προστατεύεται από τους διεθνείς νόμους πνευματικών δικαιωμάτων.\n\nΓια τα έργα πελατών, η μεταβίβαση δικαιωμάτων πνευματικής ιδιοκτησίας διέπεται από ξεχωριστές συμφωνίες έργου. Εκτός αν συμφωνηθεί διαφορετικά εγγράφως, μετά την πλήρη πληρωμή, οι πελάτες λαμβάνουν κυριότητα του προσαρμοσμένου κώδικα και των σχεδίων που δημιουργήθηκαν ειδικά για το έργο τους.`,
        },
      },
      {
        title: { en: "4. User Conduct", el: "4. Συμπεριφορά Χρήστη" },
        content: {
          en: `When using our website, you agree not to:\n\n• Use the website for any unlawful purpose or in violation of any applicable laws\n• Attempt to gain unauthorized access to any part of the website or its systems\n• Interfere with or disrupt the website's functionality or servers\n• Copy, reproduce, or distribute any content without prior written consent\n• Transmit any viruses, malware, or other harmful code\n• Use automated tools to scrape, crawl, or extract data from the website`,
          el: `Κατά τη χρήση του ιστότοπού μας, συμφωνείτε να μην:\n\n• Χρησιμοποιείτε τον ιστότοπο για οποιονδήποτε παράνομο σκοπό ή κατά παράβαση οποιουδήποτε ισχύοντος νόμου\n• Επιχειρείτε μη εξουσιοδοτημένη πρόσβαση σε οποιοδήποτε μέρος του ιστότοπου ή των συστημάτων του\n• Παρεμβαίνετε ή διαταράσσετε τη λειτουργικότητα του ιστότοπου ή των διακομιστών\n• Αντιγράφετε, αναπαράγετε ή διανέμετε οποιοδήποτε περιεχόμενο χωρίς προηγούμενη γραπτή συγκατάθεση\n• Μεταδίδετε ιούς, κακόβουλο λογισμικό ή άλλον επιβλαβή κώδικα\n• Χρησιμοποιείτε αυτοματοποιημένα εργαλεία για εξαγωγή δεδομένων από τον ιστότοπο`,
        },
      },
      {
        title: { en: "5. Project Agreements", el: "5. Συμφωνίες Έργου" },
        content: {
          en: `Individual project engagements are governed by separate agreements that outline:\n\n• **Scope of work** and deliverables\n• **Timeline** and milestones\n• **Payment terms** and schedule\n• **Revision policy** and change requests\n• **Intellectual property** transfer terms\n\nThese project-specific agreements supplement these general Terms of Service. In case of conflict, the project agreement prevails.`,
          el: `Οι μεμονωμένες αναθέσεις έργων διέπονται από ξεχωριστές συμφωνίες που περιγράφουν:\n\n• **Πεδίο εφαρμογής** και παραδοτέα\n• **Χρονοδιάγραμμα** και ορόσημα\n• **Όρους πληρωμής** και πρόγραμμα\n• **Πολιτική αναθεωρήσεων** και αιτήματα αλλαγών\n• **Όρους μεταβίβασης** πνευματικής ιδιοκτησίας\n\nΑυτές οι ειδικές συμφωνίες έργου συμπληρώνουν αυτούς τους γενικούς Όρους Χρήσης. Σε περίπτωση σύγκρουσης, υπερισχύει η συμφωνία έργου.`,
        },
      },
      {
        title: { en: "6. Limitation of Liability", el: "6. Περιορισμός Ευθύνης" },
        content: {
          en: `To the maximum extent permitted by applicable law, DevCraft shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.\n\nOur total liability for any claim arising from our services shall not exceed the amount paid by you for the specific service giving rise to the claim. This limitation applies regardless of the legal theory on which the claim is based.`,
          el: `Στο μέγιστο βαθμό που επιτρέπεται από την ισχύουσα νομοθεσία, η DevCraft δεν ευθύνεται για τυχόν έμμεσες, τυχαίες, ειδικές, επακόλουθες ή τιμωρητικές ζημίες που προκύπτουν από τη χρήση του ιστότοπου ή των υπηρεσιών μας.\n\nΗ συνολική μας ευθύνη για οποιαδήποτε αξίωση που προκύπτει από τις υπηρεσίες μας δεν υπερβαίνει το ποσό που καταβλήθηκε από εσάς για τη συγκεκριμένη υπηρεσία. Αυτός ο περιορισμός ισχύει ανεξάρτητα από τη νομική θεωρία στην οποία βασίζεται η αξίωση.`,
        },
      },
      {
        title: { en: "7. Warranties and Disclaimers", el: "7. Εγγυήσεις και Αποποιήσεις" },
        content: {
          en: `Our website is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.\n\nFor contracted services, specific warranties and guarantees are outlined in individual project agreements.`,
          el: `Ο ιστότοπός μας παρέχεται "ως έχει" και "ως διαθέσιμος" χωρίς εγγυήσεις οποιουδήποτε είδους, ρητές ή σιωπηρές. Δεν εγγυόμαστε ότι ο ιστότοπος θα λειτουργεί αδιάλειπτα, χωρίς σφάλματα ή ελεύθερος από ιούς ή άλλα επιβλαβή στοιχεία.\n\nΓια τις συμβατικές υπηρεσίες, οι ειδικές εγγυήσεις περιγράφονται στις ξεχωριστές συμφωνίες έργου.`,
        },
      },
      {
        title: { en: "8. Governing Law", el: "8. Εφαρμοστέο Δίκαιο" },
        content: {
          en: `These Terms of Service are governed by and construed in accordance with the laws of the Hellenic Republic (Greece). Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Thessaloniki, Greece.\n\nFor EU consumers, this does not affect your rights under mandatory consumer protection laws of your country of residence.`,
          el: `Αυτοί οι Όροι Χρήσης διέπονται και ερμηνεύονται σύμφωνα με τους νόμους της Ελληνικής Δημοκρατίας. Οποιαδήποτε διαφορά που προκύπτει από αυτούς τους όρους υπάγεται στην αποκλειστική δικαιοδοσία των δικαστηρίων της Θεσσαλονίκης, Ελλάδα.\n\nΓια καταναλωτές της ΕΕ, αυτό δεν επηρεάζει τα δικαιώματά σας βάσει υποχρεωτικών νόμων προστασίας καταναλωτών της χώρας διαμονής σας.`,
        },
      },
      {
        title: { en: "9. Changes to Terms", el: "9. Αλλαγές στους Όρους" },
        content: {
          en: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page with an updated date. Your continued use of the website after changes constitutes acceptance of the modified terms.\n\nWe encourage you to review this page periodically for updates.`,
          el: `Διατηρούμε το δικαίωμα να τροποποιήσουμε αυτούς τους Όρους Χρήσης ανά πάσα στιγμή. Οι αλλαγές θα ισχύουν αμέσως μετά τη δημοσίευσή τους σε αυτή τη σελίδα με ενημερωμένη ημερομηνία. Η συνέχιση χρήσης του ιστότοπου μετά τις αλλαγές αποτελεί αποδοχή των τροποποιημένων όρων.\n\nΣας ενθαρρύνουμε να ελέγχετε αυτή τη σελίδα περιοδικά για ενημερώσεις.`,
        },
      },
      {
        title: { en: "10. Contact", el: "10. Επικοινωνία" },
        content: {
          en: `If you have any questions about these Terms of Service, please contact us:\n\n• **Phone**: +30 697 583 5277`,
          el: `Εάν έχετε ερωτήσεις σχετικά με αυτούς τους Όρους Χρήσης, επικοινωνήστε μαζί μας:\n\n• **Τηλέφωνο**: +30 697 583 5277`,
        },
      },
    ],
  },

  // Cookie consent
  cookie: {
    message: {
      en: "We use cookies to enhance your browsing experience and analyze site traffic. You can accept or decline non-essential cookies. Learn more in our",
      el: "Χρησιμοποιούμε cookies για τη βελτίωση της εμπειρίας περιήγησής σας και την ανάλυση της επισκεψιμότητας. Μπορείτε να αποδεχτείτε ή να απορρίψετε τα μη απαραίτητα cookies. Μάθετε περισσότερα στην",
    },
    privacyPolicy: { en: "Privacy Policy", el: "Πολιτική Απορρήτου" },
    accept: { en: "Accept", el: "Αποδοχή" },
    decline: { en: "Decline", el: "Απόρριψη" },
  },

  // Portfolio
  portfolio: {
    label: { en: "Our", el: "Τα Έργα" },
    label2: { en: "Projects", el: "μας" },
    subtitle: {
      en: "A selection of websites we've built for our clients. Real projects, real results.",
      el: "Μια επιλογή ιστοσελίδων που δημιουργήσαμε για τους πελάτες μας. Πραγματικά έργα, πραγματικά αποτελέσματα.",
    },
    projects: [
      {
        title: { en: "Cleanup SKG", el: "Cleanup SKG" },
        category: { en: "Business Website", el: "Επιχειρηματική Ιστοσελίδα" },
        description: {
          en: "Custom-built business website with online booking integration and responsive service showcase.",
          el: "Ιστοσελίδα κατά παραγγελία με ενσωμάτωση online κρατήσεων και responsive παρουσίαση υπηρεσιών.",
        },
      },
      {
        title: { en: "Luxe Ellada", el: "Luxe Ellada" },
        category: { en: "Premium Web Platform", el: "Premium Πλατφόρμα" },
        description: {
          en: "High-end web platform with immersive visuals, smooth animations, and editorial content layout.",
          el: "Πλατφόρμα υψηλής αισθητικής με immersive visuals, ομαλά animations και editorial διάταξη περιεχομένου.",
        },
      },
      {
        title: { en: "Dental Care", el: "Dental Care" },
        category: { en: "Professional Website", el: "Επαγγελματική Ιστοσελίδα" },
        description: {
          en: "Modern professional website featuring interactive gallery and streamlined appointment system.",
          el: "Σύγχρονη επαγγελματική ιστοσελίδα με διαδραστική γκαλερί και βελτιστοποιημένο σύστημα ραντεβού.",
        },
      },
      {
        title: { en: "Premium Real Estate", el: "Premium Real Estate" },
        category: { en: "Web Application", el: "Web Εφαρμογή" },
        description: {
          en: "Feature-rich web application with advanced filtering, property listings, and virtual tour integration.",
          el: "Web εφαρμογή με προηγμένο φιλτράρισμα, καταχωρήσεις ακινήτων και ενσωμάτωση εικονικών περιηγήσεων.",
        },
      },
    ],
  },

  // Pricing / Plans
  pricing: {
    label: { en: "Service Plans", el: "Πακέτα Υπηρεσιών" },
    heading1: { en: "ISTQB Certified Web Development", el: "Πιστοποιημένη Ανάπτυξη Ιστοσελίδων ISTQB" },
    heading2: { en: "in Thessaloniki", el: "στη Θεσσαλονίκη" },
    subtitle: {
      en: "From a single landing page to a multilingual platform — every plan includes responsive design, search engine visibility, and ongoing support so you never feel left on your own.",
      el: "Από μονοσέλιδο landing page έως πολύγλωσση πλατφόρμα — κάθε πακέτο περιλαμβάνει responsive design, ορατότητα στις μηχανές αναζήτησης και συνεχή υποστήριξη ώστε να μην μείνετε ποτέ μόνοι.",
    },
    plans: [
      {
        name: { en: "MINI", el: "MINI" },
        tagline: { en: "The Clean Start", el: "Καθαρή Αρχή" },
        bestFor: {
          en: "Perfect for new businesses or personal brands making their first impression online.",
          el: "Ιδανικό για νέες επιχειρήσεις ή προσωπικά brands που κάνουν την πρώτη τους εντύπωση online.",
        },
        price: { en: "€600 – €700", el: "€600 – €700" },
        delivery: { en: "2 working days", el: "2 εργάσιμες ημέρες" },
        description: {
          en: "A beautifully crafted landing page that puts your business on the map. Mobile-ready, secure, and designed to turn visitors into customers from day one.",
          el: "Ένα προσεγμένο landing page που φέρνει την επιχείρησή σας online. Mobile-ready, ασφαλές και σχεδιασμένο να μετατρέπει επισκέπτες σε πελάτες από την πρώτη μέρα.",
        },
        features: {
          en: [
            "Complete Single-Page Website (Home, About, Services, Contact)",
            "1 Language (Greek)",
            "Technical SEO Setup (Sitemap, Meta Tags, Indexing)",
            "Social Media Integration",
            "Direct Contact Tools (Email & Phone)",
            "Privacy Policy & Terms Auto-Generated",
            "GDPR & Cookie Compliance",
            "Fast Loading (Mobile & Desktop)",
            "SSL Security Certificate",
          ],
          el: [
            "Ολοκληρωμένη Μονοσέλιδη Ιστοσελίδα (Αρχική, Σχετικά, Υπηρεσίες, Επικοινωνία)",
            "1 Γλώσσα (Ελληνικά)",
            "Τεχνικό SEO (Sitemap, Meta Tags, Indexing)",
            "Σύνδεση Social Media",
            "Εργαλεία Επικοινωνίας (Email & Τηλέφωνο)",
            "Αυτόματη Δημιουργία Πολιτικής Απορρήτου & Όρων",
            "Συμμόρφωση GDPR & Cookies",
            "Γρήγορη Φόρτωση (Mobile & Desktop)",
            "Πιστοποιητικό Ασφαλείας SSL",
          ],
        },
      },
      {
        name: { en: "MIDI", el: "MIDI" },
        tagline: { en: "The Corporate Standard", el: "Εταιρικό Στάνταρ" },
        bestFor: {
          en: "For established businesses looking to build trust and showcase their work professionally.",
          el: "Για καθιερωμένες επιχειρήσεις που θέλουν να χτίσουν εμπιστοσύνη και να προβάλουν τη δουλειά τους επαγγελματικά.",
        },
        price: { en: "€1,000 – €1,200", el: "€1.000 – €1.200" },
        delivery: { en: "6–7 working days", el: "6–7 εργάσιμες ημέρες" },
        description: {
          en: "A professional multi-page website that works for you around the clock — showcasing your services, displaying your work, and giving customers confidence in your brand.",
          el: "Μια επαγγελματική πολυσέλιδη ιστοσελίδα που δουλεύει για εσάς όλο το εικοσιτετράωρο — προβάλλει τις υπηρεσίες σας, δείχνει τη δουλειά σας και εμπνέει εμπιστοσύνη.",
        },
        features: {
          en: [
            "Up to 5 Pages",
            "1 Language",
            "Gallery & Portfolio Showcase",
            "Direct Contact Tools (Email & Phone)",
            "Technical SEO Setup (Sitemap, Meta Tags, Indexing)",
            "Privacy Policy & Terms Auto-Generated",
            "GDPR & Cookie Compliance",
            "Google Maps Integration",
            "Viber/WhatsApp Floating Button (Mobile)",
            "Google Maps & Search Optimization",
            "Advanced Local SEO (Robot-Friendly Data)",
            "Fast Loading (Mobile & Desktop)",
            "SSL Security Certificate",
          ],
          el: [
            "Έως 5 Σελίδες",
            "1 Γλώσσα",
            "Gallery & Προβολή Portfolio",
            "Εργαλεία Επικοινωνίας (Email & Τηλέφωνο)",
            "Τεχνικό SEO (Sitemap, Meta Tags, Indexing)",
            "Αυτόματη Δημιουργία Πολιτικής Απορρήτου & Όρων",
            "Συμμόρφωση GDPR & Cookies",
            "Ενσωμάτωση Google Maps",
            "Αιωρούμενο Κουμπί Viber/WhatsApp (Mobile)",
            "Google Maps & Βελτιστοποίηση Αναζήτησης",
            "Προηγμένο Τοπικό SEO (Robot-Friendly Data)",
            "Γρήγορη Φόρτωση (Mobile & Desktop)",
            "Πιστοποιητικό Ασφαλείας SSL",
          ],
        },
      },
      {
        name: { en: "MAXI", el: "MAXI" },
        tagline: { en: "The International Presence", el: "Διεθνής Παρουσία" },
        bestFor: {
          en: "For companies expanding to international markets with multi-language needs.",
          el: "Για εταιρείες που επεκτείνονται σε διεθνείς αγορές με πολύγλωσσες ανάγκες.",
        },
        price: { en: "€1,450 – €1,700", el: "€1.450 – €1.700" },
        delivery: { en: "9–12 working days", el: "9–12 εργάσιμες ημέρες" },
        description: {
          en: "Reach customers in their own language with a fully localized website. Includes a lead capture form, admin dashboard, and everything you need to manage your international presence with confidence.",
          el: "Προσεγγίστε πελάτες στη γλώσσα τους με μια πλήρως τοπικοποιημένη ιστοσελίδα. Περιλαμβάνει φόρμα επικοινωνίας, πίνακα διαχείρισης και όλα όσα χρειάζεστε για τη διεθνή σας παρουσία.",
        },
        features: {
          en: [
            "Up to 7 Pages",
            "2–3 Languages with Switcher",
            "Lead Capture Form with Spam Protection",
            "Gallery & Portfolio Showcase",
            "Localized SEO per Language",
            "Technical SEO Setup (Sitemap, Meta Tags, Indexing)",
            "Custom Error & Loading Pages",
            "Admin Dashboard for Messages",
            "Privacy Policy & Terms Auto-Generated",
            "GDPR & Cookie Compliance",
            "Google Maps Integration",
            "Viber/WhatsApp Floating Button (Mobile)",
            "Google Maps & Search Optimization",
            "Advanced Local SEO (Robot-Friendly Data)",
            "Copywriting",
            "Accessibility (WCAG) Compliance",
            "Fast Loading (Mobile & Desktop)",
            "SSL Security Certificate",
          ],
          el: [
            "Έως 7 Σελίδες",
            "2–3 Γλώσσες με Εναλλαγή",
            "Φόρμα Επικοινωνίας με Προστασία Spam",
            "Gallery & Προβολή Portfolio",
            "Τοπικοποιημένο SEO ανά Γλώσσα",
            "Τεχνικό SEO (Sitemap, Meta Tags, Indexing)",
            "Custom Σελίδες Σφάλματος & Φόρτωσης",
            "Πίνακας Διαχείρισης Μηνυμάτων",
            "Αυτόματη Δημιουργία Πολιτικής Απορρήτου & Όρων",
            "Συμμόρφωση GDPR & Cookies",
            "Ενσωμάτωση Google Maps",
            "Αιωρούμενο Κουμπί Viber/WhatsApp (Mobile)",
            "Google Maps & Βελτιστοποίηση Αναζήτησης",
            "Προηγμένο Τοπικό SEO (Robot-Friendly Data)",
            "Copywriting",
            "Συμμόρφωση Προσβασιμότητας (WCAG)",
            "Γρήγορη Φόρτωση (Mobile & Desktop)",
            "Πιστοποιητικό Ασφαλείας SSL",
          ],
        },
      },
      {
        name: { en: "ELITE", el: "ELITE" },
        tagline: { en: "The Elite Performance", el: "Ελίτ Απόδοση" },
        bestFor: {
          en: "For industry leaders who need custom features, AI tools, and certified quality assurance.",
          el: "Για ηγέτες του κλάδου που χρειάζονται custom λειτουργίες, εργαλεία AI και πιστοποιημένη διασφάλιση ποιότητας.",
        },
        price: { en: "€1,950 – €2,500", el: "€1.950 – €2.500" },
        delivery: { en: "14–16 working days", el: "14–16 εργάσιμες ημέρες" },
        description: {
          en: "A premium platform with intelligent automation, AI-powered assistant, custom animations, and ISTQB-certified quality assurance. Built for businesses that demand the best.",
          el: "Μια premium πλατφόρμα με ευφυή αυτοματισμό, AI βοηθό, custom animations και πιστοποιημένη ποιότητα ISTQB. Για επιχειρήσεις που απαιτούν το καλύτερο.",
        },
        features: {
          en: [
            "Up to 10 Pages + Interactive Tools",
            "Unlimited Languages",
            "AI Assistant Integration",
            "Lead & Booking Form with Spam Protection",
            "Custom Animations & Effects",
            "Automatic Image Optimization",
            "SEO-Optimized URL Structure",
            "Technical SEO Setup (Sitemap, Meta Tags, Indexing)",
            "Custom Error & Loading Pages",
            "Admin Dashboard for Messages & Bookings",
            "Privacy Policy & Terms Auto-Generated",
            "GDPR & Cookie Compliance",
            "Google Maps Integration",
            "Viber/WhatsApp Floating Button (Mobile)",
            "Google Maps & Search Optimization",
            "Advanced Local SEO (Robot-Friendly Data)",
            "Copywriting",
            "Accessibility (WCAG) Compliance",
            "Fast Loading (Mobile & Desktop)",
            "Quality Assurance (ISTQB Certified)",
            "SSL Security Certificate",
          ],
          el: [
            "Έως 10 Σελίδες + Διαδραστικά Εργαλεία",
            "Απεριόριστες Γλώσσες",
            "Ενσωμάτωση AI Βοηθού",
            "Φόρμα Επικοινωνίας & Κρατήσεων με Προστασία Spam",
            "Custom Animations & Εφέ",
            "Αυτόματη Βελτιστοποίηση Εικόνων",
            "SEO-Βελτιστοποιημένη Δομή URL",
            "Τεχνικό SEO (Sitemap, Meta Tags, Indexing)",
            "Custom Σελίδες Σφάλματος & Φόρτωσης",
            "Πίνακας Διαχείρισης Μηνυμάτων & Κρατήσεων",
            "Αυτόματη Δημιουργία Πολιτικής Απορρήτου & Όρων",
            "Συμμόρφωση GDPR & Cookies",
            "Ενσωμάτωση Google Maps",
            "Αιωρούμενο Κουμπί Viber/WhatsApp (Mobile)",
            "Google Maps & Βελτιστοποίηση Αναζήτησης",
            "Προηγμένο Τοπικό SEO (Robot-Friendly Data)",
            "Copywriting",
            "Συμμόρφωση Προσβασιμότητας (WCAG)",
            "Γρήγορη Φόρτωση (Mobile & Desktop)",
            "Διασφάλιση Ποιότητας (Πιστοποίηση ISTQB)",
            "Πιστοποιητικό Ασφαλείας SSL",
          ],
        },
      },
    ],
    vatNote: { en: "*Prices do not include VAT", el: "*Οι τιμές δεν περιλαμβάνουν ΦΠΑ" },
    deliveryNote: { en: "*Delivery starts after all content is received", el: "*Η παράδοση ξεκινά μετά τη λήψη όλου του περιεχομένου" },
    hostingNote: { en: "*All plans require an annual hosting & security subscription of €200", el: "*Όλα τα πακέτα απαιτούν ετήσια συνδρομή φιλοξενίας & ασφάλειας €200" },
    hostingDetail: { en: "** Covers high-speed server placement, SSL security, and technical monitoring", el: "** Περιλαμβάνει τοποθέτηση σε server υψηλής ταχύτητας, SSL ασφάλεια και τεχνική παρακολούθηση" },
  },

  // Language selector
  langSelector: {
    en: "EN",
    el: "ΕΛ",
  },
} as const;

export function t(obj: Record<Lang, string>, lang: Lang): string {
  return obj[lang] || obj.en;
}
