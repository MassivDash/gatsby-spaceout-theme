import React from 'react';

const Spaceout = ({ fill = 'white', size = 32 }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={size + 10}
      height={size + 10}
      viewBox="0 0 700.000000 698.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <metadata></metadata>
      <g
        transform="translate(0.000000,698.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          fill={fill}
          d="M3399 5956 c-60 -55 -126 -124 -322 -341 -124 -138 -551 -688 -588
        -758 -7 -12 -42 -65 -79 -117 -37 -52 -94 -140 -127 -195 -33 -55 -86 -142
        -117 -193 -31 -51 -56 -95 -56 -98 0 -3 -10 -20 -22 -37 -47 -66 -285 -528
        -388 -752 -165 -360 -354 -861 -435 -1150 -8 -27 -23 -81 -35 -120 -28 -95
        -117 -446 -145 -575 -13 -58 -26 -115 -30 -127 -8 -25 10 -31 43 -14 175 88
        524 166 1030 228 l222 28 0 185 c0 187 21 634 41 855 5 66 14 167 19 225 26
        301 75 795 89 895 12 79 51 238 75 304 27 73 109 222 158 286 129 170 313 281
        545 330 80 17 261 19 352 4 81 -13 222 -65 293 -108 60 -36 206 -172 259 -241
        88 -114 168 -276 218 -440 17 -58 36 -118 41 -135 19 -63 57 -308 80 -515 31
        -271 86 -1206 93 -1550 l2 -105 85 -2 c203 -5 459 -38 710 -93 227 -49 484
        -121 547 -152 12 -6 29 -8 37 -5 14 5 14 9 1 34 -8 15 -18 44 -21 63 -10 58
        -121 455 -169 606 -25 77 -45 148 -45 157 0 9 -4 18 -9 21 -5 3 -11 18 -14 33
        -4 23 -53 163 -80 233 -3 8 -22 60 -42 115 -55 149 -122 320 -161 407 -19 43
        -34 80 -34 83 0 5 -60 139 -125 280 -235 507 -590 1119 -868 1497 -186 254
        -234 315 -322 417 -55 64 -112 132 -126 151 -48 63 -373 385 -422 418 -26 18
        -57 32 -67 32 -11 0 -51 -29 -91 -64z"
        ></path>
        <path
          fill={fill}
          d="M4216 3652 c-3 -6 -83 -51 -178 -102 -176 -95 -205 -112 -315 -184
        -60 -39 -80 -72 -50 -80 133 -38 288 -47 376 -20 75 22 139 88 168 174 25 73
        36 210 16 217 -6 2 -14 0 -17 -5z"
        ></path>
        <path
          fill={fill}
          d="M2697 3593 c-23 -22 15 -196 57 -261 32 -51 52 -67 121 -98 50 -23
        72 -27 140 -26 77 1 210 28 254 52 43 23 25 38 -179 153 -25 14 -106 53 -180
        88 -74 35 -147 71 -162 81 -28 19 -41 22 -51 11z"
        ></path>
      </g>
    </svg>
  );
};
export default Spaceout;
