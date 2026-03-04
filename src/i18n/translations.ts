export type Lang = "en" | "el";

export const translations = {
  // Navbar
  nav: {
    aboutUs: { en: "About Us", el: "Σχετικά" },
    services: { en: "Services", el: "Υπηρεσίες" },
    work: { en: "Work", el: "Έργα" },
    process: { en: "Process", el: "Διαδικασία" },
    contact: { en: "Contact", el: "Επικοινωνία" },
    letsTalk: { en: "Let's talk", el: "Επικοινωνήστε" },
  },

  // Hero
  hero: {
    line1: { en: "We don't do", el: "Δεν κάνουμε" },
    line2: { en: "ordinary", el: "το συνηθισμένο" },
    description: {
      en: "AI-driven web development, bespoke interfaces, and ISTQB-certified quality assurance — crafted for brands that refuse to blend in.",
      el: "Ανάπτυξη ιστοσελίδων με τεχνητή νοημοσύνη, εξατομικευμένες διεπαφές και πιστοποιημένη διασφάλιση ποιότητας ISTQB — σχεδιασμένα για brands που αρνούνται να περάσουν απαρατήρητα.",
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
    heading1: { en: "Three things.", el: "Τρία πράγματα." },
    heading2: { en: "Done right.", el: "Σωστά." },
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
    heading1: { en: "Built to", el: "Σχεδιασμένα για να" },
    heading2: { en: "stand out.", el: "ξεχωρίζουν." },
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
    ourWork: { en: "Our Work", el: "Τα Έργα μας" },
    getInTouch: { en: "Get in touch", el: "Επικοινωνία" },
    rights: { en: "All rights reserved.", el: "Με επιφύλαξη παντός δικαιώματος." },
    privacyPolicy: { en: "Privacy Policy", el: "Πολιτική Απορρήτου" },
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
        title: { en: "1. Information We Collect", el: "1. Πληροφορίες που Συλλέγουμε" },
        content: {
          en: `We may collect the following types of information when you visit our website or use our services:\n\n• **Personal Information**: Name, email address, phone number, and other contact details you voluntarily provide through forms or email.\n• **Usage Data**: Browser type, IP address, pages visited, time spent on the site, and referring URLs.\n• **Cookies & Tracking**: Small data files stored on your device to improve functionality and analyze traffic patterns.`,
          el: `Ενδέχεται να συλλέξουμε τους ακόλουθους τύπους πληροφοριών όταν επισκέπτεστε τον ιστότοπό μας ή χρησιμοποιείτε τις υπηρεσίες μας:\n\n• **Προσωπικές Πληροφορίες**: Όνομα, διεύθυνση email, αριθμός τηλεφώνου και άλλα στοιχεία επικοινωνίας που παρέχετε εθελοντικά μέσω φορμών ή email.\n• **Δεδομένα Χρήσης**: Τύπος προγράμματος περιήγησης, διεύθυνση IP, σελίδες που επισκεφτήκατε, χρόνος παραμονής στον ιστότοπο και URLs παραπομπής.\n• **Cookies & Παρακολούθηση**: Μικρά αρχεία δεδομένων που αποθηκεύονται στη συσκευή σας για τη βελτίωση της λειτουργικότητας και την ανάλυση προτύπων κίνησης.`,
        },
      },
      {
        title: { en: "2. How We Use Your Information", el: "2. Πώς Χρησιμοποιούμε τις Πληροφορίες σας" },
        content: {
          en: `We use the collected information for the following purposes:\n\n• To provide, maintain, and improve our services\n• To respond to inquiries and communicate with you\n• To analyze website usage and optimize user experience\n• To comply with legal obligations\n• To send occasional updates about our services (with your consent)`,
          el: `Χρησιμοποιούμε τις συλλεγόμενες πληροφορίες για τους ακόλουθους σκοπούς:\n\n• Για την παροχή, τη συντήρηση και τη βελτίωση των υπηρεσιών μας\n• Για την απάντηση σε ερωτήματα και την επικοινωνία μαζί σας\n• Για την ανάλυση της χρήσης του ιστότοπου και τη βελτιστοποίηση της εμπειρίας χρήστη\n• Για τη συμμόρφωση με νομικές υποχρεώσεις\n• Για την αποστολή περιστασιακών ενημερώσεων σχετικά με τις υπηρεσίες μας (με τη συγκατάθεσή σας)`,
        },
      },
      {
        title: { en: "3. Cookies", el: "3. Cookies" },
        content: {
          en: `Our website uses cookies to:\n\n• Remember your preferences and settings\n• Understand how you interact with our site\n• Improve website performance and functionality\n\nYou can control cookie settings through your browser. Disabling cookies may affect some website features.`,
          el: `Ο ιστότοπός μας χρησιμοποιεί cookies για:\n\n• Να θυμάται τις προτιμήσεις και τις ρυθμίσεις σας\n• Να κατανοεί πώς αλληλεπιδράτε με τον ιστότοπό μας\n• Να βελτιώνει την απόδοση και τη λειτουργικότητα του ιστότοπου\n\nΜπορείτε να ελέγξετε τις ρυθμίσεις cookies μέσω του προγράμματος περιήγησής σας. Η απενεργοποίηση των cookies μπορεί να επηρεάσει ορισμένες λειτουργίες του ιστότοπου.`,
        },
      },
      {
        title: { en: "4. Data Sharing", el: "4. Κοινοποίηση Δεδομένων" },
        content: {
          en: `We do not sell, trade, or rent your personal information to third parties. We may share data with:\n\n• **Service providers** who assist in operating our website and services\n• **Legal authorities** when required by law or to protect our rights\n• **Analytics partners** (e.g., Google Analytics) in anonymized form`,
          el: `Δεν πουλάμε, ανταλλάσσουμε ή ενοικιάζουμε τις προσωπικές σας πληροφορίες σε τρίτους. Ενδέχεται να μοιραστούμε δεδομένα με:\n\n• **Παρόχους υπηρεσιών** που βοηθούν στη λειτουργία του ιστότοπου και των υπηρεσιών μας\n• **Νομικές αρχές** όταν απαιτείται από τον νόμο ή για την προστασία των δικαιωμάτων μας\n• **Συνεργάτες ανάλυσης** (π.χ. Google Analytics) σε ανωνυμοποιημένη μορφή`,
        },
      },
      {
        title: { en: "5. Data Security", el: "5. Ασφάλεια Δεδομένων" },
        content: {
          en: `We implement industry-standard security measures to protect your personal information. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.`,
          el: `Εφαρμόζουμε μέτρα ασφαλείας βιομηχανικού επιπέδου για την προστασία των προσωπικών σας πληροφοριών. Ωστόσο, καμία μέθοδος ηλεκτρονικής μετάδοσης ή αποθήκευσης δεν είναι 100% ασφαλής και δεν μπορούμε να εγγυηθούμε απόλυτη ασφάλεια.`,
        },
      },
      {
        title: { en: "6. Your Rights", el: "6. Τα Δικαιώματά σας" },
        content: {
          en: `Under applicable data protection laws (including GDPR), you have the right to:\n\n• Access, correct, or delete your personal data\n• Withdraw consent at any time\n• Object to or restrict data processing\n• Request data portability\n\nTo exercise these rights, contact us at contact@devcraft.gr.`,
          el: `Σύμφωνα με τους ισχύοντες νόμους προστασίας δεδομένων (συμπεριλαμβανομένου του GDPR), έχετε το δικαίωμα να:\n\n• Αποκτήσετε πρόσβαση, να διορθώσετε ή να διαγράψετε τα προσωπικά σας δεδομένα\n• Αποσύρετε τη συγκατάθεσή σας ανά πάσα στιγμή\n• Αντιταχθείτε ή να περιορίσετε την επεξεργασία δεδομένων\n• Ζητήσετε τη φορητότητα των δεδομένων\n\nΓια να ασκήσετε αυτά τα δικαιώματα, επικοινωνήστε μαζί μας στο contact@devcraft.gr.`,
        },
      },
      {
        title: { en: "7. Third-Party Links", el: "7. Σύνδεσμοι Τρίτων" },
        content: {
          en: `Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these external websites.`,
          el: `Ο ιστότοπός μας ενδέχεται να περιέχει συνδέσμους προς ιστότοπους τρίτων. Δεν φέρουμε ευθύνη για τις πρακτικές απορρήτου ή το περιεχόμενο αυτών των εξωτερικών ιστότοπων.`,
        },
      },
      {
        title: { en: "8. Changes to This Policy", el: "8. Αλλαγές σε αυτήν την Πολιτική" },
        content: {
          en: `We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.`,
          el: `Διατηρούμε το δικαίωμα να ενημερώσουμε αυτήν την Πολιτική Απορρήτου ανά πάσα στιγμή. Οι αλλαγές θα δημοσιεύονται σε αυτή τη σελίδα με ενημερωμένη ημερομηνία ισχύος.`,
        },
      },
      {
        title: { en: "9. Contact Us", el: "9. Επικοινωνήστε μαζί μας" },
        content: {
          en: `If you have questions about this Privacy Policy, please contact us:`,
          el: `Αν έχετε ερωτήσεις σχετικά με αυτήν την Πολιτική Απορρήτου, επικοινωνήστε μαζί μας:`,
        },
        contactInfo: true,
      },
    ],
  },

  // Cookie consent
  cookie: {
    message: {
      en: "We use cookies to improve your experience. By continuing, you agree to our",
      el: "Χρησιμοποιούμε cookies για τη βελτίωση της εμπειρίας σας. Συνεχίζοντας, συμφωνείτε με την",
    },
    privacyPolicy: { en: "Privacy Policy", el: "Πολιτική Απορρήτου" },
    accept: { en: "Got it", el: "Αποδοχή" },
  },

  // Portfolio
  portfolio: {
    label: { en: "Our projects", el: "Τα έργα μας" },
    heading1: { en: "Live", el: "Ζωντανά" },
    heading2: { en: "projects.", el: "έργα." },
    subtitle: {
      en: "A selection of websites we've built for our clients. Real projects, real results.",
      el: "Μια επιλογή ιστοσελίδων που δημιουργήσαμε για τους πελάτες μας. Πραγματικά έργα, πραγματικά αποτελέσματα.",
    },
    projects: [
      {
        title: { en: "Cleanup SKG", el: "Cleanup SKG" },
        category: { en: "Cleaning Services", el: "Υπηρεσίες Καθαρισμού" },
        description: {
          en: "Professional cleaning services website with booking system and service showcase.",
          el: "Ιστοσελίδα επαγγελματικών υπηρεσιών καθαρισμού με σύστημα κρατήσεων και παρουσίαση υπηρεσιών.",
        },
      },
      {
        title: { en: "Luxe Ellada", el: "Luxe Ellada" },
        category: { en: "Luxury Lifestyle", el: "Πολυτελής Τρόπος Ζωής" },
        description: {
          en: "Premium lifestyle platform showcasing luxury experiences across Greece.",
          el: "Premium πλατφόρμα lifestyle που παρουσιάζει πολυτελείς εμπειρίες σε όλη την Ελλάδα.",
        },
      },
      {
        title: { en: "Dental Care", el: "Dental Care" },
        category: { en: "Healthcare", el: "Υγεία" },
        description: {
          en: "Modern dental clinic website with gallery and appointment management.",
          el: "Σύγχρονη ιστοσελίδα οδοντιατρικής κλινικής με γκαλερί και διαχείριση ραντεβού.",
        },
      },
      {
        title: { en: "Premium Real Estate", el: "Premium Real Estate" },
        category: { en: "Real Estate", el: "Ακίνητα" },
        description: {
          en: "High-end real estate platform with property listings and virtual tours.",
          el: "Πλατφόρμα ακινήτων υψηλών προδιαγραφών με καταχωρήσεις και εικονικές περιηγήσεις.",
        },
      },
    ],
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
