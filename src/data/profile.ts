// Single source of truth for homepage facts. Every number here comes from
// the resume — if the resume changes, change this file with it.
// No company names (see anonymization rule) — describe by domain instead.

// Formspree form endpoint used by /contact. Replace YOUR_FORM_ID with the
// ID of the form created at formspree.io (format: https://formspree.io/f/<id>).
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export const profile = {
  name: 'Somasuntaram',
  title: 'DevOps & Platform Engineer',
  location: 'Chennai, India',
  years: 5,
  linkedin: 'https://www.linkedin.com/in/somasuntaram',
};

export const stats = [
  { value: 5, prefix: '', suffix: ' yrs', label: 'running production cloud infrastructure end to end, often as the first or only DevOps engineer' },
  { value: 8, prefix: '', suffix: '×', label: 'fewer load-balancer errors after connection tuning and safer rollouts' },
  { value: 75, prefix: '~', suffix: '%', label: 'lower network egress cost by moving data traffic onto private networking' },
  { value: 23, prefix: '−', suffix: '%', label: 'p90 latency, with latency and error alerting in place to keep it there' },
  { value: 3, prefix: '', suffix: '', label: 'compliance frameworks I’ve built controls for: SOC 2, PCI DSS 4.0 and ISO 27001' },
  { value: 0, prefix: '', suffix: '', label: 'long-lived cloud keys in this site’s own deploy pipeline. OIDC only.' },
];

export const now = [
  {
    kicker: 'Building',
    title: 'AI-assisted operations',
    body: 'MCP-based tooling that answers engineers’ debugging questions without handing anyone credentials. Read-only and audited by design.',
  },
  {
    kicker: 'Running',
    title: 'Multi-cloud infrastructure as code',
    body: 'Terraform and Kubernetes across AWS and Google Cloud, with the same patterns and guardrails on both.',
  },
  {
    kicker: 'Learning',
    title: 'Certified Kubernetes Administrator',
    body: 'Formalising years of hands-on EKS, GKE and Helm work. Expected December 2026.',
  },
];

export const principles = [
  {
    title: 'Claims I can defend',
    body: 'Every number on this site traces back to something I built and can walk through line by line. Where a write-up isn’t ready, it says so.',
  },
  {
    title: 'No long-lived credentials',
    body: 'OIDC for CI, Workload Identity, SSM Session Manager, audited read-only access. Keys that never exist can’t leak.',
  },
  {
    title: 'Proven, not declared',
    body: 'Disaster recovery isn’t done when Terraform applies. It’s done when a failover drill passes.',
  },
  {
    title: 'Cost is a feature',
    body: 'Retiring legacy hosting and moving traffic onto private networks is reliability work too. Waste hides risk.',
  },
];

export const journey = [
  {
    year: '2025 →',
    title: 'Lead DevOps Engineer',
    where: 'Enterprise omni-channel SaaS',
    points: [
      'Leading a high-traffic platform migration from Heroku to AWS containers',
      'Event-driven autoscaling, private networking and safer rollouts',
      'Infrastructure as code across AWS and GCP; SOC 2 and GDPR readiness',
    ],
  },
  {
    year: '2024',
    title: 'Senior DevOps Engineer',
    where: 'Fintech payments platform · promoted after 18 months',
    points: [
      'Ran MongoDB Atlas in production for real-time AML, transaction monitoring and risk',
      'Site-to-site and client VPNs with banking partners; hybrid on-prem Azure setup',
      'Centralised logging with EFK; infra evidence for SOC 2, PCI DSS 4.0, ISO 27001',
    ],
  },
  {
    year: '2022',
    title: 'Founding DevOps hire',
    where: 'Fintech payments platform',
    points: [
      'Built the AWS foundation from scratch: VPC, IAM, EKS, RDS, S3, Route53',
      'Jenkins CI/CD with SonarQube, Gitleaks, dependency and image scanning',
      'Prometheus + Grafana with on-call alerting; Linux hardening for audits',
    ],
  },
  {
    year: '2021',
    title: 'Associate DevOps Engineer',
    where: 'Zero Trust cloud security product',
    points: [
      'GKE deployments with Helm, plus Kubernetes troubleshooting',
      'Grafana dashboards for Percona MySQL; incident investigation and post-mortems',
    ],
  },
  {
    year: '2019',
    title: 'B.E. Electronics & Instrumentation',
    where: 'Hindusthan College of Engineering and Technology',
    points: [],
  },
];

export const caseStudies = [
  {
    slug: 'multi-region-dr',
    title: 'Multi-region DR rebuild',
    summary: 'Designed and built a dedicated DR region for a single-region platform, then proved it with a failover drill.',
    tags: ['Kubernetes', 'Terraform', 'DR'],
    status: 'ready',
  },
  {
    slug: 'devsecops-pipeline',
    title: 'DevSecOps pipeline design',
    summary: 'One pipeline template for ~30 services: SAST, secrets, dependency and container scans before every deploy.',
    tags: ['Jenkins', 'SonarQube', 'Gitleaks'],
    status: 'ready',
  },
  {
    slug: 'compliance-as-infrastructure',
    title: 'Compliance as infrastructure',
    summary: 'Keeps controls written as code separate from the formal audit work, so it’s clear which part was mine.',
    tags: ['IAM', 'SOC 2', 'Terraform'],
    status: 'ready',
  },
  {
    slug: 'portfolio-infra',
    title: 'This site’s own infrastructure',
    summary: 'S3 + CloudFront with OAC, deployed via GitHub Actions OIDC. No long-lived keys anywhere.',
    tags: ['AWS', 'OIDC', 'CloudFront'],
    status: 'ready',
  },
];
