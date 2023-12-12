const EyeCloseIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
      <line x1="2" y1="2" x2="22" y2="22"></line>
    </svg>
  );
};

const EyeOpenIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
};
const ViewIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-eye ${props.className}`}
      style={props.style}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

const PencilIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-brush ${props.className}`}
      style={props.style}
    >
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  );
};

const TashIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <path d="M3 6h18"></path>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      <line x1="10" x2="10" y1="11" y2="17"></line>
      <line x1="14" x2="14" y1="11" y2="17"></line>
    </svg>
  );
};

const ChevronLeftIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
};

const ChevronRightIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

const ArrowDownIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

const BellIcon = (props) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M6.48278 11.3528C6.48278 10.3872 6.66429 9.43111 7.01694 8.53902C7.36959 7.64694 7.88647 6.83637 8.53808 6.15359C9.18969 5.47082 9.96326 4.92921 10.8146 4.5597C11.666 4.19019 12.5785 4 13.5 4C14.4215 4 15.334 4.19019 16.1854 4.5597C17.0367 4.92921 17.8103 5.47082 18.4619 6.15359C19.1135 6.83637 19.6304 7.64694 19.9831 8.53902C20.3357 9.43111 20.5172 10.3872 20.5172 11.3528C20.5172 15.019 21.2502 17.1491 21.8952 18.3165C21.9638 18.4408 21.9999 18.5819 22 18.7254C22.0001 18.869 21.9642 19.0101 21.8959 19.1345C21.8276 19.259 21.7293 19.3625 21.6109 19.4346C21.4924 19.5067 21.3579 19.5449 21.2209 19.5454H5.77911C5.6421 19.5449 5.50762 19.5067 5.38914 19.4346C5.27067 19.3625 5.17236 19.259 5.10406 19.1345C5.03576 19.0101 4.99988 18.869 5 18.7254C5.00012 18.5819 5.03625 18.4408 5.10475 18.3165C5.74979 17.1491 6.48278 15.019 6.48278 11.3528Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.667 19.5459V20.0368C10.667 20.5576 10.9655 21.057 11.4969 21.4253C12.0282 21.7936 12.7489 22.0004 13.5003 22.0004C14.2518 22.0004 14.9724 21.7936 15.5038 21.4253C16.0351 21.057 16.3337 20.5576 16.3337 20.0368V19.5459"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SidebarPropMenuIcon = (props) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M1 1H18.5"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 8L18 8"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1 15H18.5"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const QRIcon = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M7.1875 1H1.88393C1.39575 1 1 1.39575 1 1.88393V7.1875C1 7.67568 1.39575 8.07143 1.88393 8.07143H7.1875C7.67568 8.07143 8.07143 7.67568 8.07143 7.1875V1.88393C8.07143 1.39575 7.67568 1 7.1875 1Z"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.1875 11.9287H1.88393C1.39575 11.9287 1 12.3245 1 12.8126V18.1162C1 18.6044 1.39575 19.0001 1.88393 19.0001H7.1875C7.67568 19.0001 8.07143 18.6044 8.07143 18.1162V12.8126C8.07143 12.3245 7.67568 11.9287 7.1875 11.9287Z"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1161 1H12.8125C12.3243 1 11.9286 1.39575 11.9286 1.88393V7.1875C11.9286 7.67568 12.3243 8.07143 12.8125 8.07143H18.1161C18.6043 8.07143 19 7.67568 19 7.1875V1.88393C19 1.39575 18.6043 1 18.1161 1Z"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9286 11.9287V15.143"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9286 19.0001H15.1429V11.9287"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1428 13.8569H19"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 17.0713V18.9999"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SidebarMenuIcon = (props) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <rect
        x="0.5"
        y="0.5"
        width="7"
        height="7"
        rx="1.5"
        stroke={props.color}
      />
      <rect
        x="9.5"
        y="0.5"
        width="7"
        height="7"
        rx="1.5"
        stroke={props.color}
      />
      <rect
        x="0.5"
        y="9.5"
        width="7"
        height="7"
        rx="1.5"
        stroke={props.color}
      />
      <rect
        x="9.5"
        y="9.5"
        width="7"
        height="7"
        rx="1.5"
        stroke={props.color}
      />
    </svg>
  );
};

