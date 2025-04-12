export function errorSvg() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          cx={12}
          cy={12}
          r={10}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 19 19 5"
        />
      </svg>
    </>
  );
}

export function infoSvg() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        viewBox="0 0 24 24"
      >
        <title />
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <circle cx={12} cy={12} r={10} data-name="--Circle" />
          <path d="M12 12v4M12 8h0" />
        </g>
      </svg>
    </>
  );
}

export function successSvg() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        fill="currentColor"
        viewBox="0 0 512 512"
      >
        <path d="M437.016 74.984c-99.979-99.979-262.075-99.979-362.033.002-99.978 99.978-99.978 262.073.004 362.031 99.954 99.978 262.05 99.978 362.029-.002 99.979-99.956 99.979-262.051 0-362.031zm-30.168 331.86c-83.318 83.318-218.396 83.318-301.691.004-83.318-83.299-83.318-218.377-.002-301.693 83.297-83.317 218.375-83.317 301.691 0s83.316 218.394.002 301.689z" />
        <path d="M368.911 155.586 234.663 289.834l-70.248-70.248c-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17l85.333 85.333c8.331 8.331 21.839 8.331 30.17 0l149.333-149.333c8.331-8.331 8.331-21.839 0-30.17s-21.839-8.331-30.17 0z" />
      </svg>
    </>
  );
}

export function warningSvg() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M13.062 4.43a1.196 1.196 0 0 0-2.14 0L3.89 18.5a1.196 1.196 0 0 0 1.07 1.732h14.065c.889 0 1.467-.936 1.07-1.731L13.062 4.429Zm-3.72-.791c1.092-2.185 4.209-2.185 5.3 0l7.034 14.07c.985 1.972-.448 4.291-2.65 4.291H4.958c-2.202 0-3.635-2.32-2.65-4.29L9.342 3.639Z"
          clipRule="evenodd"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.7}
          d="M12 8v5M12 16v.5"
        />
      </svg>
    </>
  );
}
