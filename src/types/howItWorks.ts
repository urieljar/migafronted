// Define las interfaces de los pasos del proceso artesanal y de las políticas de logística:

export interface ProcessStep {
  stepNumber: number;
  title: string;
  badge: string;
  description: string;
  image: string;
  details: string[];
}
export type PolicyIconType = 'clock' | 'calendar' | 'truck' | 'bread';
export interface PolicyInfo {
  icon: PolicyIconType;
  title: string;
  text: string;
  highlight?: string;
}