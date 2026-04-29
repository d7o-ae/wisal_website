import ReactGA from 'react-ga4';

// GA4 Measurement ID for Wisal FrontEnd website
const TRACKING_ID = 'G-CQQNKCH11L';

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
