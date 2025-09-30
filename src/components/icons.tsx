import type { SVGProps } from 'react';

export function BlendInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Blend In! Logo</title>
      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9c0-4.97 4.03-9 9-9" />
      <path d="M15.5 15.5c-1.33-1.33-2.17-3.17-2.17-5.17 0-4 3.17-7.17 7.17-7.17" />
    </svg>
  );
}
