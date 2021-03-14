import { ErrorIcon as Error, SpanMark, SpanLine } from './styled';

const ErrorIcon = () => (
  <Error>
    <SpanMark>
      <SpanLine left />
      <SpanLine />
    </SpanMark>
  </Error>
);

export default ErrorIcon;
