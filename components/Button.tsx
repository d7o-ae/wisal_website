import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-wisal-primary text-white hover:bg-wisal-secondary focus:ring-wisal-primary shadow-sm hover:shadow-md",
    secondary: "bg-wisal-rose text-white hover:bg-opacity-90 focus:ring-wisal-rose shadow-sm",
    outline: "bg-transparent border-2 border-wisal-primary text-wisal-primary hover:bg-wisal-primary hover:text-white"
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;