const PageIcon = (props) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M11 6.99988L5 7.00977"
        stroke={props.color}
        strokeLinecap="round"
      />
      <path
        d="M1 3C1 1.89543 1.89543 1 3 1H11.6358C12.0875 1 12.5259 1.15289 12.8796 1.43378L15.1667 3.25L17.2438 4.89946C17.7215 5.27886 18 5.85559 18 6.46568V17C18 18.1046 17.1046 19 16 19H3C1.89543 19 1 18.1046 1 17V3Z"
        stroke={props.color}
      />
      <path d="M14 15H5" stroke={props.color} strokeLinecap="round" />
      <path d="M14 11H5" stroke={props.color} strokeLinecap="round" />
    </svg>
  );
};

const UserIcon = (props) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M9 7.75C10.864 7.75 12.375 6.23896 12.375 4.375C12.375 2.51104 10.864 1 9 1C7.13604 1 5.625 2.51104 5.625 4.375C5.625 6.23896 7.13604 7.75 9 7.75Z"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7302 10H5.26984C2.91167 10 1 11.7916 1 14.0017V14.9983C1 17.2084 2.91167 19 5.26984 19H12.7302C15.0883 19 17 17.2084 17 14.9983V14.0017C17 11.7916 15.0883 10 12.7302 10Z"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const AnnouncementIcon = (props) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <ellipse
        cx="16.75"
        cy="8.93335"
        rx="2.24999"
        ry="7.93335"
        stroke={props.color}
      />
      <path
        d="M5.5 5.5338C7.93749 5.5338 12.925 5.76046 15.625 2.13379"
        stroke={props.color}
      />
      <path
        d="M5.5 12.3363C7.93749 12.3363 12.925 12.1097 15.625 15.7363"
        stroke={props.color}
      />
      <path
        d="M3.25 12.333H6.62499V16.3122C6.62499 17.2442 5.86947 17.9997 4.9375 17.9997V17.9997C4.00552 17.9997 3.25 17.2442 3.25 16.3122V12.333Z"
        stroke={props.color}
      />
      <path
        d="M1 7.5332C1 6.42863 1.89543 5.5332 3 5.5332H6.62498V12.3332H3C1.89543 12.3332 1 11.4378 1 10.3332V7.5332Z"
        stroke={props.color}
      />
    </svg>
  );
};

const CopyIcon = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M17.1998 7.2998H9.0998C8.10569 7.2998 7.2998 8.10569 7.2998 9.0998V17.1998C7.2998 18.1939 8.10569 18.9998 9.0998 18.9998H17.1998C18.1939 18.9998 18.9998 18.1939 18.9998 17.1998V9.0998C18.9998 8.10569 18.1939 7.2998 17.1998 7.2998Z"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.7 12.7H2.8C2.32261 12.7 1.86477 12.5104 1.52721 12.1728C1.18964 11.8352 1 11.3774 1 10.9V2.8C1 2.32261 1.18964 1.86477 1.52721 1.52721C1.86477 1.18964 2.32261 1 2.8 1H10.9C11.3774 1 11.8352 1.18964 12.1728 1.52721C12.5104 1.86477 12.7 2.32261 12.7 2.8V3.7"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ImpressionIcon = (props) => {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <rect x="1" y="6" width="11" height="14" rx="3" stroke={props.color} />
      <path d="M10 4V1" stroke={props.color} strokeLinecap="round" />
      <path
        d="M14.1426 7L17.1426 7"
        stroke={props.color}
        strokeLinecap="round"
      />
      <path
        d="M13.0603 4.50506L14.3281 1.78613"
        stroke={props.color}
        strokeLinecap="round"
      />
    </svg>
  );
};

