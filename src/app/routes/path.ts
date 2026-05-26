export const paths = {
  home: '/',
  start: '/start',
  consent: '/participant/step1',
  calibration: '/participant/step2',
  connection: '/participant/step3',
  /** step4: 광고 시청 플로우 (준비 → 시청 → 완료) */
  step4: {
    ready: '/participant/step4/ready',
    view: '/participant/step4/view',
    complete: '/participant/step4/complete',
  },
  /** step5: 설문 플로우 (설문 → 최종 완료) */
  step5: {
    survey: '/participant/step5/survey',
    complete: '/participant/step5/complete',
  },
  dashboard: '/marketer/dashboard',
} as const;
