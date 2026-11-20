import React from "react";

const make = (children, extra = {}) => {
  const Icon = ({ size = 24, ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...extra}
      {...props}
    >
      {children}
    </svg>
  );
  return Icon;
};

export const SearchIcon = make(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>);
export const BagIcon = make(<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></>);
export const UserIcon = make(<><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></>);
export const UsersIcon = make(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);
export const StoreIcon = make(<><path d="M3 9l1-5h16l1 5" /><path d="M4 9v11h16V9" /><path d="M9 20v-6h6v6" /><path d="M3 9h18" /></>);
export const ClockIcon = make(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>);
export const StarIcon = make(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />);
export const TruckIcon = make(<><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></>);
export const AwardIcon = make(<><circle cx="12" cy="8" r="6" /><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" /></>);
export const TagIcon = make(<><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z" /><circle cx="7.5" cy="7.5" r=".6" fill="currentColor" /></>);
export const CardIcon = make(<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M6 15h4" /></>);
export const HeadsetIcon = make(<><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" /><path d="M3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" /><path d="M21 18v1a3 3 0 0 1-3 3h-4" /></>);
export const ArrowRightIcon = make(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>);
export const CheckIcon = make(<path d="M20 6 9 17l-5-5" />);
export const ZapIcon = make(<path d="M13 2 3 14h9l-1 8 10-12h-9z" />);
export const InstagramIcon = make(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></>);
export const FacebookIcon = make(<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />);
export const YoutubeIcon = make(<><path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></>);
export const TwitterIcon = make(<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />);
export const LogoutIcon = make(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></>);
export const CloseIcon = make(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>);
export const PlusIcon = make(<><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></>);
export const ListIcon = make(<><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><circle cx="3.5" cy="6" r=".8" fill="currentColor" /><circle cx="3.5" cy="12" r=".8" fill="currentColor" /><circle cx="3.5" cy="18" r=".8" fill="currentColor" /></>);
export const PackageIcon = make(<><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" /></>);
export const UploadIcon = make(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>);
