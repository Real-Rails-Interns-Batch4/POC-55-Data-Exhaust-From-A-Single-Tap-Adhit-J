export interface IntelligenceData {
  title: string;

  metric: {
    partnersTouched: number;
  };

  whyThisMatters: string;

  whoControls: string;

  privacyImplications: string[];

  mitigationTips: string[];
}