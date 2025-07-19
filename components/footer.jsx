import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-cetner text-gray-200 flex justify-center">
          <p>
            Made by{' '}
            <a
              href="https://portfolio-snowy-beta-66.vercel.app/"
              className="text-gray-400 transition-all hover:underline"
            >
              Spandan Mozumder
            </a>{' '}
            with lots of ❤️ and ☕️
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
