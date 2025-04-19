import { Tooltip as LibTooltip } from 'react-tooltip';

type TooltipProps = {
  id: string;
  title: string;
  description: string;
};

export default function Tooltip({ id, title, description }: TooltipProps) {
  return (
    <LibTooltip id={id}>
      <div>{title}</div>
      <div>{description}</div>
    </LibTooltip>
  );
}
