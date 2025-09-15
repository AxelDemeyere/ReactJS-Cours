import styles from './ProgressBar.module.css';
import {memo} from 'react';
import type {ProgressBarProps} from '../../type/ProgressBarProps.ts';

export const ProgressBar = memo(({ current, total, showPercent = true, label }: ProgressBarProps) => {
  const safeTotal = Math.max(total, 1);
  const clampedCurrent = Math.min(Math.max(current, 0), safeTotal);
  const ariaPercent = Math.round(clampedCurrent / safeTotal * 100);   // valeur annoncée (question en cours incluse)

  return (
    <div className={styles.wrapper}
         role="progressbar"
         aria-label={label || `Progression du quiz`}
         aria-valuenow={ariaPercent}
         aria-valuemin={0}
         aria-valuemax={100}>
      <div className={styles.header}>
        <span>Question {clampedCurrent} / {safeTotal}</span>
        {showPercent && <span>{ariaPercent}%</span>}
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${ariaPercent}%` }} />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';
