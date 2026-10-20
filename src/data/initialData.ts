import { Course, ServiceItem, CompanyConfig, DemoStudent, Enrollment, Certificate } from '../types';

export const INITIAL_COMPANY_CONFIG: CompanyConfig = {
  companyName: 'GWPR Private Limited',
  legalName: 'GWPR Private Limited (CIN: U72900KA2024PTC189234)',
  tagline: 'Empowering Technical Minds & Accelerating Digital Transformation',
  signatoryName: 'Dr. Rajesh Vardhan',
  signatoryTitle: 'Head of Academics & Technical Certifications',
  contactEmail: 'admissions@gwpr.in',
  contactPhone: '+91 80 4920 1800',
  whatsappNumber: '918049201800',
  address: 'Tech Innovation Hub, 4th Floor, Global Technology Park, Outer Ring Road, Bengaluru, Karnataka 560103, India',
  baseUrl: typeof window !== 'undefined' ? window.location.origin : 'https://gwpr.vercel.app',
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Website Development',
    tagline: 'Modern, high-performance web applications',
    description: 'Bespoke corporate websites and single-page applications built with React, Next.js, and TypeScript, engineered for lightning-fast loading speeds and flawless responsive design.',
    features: ['Custom Frontend Architecture', 'API & CMS Integration', 'High Core Web Vitals', 'Mobile-First Layouts'],
    iconName: 'Globe',
    category: 'Development',
  },
  {
    id: 'ecommerce-development',
    title: 'E-commerce Website Development',
    tagline: 'Scalable commerce platforms designed to convert',
    description: 'Turnkey online stores with secure payment gateway integrations, seamless product catalogues, cart optimization, and inventory synchronisation.',
    features: ['Multi-currency Gateways', 'Inventory Management', 'Checkout Flow Optimization', 'High Security Compliance'],
    iconName: 'ShoppingCart',
    category: 'Development',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Human-centred intuitive digital interfaces',
    description: 'Transforming complex digital workflows into clean, accessible, and delightful design systems, prototypes, and user experiences using Figma and user research.',
    features: ['Design Systems & Wireframes', 'Interactive Prototypes', 'Accessibility (WCAG 2.1)', 'User Journey Mapping'],
    iconName: 'Palette',
    category: 'Design',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Data-driven growth and audience acquisition',
    description: 'Comprehensive digital strategies combining paid acquisition, organic brand authority, content marketing, and multi-channel campaign funnels.',
    features: ['Full-Funnel Strategies', 'Targeted Audience Segmentation', 'Conversion Rate Optimization', 'ROI Performance Analytics'],
    iconName: 'TrendingUp',
    category: 'Marketing',
  },
  {
    id: 'seo-services',
    title: 'Search Engine Optimization (SEO)',
    tagline: 'Dominate organic search results sustainably',
    description: 'Technical audits, on-page optimization, content strategy, and high-quality backlink generation to boost organic keyword rankings and inbound queries.',
    features: ['Technical SEO Audits', 'Keyword Intent Analysis', 'Structured Data & Schema', 'Core Web Vitals Tuning'],
    iconName: 'Search',
    category: 'Marketing',
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    tagline: 'Build loyal brand communities across platforms',
    description: 'Creative brand storytelling, community management, and audience growth across LinkedIn, Instagram, Twitter, and YouTube.',
    features: ['Content Calendars & Creatives', 'Community Engagement', 'Influencer Collaboration', 'Performance Reporting'],
    iconName: 'Share2',
    category: 'Marketing',
  },
  {
    id: 'meta-ads-management',
    title: 'Meta Ads Campaign Management',
    tagline: 'Precision targeting on Facebook & Instagram',
    description: 'Advanced Meta advertising strategies utilizing pixel conversion tracking, custom audiences, lookalikes, and dynamic creative testing for maximum ROAS.',
    features: ['CBO & ABO Campaign Structures', 'Custom & Lookalike Audiences', 'A/B Creative Split Testing', 'Retargeting Funnels'],
    iconName: 'Target',
    category: 'Marketing',
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    tagline: 'High-intent B2B and B2C qualified prospect funnels',
    description: 'Engineered lead capture funnels, high-converting landing pages, CRM automated triggers, and email drip nurturing sequences.',
    features: ['Automated Lead Captures', 'CRM & Webhook Integration', 'Email Drip Sequences', 'Lead Scoring Mechanisms'],
    iconName: 'Users',
    category: 'Marketing',
  },
  {
    id: 'maintenance-support',
    title: 'Website Maintenance and Support',
    tagline: '24/7 reliability, security hardening & updates',
    description: 'Continuous uptime monitoring, security patching, dependency upgrades, SSL maintenance, and routine performance backups.',
    features: ['24/7 Uptime Monitoring', 'Security Patches & SSL', 'Speed & Database Optimization', 'Disaster Recovery Backups'],
    iconName: 'ShieldCheck',
    category: 'Maintenance',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'machine-learning',
    title: 'Machine Learning (ML)',
    shortDescription: 'Master predictive modeling, supervised and unsupervised learning algorithms with Scikit-Learn.',
    description: 'A comprehensive, hands-on program exploring statistical learning, regression, classification, clustering, dimension reduction, and pipeline deployment for real-world business intelligence.',
    category: 'Data & AI',
    level: 'Intermediate',
    duration: '10 Weeks (Self-paced + Guided)',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-indigo-600',
    featured: true,
    skills: ['Scikit-Learn', 'Pandas & NumPy', 'Regression & Classification', 'Ensemble Models', 'Model Evaluation', 'Feature Engineering'],
    learningOutcomes: [
      'Design, train, and validate supervised machine learning models with industry datasets.',
      'Implement clustering and dimensionality reduction for customer segmentation.',
      'Deploy trained ML models using FastAPI and Docker containers.',
      'Evaluate model drift, precision-recall trade-offs, and fairness metrics.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'ml-m1',
        title: 'Module 1: Foundations of Statistical Learning',
        description: 'Mathematical intuition, feature matrices, loss functions, and data preprocessing.',
        lessons: [
          { id: 'ml-l1', title: 'Data Cleaning, Imputation & Feature Scaling', duration: '45 mins', description: 'Handling null values, standardisation, and outlier detection.', content: 'In this lesson, you will work through real-world data pipelines to clean, normalize, and encode numerical and categorical features for optimal training convergence.' },
          { id: 'ml-l2', title: 'Linear Regression & Cost Minimization', duration: '50 mins', description: 'Ordinary least squares, gradient descent, and bias-variance tradeoff.', content: 'Understand gradient descent mathematics, regularization (L1 Lasso and L2 Ridge), and metrics like MSE, RMSE, and R-squared.' },
        ]
      },
      {
        id: 'ml-m2',
        title: 'Module 2: Classification & Ensemble Learning',
        description: 'Decision boundaries, logistic regression, random forests, and gradient boosting.',
        lessons: [
          { id: 'ml-l3', title: 'Logistic Regression & ROC-AUC Metrics', duration: '55 mins', description: 'Binary and multi-class classification evaluation.', content: 'Explore log-odds, sigmoid transformation, confusion matrices, precision, recall, and ROC-AUC curve analysis.' },
          { id: 'ml-l4', title: 'Random Forests & XGBoost Architectures', duration: '60 mins', description: 'Bagging, boosting, hyperparameter tuning via GridSearch.', content: 'Learn how ensemble trees reduce variance and capture non-linear patterns, followed by hyperparameter optimization.' },
        ]
      },
      {
        id: 'ml-m3',
        title: 'Module 3: Unsupervised Learning & Deployment',
        description: 'K-Means, PCA, and model serialization into microservices.',
        lessons: [
          { id: 'ml-l5', title: 'K-Means Clustering & Dimensionality Reduction (PCA)', duration: '50 mins', description: 'Customer segmentation and eigen-decomposition.', content: 'Implement the elbow method, silhouette scores, and principal component analysis for data visualization and feature reduction.' },
          { id: 'ml-l6', title: 'Capstone Project & Model Deployment', duration: '75 mins', description: 'Packaging models with Joblib and deploying an inference endpoint.', content: 'Build a production-grade inference service using Python, write unit tests for feature validation, and verify predictions.' },
        ]
      }
    ]
  },
  {
    id: 'sql',
    title: 'SQL (Structured Query Language)',
    shortDescription: 'Master relational database querying, schema design, analytical window functions, and indexing.',
    description: 'Learn enterprise database querying from basic SELECT statements to complex multi-table joins, subqueries, CTEs, window functions, and query plan optimization using PostgreSQL and MySQL.',
    category: 'Data & AI',
    level: 'Beginner',
    duration: '6 Weeks (Self-paced)',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-emerald-600',
    featured: true,
    skills: ['PostgreSQL', 'Complex Joins', 'Window Functions', 'CTEs & Subqueries', 'Database Indexing', 'Stored Procedures'],
    learningOutcomes: [
      'Write optimized SQL queries across multi-million row relational tables.',
      'Leverage analytical window functions for running totals, rankings, and cohort analysis.',
      'Design normalized 3NF database schemas with proper constraints and foreign keys.',
      'Diagnose query bottlenecks using EXPLAIN ANALYZE and implement B-Tree indexes.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'sql-m1',
        title: 'Module 1: Relational Foundations & Data Retrieval',
        description: 'SELECT, WHERE, aggregate filters, and multi-table joins.',
        lessons: [
          { id: 'sql-l1', title: 'Query Fundamentals & Filtering Logic', duration: '40 mins', description: 'SELECT, WHERE, ORDER BY, GROUP BY and HAVING clauses.', content: 'Master declarative SQL querying, filtering using logical operators, and aggregating transaction records.' },
          { id: 'sql-l2', title: 'Multi-Table Joins & Set Operations', duration: '50 mins', description: 'INNER, LEFT, RIGHT, FULL OUTER joins and UNION sets.', content: 'Connect relational tables with join semantics, prevent unintentional Cartesian products, and handle NULL values accurately.' },
        ]
      },
      {
        id: 'sql-m2',
        title: 'Module 2: Advanced Analytical SQL & Optimization',
        description: 'Window functions, Common Table Expressions, and performance tuning.',
        lessons: [
          { id: 'sql-l3', title: 'Window Functions: ROW_NUMBER, RANK & LAG/LEAD', duration: '60 mins', description: 'Over-partition operations for cohort and trend analysis.', content: 'Analyze time-series business data, compute moving averages, and calculate month-over-month retention metrics.' },
          { id: 'sql-l4', title: 'Query Optimization & Indexing Strategies', duration: '55 mins', description: 'EXPLAIN plans, composite indexes, and transaction isolation.', content: 'Inspect database execution plans, avoid sequential scans on massive datasets, and handle ACID transactions.' },
        ]
      }
    ]
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    shortDescription: 'Core to advanced Python: OOP, asynchronous execution, decorators, file I/O, and data structures.',
    description: 'Develop industrial-strength Python software. Understand Pythonic idioms, memory management, object-oriented design patterns, functional paradigms, and package distribution.',
    category: 'Software Engineering',
    level: 'Beginner',
    duration: '8 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-yellow-600',
    featured: false,
    skills: ['Python 3.12+', 'OOP & Design Patterns', 'Decorators & Generators', 'Asyncio', 'Unit Testing (PyTest)', 'Virtual Environments'],
    learningOutcomes: [
      'Write modular, clean, and PEP-8 compliant Python code for diverse applications.',
      'Implement robust object-oriented software architectures using classes and protocols.',
      'Handle asynchronous I/O and concurrent tasks using Python asyncio.',
      'Create and publish distributable Python packages with comprehensive PyTest test suites.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'py-m1',
        title: 'Module 1: Language Syntax & Advanced Data Structures',
        description: 'Collections, list comprehensions, generators, and exception handling.',
        lessons: [
          { id: 'py-l1', title: 'Data Structures: Dicts, Sets, Tuples & Comprehensions', duration: '45 mins', description: 'Memory representation and algorithmic complexity of Python collections.', content: 'Deep dive into hash tables, memory hashing, and performant list/dict comprehension patterns.' },
          { id: 'py-l2', title: 'Functions, Scopes, Closures & Decorators', duration: '55 mins', description: 'Higher-order functions and metaprogramming decorators.', content: 'Build practical decorators for logging, caching with memoization, and input validation.' },
        ]
      },
      {
        id: 'py-m2',
        title: 'Module 2: Object-Oriented Design & Modern Asynchronous Python',
        description: 'Inheritance, dunder methods, dataclasses, and async execution.',
        lessons: [
          { id: 'py-l3', title: 'Object-Oriented Programming & Custom Dunder Methods', duration: '50 mins', description: 'Encapsulation, polymorphism, abstract base classes.', content: 'Create domain models utilizing dataclasses, custom string representations, and operator overloading.' },
          { id: 'py-l4', title: 'Concurrency, Asyncio & File Processing', duration: '60 mins', description: 'Coroutines, event loops, and non-blocking I/O operations.', content: 'Execute network requests concurrently using aiohttp and asyncio gathering primitives.' },
        ]
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence and Machine Learning (AI/ML)',
    shortDescription: 'Deep learning, neural networks, computer vision, NLP, and transformer architectures.',
    description: 'An advanced curriculum covering artificial neural networks, convolutional networks (CNNs), recurrent models, transformers, LLM prompt engineering, and model fine-tuning using PyTorch.',
    category: 'Data & AI',
    level: 'Advanced',
    duration: '12 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-purple-600',
    featured: true,
    skills: ['PyTorch', 'Deep Neural Networks', 'Computer Vision (CNN)', 'Transformers & Attention', 'Hugging Face', 'Prompt Engineering & Fine-tuning'],
    learningOutcomes: [
      'Construct and train multi-layer perceptrons and CNNs from scratch in PyTorch.',
      'Understand attention mechanisms, positional encodings, and transformer architectures.',
      'Fine-tune pre-trained open-weight models for domain-specific NLP applications.',
      'Implement retrieval-augmented generation (RAG) pipelines with vector databases.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'aiml-m1',
        title: 'Module 1: Deep Learning Foundations & Neural Networks',
        description: 'Backpropagation, activation functions, optimizers, and loss landscapes.',
        lessons: [
          { id: 'aiml-l1', title: 'Neural Networks & Tensor Operations in PyTorch', duration: '50 mins', description: 'Forward pass, autograd, and backward propagation.', content: 'Build a multi-layer neural network using torch.nn, implementing SGD, Adam, and dropout regularisation.' },
          { id: 'aiml-l2', title: 'Convolutional Neural Networks (CNN) for Image Recognition', duration: '60 mins', description: 'Kernel convolutions, pooling, and transfer learning with ResNet.', content: 'Fine-tune pre-trained vision models for medical and industrial image classification.' },
        ]
      },
      {
        id: 'aiml-m2',
        title: 'Module 2: Natural Language Processing & Modern Transformers',
        description: 'Tokenization, embeddings, self-attention, and RAG architectures.',
        lessons: [
          { id: 'aiml-l3', title: 'Self-Attention Mechanisms & The Transformer Architecture', duration: '65 mins', description: 'Q, K, V matrices and multi-head attention.', content: 'Explore how transformers process context in parallel, powering modern large language models.' },
          { id: 'aiml-l4', title: 'Retrieval Augmented Generation (RAG) & Vector Stores', duration: '70 mins', description: 'Semantic search with embeddings, chunking, and ChromaDB.', content: 'Construct a production-ready enterprise QA assistant powered by vector retrieval and LLM synthesis.' },
        ]
      }
    ]
  },
  {
    id: 'java-programming',
    title: 'Java Programming',
    shortDescription: 'Core Java, OOP principles, JVM memory architecture, Collections framework, and Multithreading.',
    description: 'Develop enterprise-grade backend foundations with Java 21 LTS. Learn strict typing, interfaces, JVM garbage collection, concurrency primitives, and modern streams.',
    category: 'Software Engineering',
    level: 'Beginner',
    duration: '8 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-red-600',
    featured: false,
    skills: ['Java 21 LTS', 'OOP Principles', 'Collections Framework', 'Java Streams & Lambdas', 'Multithreading & Concurrency', 'Maven & JUnit 5'],
    learningOutcomes: [
      'Master object-oriented architecture with clean interfaces, inheritance, and polymorphism.',
      'Utilize Java Collections and modern Stream APIs for functional data processing.',
      'Write thread-safe concurrent code utilizing java.util.concurrent executors.',
      'Write automated unit and integration tests using JUnit 5 and Mockito.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'java-m1',
        title: 'Module 1: Java Syntax, Memory & OOP Concepts',
        description: 'Stack vs Heap memory, garbage collection, and class hierarchies.',
        lessons: [
          { id: 'java-l1', title: 'OOP Principles: Inheritance, Polymorphism & Abstraction', duration: '45 mins', description: 'Constructing robust enterprise class hierarchies.', content: 'Implement interface-driven programming and immutable records in modern Java.' },
          { id: 'java-l2', title: 'Java Collections Framework & Generic Types', duration: '50 mins', description: 'Lists, Sets, Maps, Queues, and type erasure.', content: 'Choose the optimal collection for performance constraints and implement custom comparators.' },
        ]
      },
      {
        id: 'java-m2',
        title: 'Module 2: Streams, Lambdas & Concurrency',
        description: 'Functional programming and thread synchronization in Java.',
        lessons: [
          { id: 'java-l3', title: 'Stream API, Optional & Functional Interfaces', duration: '55 mins', description: 'Declarative pipelines with map, filter, and collectors.', content: 'Process large datasets with parallel streams and eliminate NullPointerExceptions with Optional.' },
          { id: 'java-l4', title: 'Multithreading, Locks & Virtual Threads', duration: '60 mins', description: 'ExecutorService, synchronized blocks, and Project Loom.', content: 'Manage high-throughput concurrent workloads safely without race conditions.' },
        ]
      }
    ]
  },
  {
    id: 'blockchain-technology',
    title: 'Blockchain Technology',
    shortDescription: 'Decentralized architectures, smart contracts, Ethereum, Solidity, and Web3 integration.',
    description: 'Explore distributed ledger mechanics, cryptographic hashing, consensus algorithms (PoW/PoS), smart contract development using Solidity, and Web3 wallet interactions.',
    category: 'Emerging Tech',
    level: 'Advanced',
    duration: '10 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-amber-600',
    featured: false,
    skills: ['Solidity', 'Ethereum & EVM', 'Smart Contract Auditing', 'Hardhat & Foundry', 'Web3.js / Ethers.js', 'DeFi Protocols'],
    learningOutcomes: [
      'Understand cryptographic foundations including Merkle trees, ECDSA, and consensus protocols.',
      'Author secure Solidity smart contracts following OpenZeppelin security standards.',
      'Simulate and deploy decentralized applications (DApps) using Hardhat.',
      'Connect frontend web applications to EVM blockchains using Ethers.js and MetaMask.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'bc-m1',
        title: 'Module 1: Cryptography & Distributed Ledgers',
        description: 'Hash pointers, Byzantine fault tolerance, and EVM execution.',
        lessons: [
          { id: 'bc-l1', title: 'Distributed Consensus & Cryptographic Primitives', duration: '50 mins', description: 'SHA-256, asymmetric key pairs, and peer-to-peer state machines.', content: 'Understand how decentralized ledgers maintain global consensus without central authority.' },
          { id: 'bc-l2', title: 'Solidity Syntax & Smart Contract Lifecycle', duration: '60 mins', description: 'State variables, visibility modifiers, and gas optimization.', content: 'Write and test your first ERC-20 token contract with transfer and allowance events.' },
        ]
      },
      {
        id: 'bc-m2',
        title: 'Module 2: DApp Development & Security Audits',
        description: 'Connecting frontend to blockchain and guarding against reentrancy attacks.',
        lessons: [
          { id: 'bc-l3', title: 'Web3 Frontend Integration with Ethers.js', duration: '55 mins', description: 'Connecting user wallets, signing transactions, and listening to events.', content: 'Build a decentralized dashboard showing real-time token balances and contract states.' },
          { id: 'bc-l4', title: 'Smart Contract Security & Vulnerability Auditing', duration: '65 mins', description: 'Reentrancy, overflow, front-running, and formal verification.', content: 'Learn defensive contract patterns and audit vulnerabilities in simulated DeFi contracts.' },
        ]
      }
    ]
  },
  {
    id: 'fullstack-web-development',
    title: 'Full Stack Web Development',
    shortDescription: 'Modern frontend with React & TypeScript, backend with Node.js & Express, and PostgreSQL/MongoDB.',
    description: 'Build full-fledged, production-ready web applications from scratch. Covers responsive CSS, React hooks, REST and GraphQL APIs, JWT authentication, and cloud deployment.',
    category: 'Software Engineering',
    level: 'Intermediate',
    duration: '12 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-blue-600',
    featured: true,
    skills: ['React 18+', 'TypeScript', 'Node.js & Express', 'PostgreSQL / Prisma', 'JWT Authentication', 'REST APIs & Tailwind CSS'],
    learningOutcomes: [
      'Architect robust single-page applications with clean component state and TypeScript types.',
      'Design RESTful web APIs with express routing, middleware, and request validation.',
      'Implement secure authentication flows with password hashing and JWT tokens.',
      'Deploy full-stack applications with automated CI/CD pipelines to cloud hosting platforms.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'fs-m1',
        title: 'Module 1: Modern Frontend with React & TypeScript',
        description: 'Component architecture, custom hooks, and Tailwind CSS.',
        lessons: [
          { id: 'fs-l1', title: 'Component Design Patterns & TypeScript Generics', duration: '50 mins', description: 'Type-safe props, state machines, and memoization.', content: 'Build reusable UI components with strict TypeScript interfaces and accessible markup.' },
          { id: 'fs-l2', title: 'State Management & Asynchronous Data Fetching', duration: '55 mins', description: 'Context API, React Query, and error boundary handling.', content: 'Handle loading skeletons, network caching, and optimistic UI updates seamlessly.' },
        ]
      },
      {
        id: 'fs-m2',
        title: 'Module 2: Scalable Node.js Backend & Database ORMs',
        description: 'Express micro-servers, relational schema modelling, and security.',
        lessons: [
          { id: 'fs-l3', title: 'RESTful API Engineering & Middleware Architecture', duration: '60 mins', description: 'Rate limiting, CORS, input sanitization, and structured responses.', content: 'Develop structured Express controllers with centralized error handling.' },
          { id: 'fs-l4', title: 'Database Integration with Prisma ORM & Auth Flows', duration: '65 mins', description: 'Migrations, relational queries, bcrypt, and JWT auth.', content: 'Complete full-stack CRUD capabilities with relational tables and authentication guards.' },
        ]
      }
    ]
  },
  {
    id: 'digital-marketing-course',
    title: 'Digital Marketing',
    shortDescription: 'Performance marketing, search engine optimization, content strategy, email automation, and analytics.',
    description: 'Learn modern marketing strategies that generate tangible business revenue. Understand Google Analytics 4, keyword research, conversion rate optimization, and multi-channel attribution.',
    category: 'Digital Marketing',
    level: 'Beginner',
    duration: '8 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-teal-600',
    featured: false,
    skills: ['Google Analytics 4 (GA4)', 'Technical SEO', 'Content Marketing', 'Meta Ads Manager', 'Email Automation', 'Conversion Optimization'],
    learningOutcomes: [
      'Devise comprehensive digital marketing plans tailored to specific business goals.',
      'Audit and optimize website search rankings with actionable keyword strategies.',
      'Set up and monitor tracking events in Google Analytics 4 (GA4).',
      'Execute high-ROI email campaigns and automated lead nurturing funnels.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'dm-m1',
        title: 'Module 1: Search Engine Optimization & Inbound Strategy',
        description: 'Keyword research, on-page optimization, and technical site health.',
        lessons: [
          { id: 'dm-l1', title: 'Keyword Intent Analysis & Content Architecture', duration: '45 mins', description: 'Identifying commercial vs informational search queries.', content: 'Use SEO tools to map out topic clusters and construct high-ranking pillar content.' },
          { id: 'dm-l2', title: 'Technical SEO Audits & Core Web Vitals', duration: '50 mins', description: 'Crawl budgets, canonical tags, and schema microdata.', content: 'Diagnose indexing issues and improve Google ranking factors.' },
        ]
      },
      {
        id: 'dm-m2',
        title: 'Module 2: Paid Channels & Performance Analytics',
        description: 'PPC advertising, GA4 measurement, and conversion optimization.',
        lessons: [
          { id: 'dm-l3', title: 'Paid Ad Campaigns: Google Ads & Meta Ads', duration: '55 mins', description: 'Search keywords, display network, and bidding strategies.', content: 'Configure ad auctions, quality scores, and creative testing frameworks.' },
          { id: 'dm-l4', title: 'Google Analytics 4 (GA4) & Conversion Funnels', duration: '60 mins', description: 'Event tracking, attribution models, and reporting dashboards.', content: 'Track customer journey drop-offs and optimize revenue funnel conversions.' },
        ]
      }
    ]
  },
  {
    id: 'power-bi',
    title: 'Power BI',
    shortDescription: 'Business intelligence, DAX calculations, interactive dashboards, Power Query, and data modeling.',
    description: 'Transform raw, disparate business spreadsheets and SQL databases into interactive executive dashboards. Learn Power Query ETL, star schema modelling, and advanced DAX expressions.',
    category: 'Data & AI',
    level: 'Beginner',
    duration: '6 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-amber-500',
    featured: false,
    skills: ['Power BI Desktop', 'DAX Formulas', 'Power Query (M)', 'Star Schema Data Modeling', 'KPI Dashboards', 'Report Publishing'],
    learningOutcomes: [
      'Extract, transform, and clean complex tabular data using Power Query.',
      'Construct robust relational data models using star schema principles.',
      'Write calculated columns and measures using DAX (Data Analysis Expressions).',
      'Design interactive business reports with drill-down and cross-filtering features.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'bi-m1',
        title: 'Module 1: Data Extraction & Star Schema Modeling',
        description: 'Connecting data sources and establishing relational cardinalities.',
        lessons: [
          { id: 'bi-l1', title: 'Power Query ETL & Data Normalization', duration: '45 mins', description: 'Unpivoting columns, data type conversions, and conditional logic.', content: 'Automate data cleaning workflows from raw CSV and SQL extracts.' },
          { id: 'bi-l2', title: 'Dimensional Modeling: Facts, Dimensions & Relationships', duration: '50 mins', description: 'Building star schemas and handling many-to-many relationships.', content: 'Structure relational data models for optimal analytical calculation performance.' },
        ]
      },
      {
        id: 'bi-m2',
        title: 'Module 2: DAX Formulations & Interactive Visualizations',
        description: 'CALCULATE functions, time intelligence, and executive layout design.',
        lessons: [
          { id: 'bi-l3', title: 'Essential DAX: CALCULATE, FILTER & Time Intelligence', duration: '60 mins', description: 'Year-to-date, moving averages, and cumulative measures.', content: 'Write powerful DAX expressions to compute business KPIs dynamically.' },
          { id: 'bi-l4', title: 'Executive Dashboard Design & Report Publishing', duration: '55 mins', description: 'Visual hierarchy, custom bookmarks, drill-throughs, and mobile layouts.', content: 'Deliver actionable, polished interactive reports that drive executive decision-making.' },
        ]
      }
    ]
  },
  {
    id: 'java-full-stack',
    title: 'Java Full Stack Development',
    shortDescription: 'Enterprise Java with Spring Boot, Microservices, Hibernate, RESTful APIs, and Angular/React.',
    description: 'The complete enterprise development path. Master Spring Boot, Spring Security, JPA/Hibernate, Kafka event streaming, containerization, and modern frontend integration.',
    category: 'Software Engineering',
    level: 'Advanced',
    duration: '14 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-cyan-700',
    featured: true,
    skills: ['Spring Boot 3', 'Spring Security & OAuth2', 'Hibernate / JPA', 'Microservices Architecture', 'Docker & Kubernetes', 'React Frontend'],
    learningOutcomes: [
      'Build scalable microservices with Spring Boot and Spring Cloud.',
      'Implement enterprise authentication using Spring Security and OAuth2.',
      'Optimize relational persistence using Hibernate, JPA, and connection pooling.',
      'Integrate frontend React components with secure backend endpoints.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'jfs-m1',
        title: 'Module 1: Spring Boot Core & Enterprise Persistence',
        description: 'Dependency injection, REST controllers, and Hibernate ORM.',
        lessons: [
          { id: 'jfs-l1', title: 'Spring Boot Architecture & Dependency Injection', duration: '55 mins', description: 'Inversion of Control, Beans, and application profiles.', content: 'Create structured REST API services with automated validation and response entities.' },
          { id: 'jfs-l2', title: 'Spring Data JPA, Hibernate & Transaction Management', duration: '60 mins', description: 'Entity lifecycle, lazy vs eager loading, and custom JPQL queries.', content: 'Manage enterprise transactional databases safely with rollback semantics.' },
        ]
      },
      {
        id: 'jfs-m2',
        title: 'Module 2: Microservices, Security & Frontend Handshake',
        description: 'API Gateways, JWT security, and React dashboard consumption.',
        lessons: [
          { id: 'jfs-l3', title: 'Spring Security 6 with JWT & Role-Based Access Control', duration: '65 mins', description: 'Filter chains, token verification, and method-level security.', content: 'Protect corporate endpoints with role-based authorization tokens.' },
          { id: 'jfs-l4', title: 'Microservices Communication & Full-Stack Deployment', duration: '75 mins', description: 'Feign clients, Docker compose, and cloud deployment.', content: 'Assemble frontend React UI and backend Spring Boot microservices into unified containers.' },
        ]
      }
    ]
  },
  {
    id: 'aws-cloud',
    title: 'Amazon Web Services (AWS)',
    shortDescription: 'Cloud architecture, EC2, S3, RDS, Lambda serverless, VPC networking, and IAM security.',
    description: 'Learn to design resilient, highly available, and cost-optimized cloud solutions on Amazon Web Services following the AWS Well-Architected Framework.',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    duration: '10 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    badgeColor: 'bg-orange-600',
    featured: true,
    skills: ['AWS EC2 & Auto-Scaling', 'S3 & CloudFront', 'VPC & Subnets', 'AWS Lambda & API Gateway', 'RDS & DynamoDB', 'IAM Security Policies'],
    learningOutcomes: [
      'Design secure virtual private clouds (VPCs) with public and private subnets.',
      'Deploy scalable web applications with EC2, Application Load Balancers, and Auto Scaling.',
      'Build event-driven serverless backends using AWS Lambda and API Gateway.',
      'Configure enterprise access control and encryption policies with AWS IAM and KMS.'
    ],
    certificateEligible: true,
    syllabus: [
      {
        id: 'aws-m1',
        title: 'Module 1: AWS Core Compute, Storage & Networking',
        description: 'EC2 instance types, S3 storage tiers, and VPC network design.',
        lessons: [
          { id: 'aws-l1', title: 'VPC Architecture: Subnets, Route Tables & Gateways', duration: '50 mins', description: 'Configuring private and public subnets and NAT gateways.', content: 'Design a highly available dual-availability-zone network topology.' },
          { id: 'aws-l2', title: 'EC2 Provisioning, Elastic Load Balancing & Auto-Scaling', duration: '60 mins', description: 'Launch templates, health checks, and automatic scaling policies.', content: 'Deploy web servers that dynamically scale based on CPU and traffic demands.' },
        ]
      },
      {
        id: 'aws-m2',
        title: 'Module 2: Serverless, Managed Databases & Security',
        description: 'Lambda, DynamoDB, RDS multi-AZ, and IAM least privilege.',
        lessons: [
          { id: 'aws-l3', title: 'Serverless Backends: AWS Lambda & API Gateway', duration: '55 mins', description: 'Event-driven triggers, cold start optimization, and IAM roles.', content: 'Deploy zero-infrastructure REST endpoints backed by managed databases.' },
          { id: 'aws-l4', title: 'IAM Identity Management & CloudWatch Monitoring', duration: '60 mins', description: 'Policies, roles, CloudWatch alarms, and cost optimization.', content: 'Audit infrastructure security, set threshold alarms, and minimize AWS bills.' },
        ]
      }
    ]
  }
];

