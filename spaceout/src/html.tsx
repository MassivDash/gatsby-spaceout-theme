import React from 'react';

type Props = {
  htmlAttributes: Record<string, unknown>;
  headComponents: React.ReactNode;
  bodyAttributes: Record<string, unknown>;
  preBodyComponents: React.ReactNode;
  body: string;
  postBodyComponents: React.ReactNode;
};

const Html: React.FC<Props> = (props) => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <script
        dangerouslySetInnerHTML={{ __html: `document.domain = "spaceout.pl"` }}
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
    </body>
  </html>
);

export default Html;
