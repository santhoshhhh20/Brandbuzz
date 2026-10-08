import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  asChild?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <a ref={ref} href={href} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;
