import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', borderTop: '1px solid #1f2937', backgroundColor: 'black', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ color: '#71717a' }}>
            x.3wordpin.com — Pin your thoughts
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#a1a1aa', flexWrap: 'wrap' }}>
            <a
              href="https://x.com/3WordPin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#00b8ff', transition: 'color 0.3s', textDecoration: 'none' }}
            >
              X: @3WordPin
            </a>
            <a
              href="https://tiktok.com/@3WordPin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#00b8ff', transition: 'color 0.3s', textDecoration: 'none' }}
            >
              TikTok: @3WordPin
            </a>
            <a
              href="https://instagram.com/3WordPin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#00b8ff', transition: 'color 0.3s', textDecoration: 'none' }}
            >
              Instagram: @3WordPin
            </a>
            <a href="#" style={{ color: '#a1a1aa', transition: 'color 0.3s', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: '#a1a1aa', transition: 'color 0.3s', textDecoration: 'none' }}>Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