const ClickIcon = (props) => {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M3.00284 9.9998L1.33325 12.4047C0.852165 13.0977 0.896169 14.0625 1.43796 14.701L4.59031 18.4161C4.9059 18.788 5.35076 18.9997 5.81779 18.9997C6.7227 18.9997 8.20262 18.9997 9.66761 18.9997C11.667 18.9997 13 17.1998 13 15.3998C13 15.3998 13 9.22842 13 7.68555"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.501 8.19971C10.501 8.19971 10.501 8.08711 10.501 7.68543C10.501 5.62829 13.0003 5.62829 13.0003 7.68543"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.00098 8.19995C8.00098 8.19995 8.00098 7.46046 8.00098 6.65711C8.00098 4.59997 10.5003 4.59997 10.5003 6.65711C10.5003 6.85794 10.5003 7.48483 10.5003 7.68567C10.5003 8.08735 10.5003 8.19995 10.5003 8.19995"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.50195 8.2001C5.50195 8.2001 5.50195 6.95428 5.50195 5.95007C5.50195 3.89294 8.00124 3.89294 8.00124 5.95007C8.00124 5.95007 8.00124 6.45637 8.00124 6.65722C8.00124 7.46057 8.00124 8.2001 8.00124 8.2001"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.50222 8.19996C5.50222 8.19996 5.50222 6.95417 5.50222 5.94997C5.50222 4.90738 5.50222 3.4207 5.50222 2.34908C5.50222 1.6035 4.94274 1 4.25257 1C3.56241 1 3.00293 1.60441 3.00293 2.34999V9.99995V12.6999"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PlusIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

const PageUserIcon = (props) => {
  return (
    <svg
      width="39"
      height="37"
      viewBox="0 0 39 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M19.5001 25.3479C26.2414 25.3479 31.7063 19.8975 31.7063 13.174C31.7063 6.45047 26.2414 1 19.5001 1C12.7588 1 7.29395 6.45047 7.29395 13.174C7.29395 19.8975 12.7588 25.3479 19.5001 25.3479Z"
        stroke={props.color}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M1 35.9996C2.87467 32.7605 5.57128 30.0706 8.81874 28.2004C12.0662 26.3303 15.7501 25.3457 19.5 25.3457C23.2499 25.3457 26.9338 26.3303 30.1813 28.2004C33.4287 30.0706 36.1253 32.7605 38 35.9996"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PageUsersIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
};

const PageBioLinkIcon = (props) => {
  return (
    <svg
      width="40"
      height="37"
      viewBox="0 0 40 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <rect
        x="1.5"
        y="1"
        width="37"
        height="8.07692"
        rx="2"
        stroke={props.color}
        strokeWidth="2"
      />
      <rect
        x="1.5"
        y="14.4619"
        width="37"
        height="8.07692"
        rx="2"
        stroke={props.color}
        strokeWidth="2"
      />
      <rect
        x="1.5"
        y="27.9229"
        width="37"
        height="8.07692"
        rx="2"
        stroke={props.color}
        strokeWidth="2"
      />
    </svg>
  );
};

const PageImageIcon = (props) => {
  return (
    <svg
      width="38"
      height="31"
      viewBox="0 0 38 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M34.9109 1H3.0895C2.29065 1 1.64307 1.6332 1.64307 2.41429V27.8714C1.64307 28.6525 2.29065 29.2857 3.0895 29.2857H34.9109C35.7098 29.2857 36.3574 28.6525 36.3574 27.8714V2.41429C36.3574 1.6332 35.7098 1 34.9109 1Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.64307 22.2146L10.7375 13.3223C10.8721 13.1887 11.0325 13.0826 11.2094 13.0101C11.3864 12.9377 11.5763 12.9004 11.7681 12.9004C11.9599 12.9004 12.1498 12.9377 12.3267 13.0101C12.5036 13.0826 12.6641 13.1887 12.7986 13.3223L20.8625 21.207C20.9971 21.3406 21.1575 21.4467 21.3344 21.5191C21.5114 21.5916 21.7013 21.6289 21.8931 21.6289C22.0849 21.6289 22.2748 21.5916 22.4517 21.5191C22.6286 21.4467 22.7891 21.3406 22.9236 21.207L26.6482 17.5652C26.7828 17.4315 26.9432 17.3254 27.1201 17.253C27.2971 17.1805 27.487 17.1432 27.6788 17.1432C27.8706 17.1432 28.0605 17.1805 28.2374 17.253C28.4143 17.3254 28.5748 17.4315 28.7094 17.5652L36.3574 25.0432"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.0626 11.6069C24.8615 11.6069 25.5091 10.9737 25.5091 10.1926C25.5091 9.41152 24.8615 8.77832 24.0626 8.77832C23.2638 8.77832 22.6162 9.41152 22.6162 10.1926C22.6162 10.9737 23.2638 11.6069 24.0626 11.6069Z"
        fill="#262626"
      />
    </svg>
  );
};

const PageVideoIcon = (props) => {
  return (
    <svg
      width="28"
      height="31"
      viewBox="0 0 28 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M25.5538 13.7724C26.8768 14.5442 26.8768 16.4558 25.5538 17.2276L4.50774 29.5044C3.17443 30.2822 1.5 29.3205 1.5 27.7769L1.5 3.22311C1.5 1.67953 3.17443 0.717786 4.50774 1.49555L25.5538 13.7724Z"
        fill="#F8FFD2"
        stroke={props.color}
        strokeWidth="2"
      />
    </svg>
  );
};

const PageBookIcon = (props) => {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M3.46882 31.2188V5.78125C3.46882 4.55462 3.95609 3.37824 4.82345 2.51088C5.69081 1.64353 6.86719 1.15625 8.09382 1.15625H33.5313V26.5938H8.29038C7.11289 26.5704 5.96851 26.9841 5.07809 27.7549C4.18768 28.5258 3.61437 29.5991 3.46882 30.7678C3.4057 31.412 3.4785 32.0622 3.6825 32.6765C3.88649 33.2907 4.21715 33.8554 4.65308 34.3338C5.08901 34.8122 5.62051 35.1938 6.2132 35.4539C6.80589 35.714 7.44657 35.8468 8.09382 35.8438H33.5313"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.2188 26.5938V35.8438"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PageFilesIcon = (props) => {
  return (
    <svg
      width="33"
      height="35"
      viewBox="0 0 33 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M19.2303 12.3071L8.8457 12.3242"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1.92285 3.92285C1.92285 2.81828 2.81828 1.92285 3.92285 1.92285H20.8407C21.2924 1.92285 21.7308 2.07574 22.0845 2.35663L26.4421 5.81708L30.5897 9.11077C31.0675 9.49018 31.3459 10.0669 31.3459 10.677V31.0767C31.3459 32.1813 30.4505 33.0767 29.3459 33.0767H3.92285C2.81828 33.0767 1.92285 32.1813 1.92285 31.0767V3.92285Z"
        stroke={props.color}
        strokeWidth="2"
      />
      <path
        d="M24.4226 26.1533H8.8457"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24.4226 19.2305H8.8457"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const PageLinkIcon = (props) => {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M15.0098 20.2472C15.7594 21.2504 16.7157 22.0805 17.814 22.6812C18.9122 23.2818 20.1267 23.639 21.375 23.7285C22.6232 23.818 23.8761 23.6377 25.0487 23.1998C26.2212 22.762 27.286 22.0768 28.1708 21.1908L33.4072 15.9488C34.997 14.301 35.8767 12.0941 35.8568 9.80336C35.8369 7.51263 34.9191 5.32135 33.3009 3.7015C31.6828 2.08164 29.4938 1.16281 27.2055 1.14291C24.9172 1.123 22.7126 2.00361 21.0666 3.59507L18.0644 6.58302"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9919 16.7517C21.2423 15.7485 20.2859 14.9184 19.1877 14.3177C18.0894 13.7171 16.875 13.3599 15.6267 13.2704C14.3784 13.1809 13.1255 13.3612 11.953 13.799C10.7804 14.2369 9.71567 14.9221 8.8309 15.8081L3.59443 21.0501C2.00465 22.6979 1.12498 24.9048 1.14486 27.1955C1.16475 29.4863 2.0826 31.6775 3.70074 33.2974C5.31889 34.9172 7.50784 35.8361 9.79615 35.856C12.0845 35.8759 14.289 34.9953 15.9351 33.4038L18.9198 30.4159"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PageIframeIcon = (props) => {
  return (
    <svg
      width="40"
      height="31"
      viewBox="0 0 40 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M10.75 4.37207L1.5 14.4883L10.75 24.6046"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M29.25 5.0459L38.5 15.1622L29.25 25.2785"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24.9335 1L14.4502 30"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const PageMenuIcon = (props) => {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M3.1177 2.3623L31.6669 30.9114C32.2086 31.4531 32.5129 32.1878 32.5129 32.954C32.5129 33.7201 32.2086 34.4548 31.6669 34.9966C31.125 35.5381 30.3903 35.8423 29.6243 35.8423C28.8582 35.8423 28.1235 35.5381 27.5817 34.9966L20.6077 27.9025C20.1513 27.4391 19.8953 26.8149 19.8948 26.1644V25.7359C19.8948 25.4075 19.8297 25.0823 19.703 24.7793C19.5764 24.4763 19.3908 24.2014 19.1571 23.9707L18.2567 23.1393C17.951 22.8572 17.5793 22.6566 17.1758 22.5559C16.7723 22.4551 16.3499 22.4575 15.9475 22.5628C15.313 22.7284 14.6462 22.7252 14.0133 22.5535C13.3805 22.3818 12.8035 22.0476 12.3396 21.5841L5.71977 14.9635C1.79265 11.0364 0.347481 5.10617 3.1177 2.3623Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M29.6582 1.14258L23.6722 7.12856C23.2116 7.58909 22.8462 8.13584 22.5969 8.7376C22.3476 9.33936 22.2193 9.98433 22.2193 10.6357V11.7872C22.2193 11.9501 22.1873 12.1114 22.1249 12.2619C22.0625 12.4124 21.9711 12.5492 21.8559 12.6643L20.9795 13.5407"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.459 16.0205L24.3354 15.1441C24.4505 15.0289 24.5873 14.9375 24.7378 14.8751C24.8883 14.8127 25.0496 14.7807 25.2126 14.7807H26.364C27.0154 14.7807 27.6604 14.6524 28.2621 14.4031C28.8639 14.1538 29.4106 13.7884 29.8712 13.3278L35.8572 7.3418"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.7577 4.24219L26.5586 10.4413"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.16 27.1786L6.43284 34.9492C5.85159 35.5303 5.06335 35.8567 4.24146 35.8567C3.41958 35.8567 2.63134 35.5303 2.05008 34.9492C1.46901 34.3679 1.14258 33.5797 1.14258 32.7578C1.14258 31.9359 1.46901 31.1477 2.05008 30.5664L8.58083 24.0791"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SettingsIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
};

const SearchIcon = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M9.00003 17.0001C13.4183 17.0001 17.0001 13.4183 17.0001 9.00003C17.0001 4.58173 13.4183 1 9.00003 1C4.58173 1 1 4.58173 1 9.00003C1 13.4183 4.58173 17.0001 9.00003 17.0001Z"
        stroke="#585858"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.0004 19.0004L14.6504 14.6504"
        stroke="#585858"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const DeleteIcon = (props) => {
  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M1.60059 4.79395L2.48375 18.1435"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.4834 18.1436C2.4834 18.616 2.87957 18.9999 3.3666 18.9999"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.36719 19H13.6336"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6338 18.9999C14.1209 18.9999 14.5164 18.616 14.5164 18.1436"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5159 18.1435L15.4004 4.79395H1.60059"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1541 4.78906H0.845703"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 4V2"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 2C13 1.44848 12.5515 1 12 1"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 1H5"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 1C4.44744 1 4 1.44853 4 2"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 2V4H13"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.60938 6.50293V17.0229"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.20312 6.50293V17.0229"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.79883 6.50293V17.0229"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3916 6.50293V17.0229"
        stroke="#262626"
        strokeMiterlimit="2.6131"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EditIcon = (props) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={props.style}
    >
      <path
        d="M17.6168 4.75204C17.8552 4.51361 18.1383 4.32448 18.4498 4.19545C18.7613 4.06641 19.0952 4 19.4324 4C19.7696 4 20.1035 4.06641 20.415 4.19545C20.7265 4.32448 21.0095 4.51361 21.248 4.75204C21.4864 4.99046 21.6755 5.27351 21.8046 5.58503C21.9336 5.89655 22 6.23043 22 6.56761C22 6.90479 21.9336 7.23868 21.8046 7.55019C21.6755 7.86171 21.4864 8.14476 21.248 8.38319L8.99283 20.6383L4 22L5.36168 17.0072L17.6168 4.75204Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 7L19 11" stroke="black" />
    </svg>
  );
};

const NoPagesFoundIcon = (props) => {
  return (
    <svg
      width="75"
      height="64"
      viewBox="0 0 75 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-[16px] mr-[20px]"
    >
      <path
        d="M67.7357 0H36.8087C32.8398 0 29.5449 3.22248 29.5449 7.19438V56.8056C29.5449 60.7775 32.7649 64 36.8087 64H67.7357C71.7046 64 74.9995 60.7775 74.9995 56.8056V7.19438C74.9995 3.22248 71.7795 0 67.7357 0ZM72.7529 56.8056C72.7529 59.5785 70.5064 61.7518 67.7357 61.7518H36.8087C34.038 61.7518 31.7914 59.5035 31.7914 56.8056V7.19438C31.7914 4.42155 34.038 2.24824 36.8087 2.24824H67.7357C70.5064 2.24824 72.7529 4.49649 72.7529 7.19438V56.8056Z"
        fill="#B8DCDB"
      />
      <path
        d="M61.0542 26.2295H43.4905C42.9216 26.2295 42.4238 26.7541 42.4238 27.3536C42.4238 27.9531 42.9216 28.4777 43.4905 28.4777H61.0542C61.623 28.4777 62.1208 27.9531 62.1208 27.3536C62.1208 26.7541 61.623 26.2295 61.0542 26.2295Z"
        fill="#B8DCDB"
      />
      <path
        d="M61.0542 30.7256H43.4905C42.9216 30.7256 42.4238 31.2502 42.4238 31.8497C42.4238 32.4492 42.9216 32.9738 43.4905 32.9738H61.0542C61.623 32.9738 62.1208 32.4492 62.1208 31.8497C62.1208 31.2502 61.623 30.7256 61.0542 30.7256Z"
        fill="#B8DCDB"
      />
      <path
        d="M61.0542 35.2227H43.4905C42.9216 35.2227 42.4238 35.7472 42.4238 36.3468C42.4238 36.9463 42.9216 37.4709 43.4905 37.4709H61.0542C61.623 37.4709 62.1208 36.9463 62.1208 36.3468C62.1208 35.7472 61.623 35.2227 61.0542 35.2227Z"
        fill="#B8DCDB"
      />
      <path
        d="M52.2723 12.7402C50.151 12.7402 48.4844 14.4813 48.4844 16.5252C48.4844 17.5092 48.8632 18.4933 49.6207 19.1746C50.3026 19.8559 51.2874 20.2344 52.2723 20.2344C54.3935 20.2344 56.0601 18.4933 56.0601 16.4495C56.0601 14.4056 54.3935 12.7402 52.2723 12.7402Z"
        fill="#B8DCDB"
      />
      <path
        d="M20.8384 35.7232C20.6989 35.7232 20.561 35.6938 20.4339 35.6368C20.3069 35.5797 20.1936 35.4965 20.1017 35.3927L16.9741 31.8572C15.7147 32.1779 14.4193 32.3395 13.1188 32.3381C9.65182 32.3381 6.3793 31.2214 3.90941 29.1977C1.38862 27.132 0 24.366 0 21.4134C0 18.4608 1.39123 15.6967 3.90941 13.6297C6.3793 11.606 9.65182 10.4912 13.1188 10.4912C16.5858 10.4912 19.8583 11.606 22.3262 13.6297C24.847 15.6954 26.235 18.4614 26.235 21.4134C26.235 24.5648 24.6317 27.52 21.8173 29.5934V34.7575C21.8173 35.0143 21.7141 35.2606 21.5306 35.4422C21.347 35.6238 21.098 35.7258 20.8384 35.7258V35.7232ZM17.3036 29.7922C17.4431 29.7921 17.581 29.8216 17.7081 29.8786C17.8351 29.9356 17.9484 30.0188 18.0403 30.1227L19.8596 32.1787V29.0957C19.8598 28.9379 19.899 28.7825 19.9737 28.6432C20.0484 28.5038 20.1564 28.3845 20.2883 28.2959C22.8254 26.5794 24.28 24.071 24.28 21.4134C24.28 16.459 19.2743 12.4278 13.1214 12.4278C6.96855 12.4278 1.96286 16.459 1.96286 21.4134C1.96286 26.3677 6.96594 30.4015 13.1188 30.4015C14.4398 30.4045 15.7539 30.2139 17.0184 29.8361C17.1108 29.8075 17.2069 29.7927 17.3036 29.7922Z"
        fill="#B8DCDB"
      />
      <path
        d="M9.09082 25.4805L16.6666 17.9863"
        stroke="#dee4f4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.6666 25.4805L9.09082 17.9863"
        stroke="#dee4f4"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ArrowRightIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

const ArrowLeftIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
};

const ArrowUpDownIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <path d="m7 15 5 5 5-5"></path>
      <path d="m7 9 5-5 5 5"></path>
    </svg>
  );
};

const MoreVerticalIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  );
};

const LocationIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-map-pin"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
};

const CheckIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={props.style}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};

export {
  EyeCloseIcon,
  EyeOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownIcon,
  BellIcon,
  QRIcon,
  SidebarPropMenuIcon,
  SidebarMenuIcon,
  PageIcon,
  UserIcon,
  AnnouncementIcon,
  CopyIcon,
  ImpressionIcon,
  ClickIcon,
  PlusIcon,
  PageUserIcon,
  PageUsersIcon,
  PageBioLinkIcon,
  PageImageIcon,
  PageVideoIcon,
  PageBookIcon,
  PageFilesIcon,
  PageLinkIcon,
  PageIframeIcon,
  PageMenuIcon,
  SettingsIcon,
  SearchIcon,
  DeleteIcon,
  EditIcon,
  NoPagesFoundIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpDownIcon,
  MoreVerticalIcon,
  ViewIcon,
  PencilIcon,
  TashIcon,
  LocationIcon,
  CheckIcon,
};