// Pre-seeded demo student for zero-friction demonstration
export const INITIAL_DEMO_STUDENTS: DemoStudent[] = [
  {
    id: 'std_demo_01',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    mobile: '+91 98765 12345',
    createdAt: '2026-09-15T10:00:00.000Z',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  }
];

// Pre-seeded enrollment and certificate for testing verification immediately
export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'ENR-2026-9042',
    studentId: 'std_demo_01',
    courseId: 'machine-learning',
    enrollmentDate: '2026-09-18T09:30:00.000Z',
    progress: 100,
    status: 'Completed',
    completedLessons: ['ml-l1', 'ml-l2', 'ml-l3', 'ml-l4', 'ml-l5', 'ml-l6'],
    completionDate: '2026-10-18T14:20:00.000Z',
  },
  {
    id: 'ENR-2026-9043',
    studentId: 'std_demo_01',
    courseId: 'fullstack-web-development',
    enrollmentDate: '2026-10-01T11:00:00.000Z',
    progress: 50,
    status: 'In Progress',
    completedLessons: ['fs-l1', 'fs-l2'],
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'GWPR-CERT-2026-A7K92X',
    studentId: 'std_demo_01',
    studentName: 'Aarav Sharma',
    courseId: 'machine-learning',
    courseTitle: 'Machine Learning (ML)',
    enrollmentId: 'ENR-2026-9042',
    completionDate: 'October 18, 2026',
    issueDate: 'October 18, 2026',
    verificationStatus: 'Valid',
    signatoryName: 'Dr. Rajesh Vardhan',
    signatoryTitle: 'Head of Academics & Technical Certifications',
    companyName: 'GWPR Private Limited',
    verificationUrl: 'https://gwpr.vercel.app/verify/GWPR-CERT-2026-A7K92X',
  }
];
