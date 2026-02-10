import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-gray-400 hover:text-gray-600 transition-colors`}
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-wisal-primary text-center mb-2">
          {t.downloadModal.title}
        </h2>
        <p className="text-wisal-secondary text-center mb-8 text-sm">
          {t.downloadModal.subtitle}
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Android */}
          <a
            href="https://play.google.com/store/apps/details?id=com.techcode.wisal&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 border-wisal-azure hover:border-wisal-rose hover:bg-wisal-azure/10 transition-all duration-200 group"
          >
            <svg className="w-8 h-8 text-[#3DDC84] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 2.237a.625.625 0 0 0-.803.368l-1.21 3.217a9.358 9.358 0 0 0-7.02 0L7.28 2.605a.625.625 0 1 0-1.17.436l1.145 3.043A9.263 9.263 0 0 0 2.88 12.25h18.24a9.263 9.263 0 0 0-4.374-6.166l1.145-3.043a.625.625 0 0 0-.368-.804zM8.25 9.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm7.5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM3 13.5v5.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V13.5H3z"/>
            </svg>
            <div className="flex-1">
              <div className="text-xs text-wisal-secondary">{t.downloadModal.getItOn}</div>
              <div className="text-lg font-semibold text-wisal-primary">Google Play</div>
            </div>
            <svg className={`w-5 h-5 text-wisal-muted group-hover:text-wisal-rose transition-colors ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* iOS */}
          <div className="flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-70 cursor-default">
            <svg className="w-8 h-8 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <div className="flex-1">
              <div className="text-xs text-gray-400">{t.downloadModal.comingSoon}</div>
              <div className="text-lg font-semibold text-gray-400">App Store</div>
            </div>
            <span className="text-xs font-medium bg-wisal-azure/50 text-wisal-secondary px-2.5 py-1 rounded-full">
              {t.downloadModal.soon}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppModal;
