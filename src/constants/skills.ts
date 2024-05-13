const skills = [
  "frontend developer",
  "react",
  "typescript",
  "javascript",
  "d3",
  "tradingview",
  "html5",
  "css3",
  "sass",
  "data visualization",
  "finance",
  "trading",
  "greenfield development",
  "open source",
  "redux",
  "next.js",
  "styled-components",
  "webpack",
  "react testing framework",
  "vue.js (v3)",
  "unit testing",
  "functional testing",
  "end-to-end testing",
  "jest",
  "playwright",
  "solid code",
  "bem methodology",
  "modern javascript (es6+)",
  "restful apis",
  "graphql",
  "agile approach",
  "user interface (ui) design",
  "user experience (ux) design",
  "react native",
  "javascript/typescript",
  "jvm spring",
  "node.js",
  "aws cloud services",
  "docker",
  "tdd",
  "testing pyramid",
  "scrum",
  "git / git flow",
  "ci/cd",
  "react.js",
  "rest api",
  "ci/cd pipelines",
  "kubernetes",
  "senior frontend engineer",
  "reactjs",
  "nodejs",
  "aws",
  "web front-end development",
  "cloud infrastructure",
  "serverless",
  "static sites delivery system",
  "feature development",
  "development lifecycle",
  "qa",
  "project activation",
  "mentorship",
  "coaching",
  "technical excellence",
  "backend and frontend architectures",
  "communication skills",
  "continuous learning",
  "software engineer",
  "html",
  "css",
  "vuejs",
  "test writing",
  "open source projects",
  "linux",
  "cypress",
  "nextjs",
  "java",
  "kotlin",
  "rest",
  "mongodb",
  "full-stack development",
  "code quality",
  "security",
  "horizontal teams",
  "architectural sanctity",
  "growing",
  "playing to strengths",
  "exposure to new areas",
  "full stack developer",
  "python",
  "sql",
  "design and develop systems",
  "responsive",
  "aws gateway",
  "fast api",
  "server-side logic",
  "robust and scalable backend systems",
  "performance",
  "reliability",
  "scalability",
  "testing and optimization",
  "troubleshoot and debug",
  "state management",
  "nosql",
  "problem-solving skills",
  "proactive and collaborative approach",
  "component library",
  "ui components",
  "collaboration",
  "customer interaction",
  "architecture",
  "implementation",
  "european values",
  "american ambition",
  "small teams",
  "equality",
  "postgres",
  "prisma orm",
  "node",
  "apollo",
  "turborepo",
  "threejs",
  "three.js",
  "3d",
  "design",
  "react applications",
  "exceptional ux",
  "crafting intricate",
  "interactive ui components",
  "keen eye for detail",
  "swift execution",
  "startup environment",
  "products",
  "or startups",
  "thrive in small",
  "outstanding teams",
  "foster equality",
  "interest in design",
  "html/css",
  "contentful",
  "php/symphony",
  "sulu cms",
  "ui kit",
  "design system",
  "machine learning",
  "ai",
  "data analytics",
  "agile mindset",
  "ux design",
  "interaction design",
  "web continuous delivery",
  "build automation",
  "test automation",
  "release automation",
  "bi systems",
  "a/b testing",
  "frontend framework",
  "angular",
  "vue.js",
  "frontend testing",
  "web applications",
  "individual autonomy",
  "openness to feedback",
  "customer development",
  "marketing",
  "modern browser apis",
  "language features",
  "common frontend frameworks and libraries",
  "elasticsearch",
  "aws fargate",
  "aws vpcs",
  "build and infrastructure tools",
  "engineering design decisions",
  "dotnet",
  "cloud experience",
  "agile methodologies",
  "devops",
  "best practice",
  "solid",
  "xp",
  "ci/cd practices",
  "deployments",
  "documentation",
  "knowledge sharing",
  "component libraries",
  "git",
  "performance optimization",
  "rest apis",
  "software development principles",
  "accessibility",
  "usability",
  "automated testing",
  "deployment workflow",
  "vercel",
  "php",
  "ecommerce projects",
  "cms",
  "internationalized websites",
  "restful web services",
  "api design",
  "npm",
  "cloud native development",
  "api gateways",
  "lambdas",
  ".net stack",
  "storyboard",
  "agile",
  "kanban",
  "ux flows",
  "figma",
  "adobe xd",
  "scss",
  "tailwind",
  "material ui",
  "wcag",
  "reusable ui components",
  "clean code architecture",
  "design systems",
  "ux principles",
  "modular components",
  "visually appealing flows",
  "collaboration skills",
  "independent work",
  "multidisciplinary teamwork",
  "passion for ux",
  "user experience",
  "server-side rendering",
  "isomorphic react",
  "continuous integration",
  "continuous delivery",
  "ui/ux design principles",
  "webgl",
  "ember",
  "javascript frameworks",
  "graph visualization applications",
  "web components",
  "node/npm",
  "responsive ui",
  "cloud technologies",
  "saas products",
  "accessibility (a11y)",
  "keyboard navigation",
  "screen readers",
  "react/next.js",
  "vue",
  "lit",
  "micro front-ends",
  "team player",
  "passionate about technology",
  "financial ecosystem",
  "angular 2+",
  "angular 15+",
  "rxjs",
  "ngrx",
  "ag-grid",
  "express.js",
  "react testing library",
  "agile software development",
  "api consumption",
  "integration testing",
  "technical problem-solving",
  "product problem-solving",
  "react-native",
  "express",
  "trpc",
  "cloud technology",
  "azure",
  "gcp",
  "storybook",
  "github",
  "continuous deployment techniques",
  "pull request reviews",
  "pair programming",
  "scrum processes",
  "automated tests",
  "internationalisation",
  "localisation",
  "responsive web design",
  "postcss/sass/scss",
  "javascript build tools",
  "module bundlers",
  "ux/ui design principles",
  "collaboration with designers",
  "testing frameworks or libraries",
  "vuex or pinia",
  "composition api",
  "vite/rollup/webpack",
  "component-driven development",
  "ui documentation",
  "selenium",
  "clerk",
  "stripe",
  "live coding",
  "ux/ui design bootcamp",
  "micro class",
  "web application development",
  "visual development",
  "asynchronous workflows",
  "performant ui components",
  "accessible ui components",
  "software engineers",
  "product managers",
  "product designers",
  "unit tests",
  "integration tests",
  "code design considerations",
  "quality",
  "planning",
  "development",
  "deployment processes",
  "frontend services",
  "backend services",
  "curriculum creation",
  "frontend development",
  "scalable saas product",
  "customer trust",
  "testing",
  "ambiguity",
  "solution scoping",
  "trade-offs",
  "technical requirements",
  "business requirements",
  "communication",
  "teamwork",
  "es6+ syntax and features",
  "angularjs",
  "nextjs/nuxtjs",
  "babel",
  "grunt/gulp",
  "npm/bower",
  "agile principles",
  "peer review",
  "design patterns",
  "test-first design",
  "solid principles",
  "vue 2",
  "vue 3",
  "laravel",
  "object-oriented programming",
  "oop",
  "architectural patterns",
  "bristol",
  "front end architectures",
  "requirements gathering",
  "agile environment",
  "bdd",
  "marionette.js",
  "asynchronous programming",
  "ui/ux principles",
  "version control systems",
  "debugging",
  "jasmine",
  "karma",
  "gulp",
  "liverpool",
  ".net platform",
  "it applications",
  "it infrastructure",
  "cybersecurity",
  "it services",
  "visual studio",
  "vs code",
  "jquery",
  "material design",
  "bootstrap",
  "agile methodology",
  "vitest",
  "azure pipelines",
  "test-driven development",
  "maintainable",
  "agile manifesto",
  "frontend architecture",
  "full-stack engineering",
  "stem degree",
  "maintainable code",
  "testable code",
  "well-documented code",
  "scrum/agile methodologies",
  "c#",
  "css/sass",
  "javascript/jquery",
  "vue/angular",
  "vue 3/composition api",
  "unit testing with vitest/jest",
  "c#.net core",
  ".net framework mvc razor",
  "azure services",
  "owasp",
  "chromatic",
  "working from home",
  "microsoft stack",
  "javascript/jquery/typescript",
  "unit testing (vitest/jest)",
  "mvc",
  "razor",
  ".net core/framework",
  "no-code platform",
  "coding",
  "design ideas",
  "code reviews",
  "full stack engineers",
  "backend developers",
  "jupiter platform",
  "best practices",
  "coding standards",
  "frontend codebase",
  "websockets",
  "client-side state management",
  "security protocols",
  "internationalization",
  "no-code platforms",
  "testing libraries",
  "css in js",
  "agile processes",
  "sprints",
  "verbal and written english",
  "strong understanding of typescript",
  "nextjs/nuxtjs etc",
  "ability to write efficient",
  "secure",
  "well-documented",
  "programming fundamentals",
  "experimentation",
  "nuxt.js",
  "ruby",
  "team collaboration",
  "passion for technology",
  "high-quality technology development",
  "micro front-end solutions",
  "cloud environment (aws)",
  "devops philosophy",
  "highly available and secure systems",
  "apis",
  "merchant account structure",
  "least privilege principle",
  "common security vulnerabilities in web applications",
  "requirements and specifications",
  "product features",
  "pipelines automation",
  "builds",
  "technical documentation",
  "mentoring",
  "web application design",
  "state management solutions",
  "customer focus",
  "accessible applications",
  "ux",
  "http",
  "tls",
  "continuous deployment",
  "react-dom",
  "lodash",
  "axios",
  "async",
  "mocha",
  "chai",
  "eslint",
  "babel-loader",
  "react-router-dom",
  "react-redux",
  "moment",
  "node-sass",
  "prop-types",
  "formik",
  "yup",
  "react-query",
  "framer-motion",
  "react-icons",
  "react-hook-form",
  "@material-ui/core",
  "@emotion/react",
  "@emotion/styled",
  "react-transition-group",
  "react-popper",
  "react-modal",
  "react-select",
  "react-table",
  "react-dates",
  "react-datepicker",
  "react-slider",
  "react-image-gallery",
  "react-player",
  "react-tippy",
  "react-tooltip",
  "react-scroll",
  "react-scrollspy",
  "react-window",
  "react-virtualized",
  "react-virtualized-auto-height",
  "react-virtualized-grid-layout",
  "react-virtualized-list",
  "fundamental programming concepts",
  "data structures",
  "algorithm design & analysis",
  "algorithm",
  "object-oriented design",
  "functional programming",
  "scripting languages",
  "compiled languages",
  "declarative languages",
  "version control",
  "build tools",
  "continuous integration & continuous delivery (ci/cd)",
  "code review practices",
  "generative ai tools",
  "html, css & javascript",
  "web front-end frameworks",
  "server side rendering (ssr)",
  "web back-end frameworks",
  "restful api design",
  "webassembly (wasm)",
  "android development",
  "ios development",
  "cross-platform ui development",
  "structured query language (sql)",
  "relational database design",
  "acid vs. base principles",
  "nosql databases",
  "distributed databases",
  "graph databases",
  "time-series databases",
  "full-text search",
  "indexing & query optimization",
  "cloud computing",
  "containerization",
  "container orchestration",
  "infrastructure as code (iac)",
  "monitoring & logging",
  "devsecops",
  "finops",
  "systems programming",
  "embedded systems",
  "test-driven development (tdd)",
  "behavior-driven development (bdd)",
  "secure coding",
  "authentication & authorization",
  "encryption & cryptography",
  "web application firewalls (waf)",
  "computer networking",
  "monolithic vs. distributed architectures",
  "domain-driven design",
  "event-driven architecture (eda)",
  "serverless architectures",
  "evolutionary architectures",
  "multi-cloud strategies",
  "extract-transform-load (etl) processes",
  "big data tools",
  "artificial intelligence (ai) & machine learning (ml)",
  "business intelligence (bi) & data visualization",
  "augmented & virtual reality",
  "game development",
  "internet of things (iot)",
  "blockchain, cryptocurrencies and smart contracts",
  "effective peer communication",
  "time-management skills",
  "critical thinking",
  "negotiation skills",
  "mentorship & teaching",
  "peer networking",
  "public speaking & presentations",
  "personal branding & online presence",
];

export default skills