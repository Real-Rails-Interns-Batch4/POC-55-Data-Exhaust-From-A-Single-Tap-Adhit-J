export interface IntelligenceData {
  title: string;

  metric: {
    partnersTouched: number;
  };

  whyThisMatters: string;

  whoControls: string;

  privacyImplications: string[];

  mitigationTips: string[];

  sources?: IntelligenceSource[];
}

export interface IntelligenceSource {
  name: string;
  full: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
  status: "LIVE" | "MOCK";
  summary: string;
}