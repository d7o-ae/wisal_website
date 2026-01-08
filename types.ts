import { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  id: number;
  title: string;
  icon: LucideIcon;
  description?: string;
}

export interface StepItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AudienceItem {
  id: number;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}