import type { PerfectCirclePosition, EllipsePosition } from '../Body';
export const bodyCirclePositionData: (
  | PerfectCirclePosition
  | EllipsePosition
)[] = [
  // 右肩
  {
    text: 'translate(127.98 104.68)',
    figure: [
      {
        type: 'circle',
        cx: '146.98',
        cy: '138.51',
        r: '23.2',
      },
    ],
  },
  // 左肩
  {
    text: 'translate(256.5 104.68)',
    figure: [
      {
        type: 'circle',
        cx: '270.63',
        cy: '138.51',
        r: '23.2',
      },
    ],
  },
  // 右上腕
  {
    text: 'translate(36.69 194.43)',
    figure: [
      {
        type: 'ellipse',
        cx: '128.21',
        cy: '196.12',
        rx: '36.57',
        ry: '29.3',
        transform: 'translate(-88.11 286.17) rotate(-79.43)',
      },
    ],
  },
  // 左上腕
  {
    text: 'translate(336.36 194.43)',
    figure: [
      {
        type: 'ellipse',
        cx: '290.22',
        cy: '196.12',
        rx: '29.3',
        ry: '36.57',
        transform: 'matrix(0.98, -0.18, 0.18, 0.98, -31.06, 56.57)',
      },
    ],
  },
  // 右ひじ
  {
    text: 'translate(36 247.81)',
    figure: [
      {
        type: 'ellipse',
        cx: '118.03',
        cy: '244.9',
        rx: '12.34',
        ry: '25.71',
        transform: 'translate(-144.36 316) rotate(-79.43)',
      },
    ],
  },
  // 左ひじ
  {
    text: 'translate(336.36 247.81)',
    figure: [
      {
        type: 'ellipse',
        cx: '299.57',
        cy: '244.9',
        rx: '25.71',
        ry: '12.34',
        transform: 'translate(-39.85 59.12) rotate(-10.57)',
      },
    ],
  },
  // 右前腕
  {
    text: 'translate(7 289.62)',
    figure: [
      {
        type: 'ellipse',
        cx: '102.87',
        cy: '293.18',
        rx: '36.57',
        ry: '29.3',
        transform: 'translate(-207.55 280.05) rotate(-68.24)',
      },
    ],
  },
  // 左前腕
  {
    text: 'translate(365.64 289.62)',
    figure: [
      {
        type: 'ellipse',
        cx: '315.56',
        cy: '293.18',
        rx: '29.3',
        ry: '36.57',
        transform: 'translate(-86.19 137.85) rotate(-21.76)',
      },
    ],
  },
  // 右手首
  {
    text: 'translate(0.23 339.1)',
    figure: [
      {
        type: 'ellipse',
        cx: '81.76',
        cy: '339.64',
        rx: '12.34',
        ry: '25.71',
        transform: 'translate(-267.12 357.7) rotate(-79.43)',
      },
    ],
  },
  // 左手首
  {
    text: 'translate(369.97 339.1)',
    figure: [
      {
        type: 'ellipse',
        cx: '335.85',
        cy: '339.64',
        rx: '25.71',
        ry: '12.34',
        transform: 'translate(-56.61 67.38) rotate(-10.57)',
      },
    ],
  },
  // 右指
  {
    text: 'translate(66.65 436.17)',
    figure: [
      {
        type: 'ellipse',
        cx: '61.86',
        cy: '388.87',
        rx: '23.12',
        ry: '39.97',
        transform: 'translate(-322.23 302.19) rotate(-68.24)',
      },
    ],
  },
  // 左指
  {
    text: 'translate(320.41 436.17)',
    figure: [
      {
        type: 'ellipse',
        cx: '355.75',
        cy: '388.87',
        rx: '39.97',
        ry: '23.12',
        transform: 'translate(-118.8 159.56) rotate(-21.76)',
      },
    ],
  },
];
