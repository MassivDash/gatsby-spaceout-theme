import React from 'react';

export default (props) => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <script
        dangerouslySetInnerHTML={{__html: `document.domain = "spaceout.pl"`}}
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{__html: props.body}}
      />
      {props.postBodyComponents}
    </body>
  </html>
);
