import type { CSSProperties } from "react";

export type BurritoBrandLockupProps = {
  product?: string;
  iconSrc: string;
  iconSize?: number;
  className?: string;
  compact?: boolean;
};

export function BurritoBrandLockup({
  product,
  iconSrc,
  iconSize = 24,
  className = "",
  compact = false,
}: BurritoBrandLockupProps) {
  const style = { "--bui-brand-icon-size": `${iconSize}px` } as CSSProperties;
  return (
    <span className={`bui-brand-lockup ${compact ? "bui-brand-lockup-compact" : ""} ${className}`.trim()} style={style}>
      <img className="bui-brand-mark" src={iconSrc} alt="" aria-hidden="true" width={iconSize} height={iconSize} />
      <span className="bui-brand-wordmark">
        <strong>Burrito</strong>
        {product ? <span className="bui-brand-product">{product}</span> : null}
      </span>
    </span>
  );
}

