'use client';


const Footer = () => {
  return (
    <footer className="bg-primary/10 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-sm text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Deep Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;