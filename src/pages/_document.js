import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <Script
            src="https://connect.ekomi.de/integration_1687407938/5D80CE1F83B240A.js"
            defer
        ></Script> */}
        <Script src="https://www.paypalobjects.com/api/checkout.js" />
        {/* <Script
            type="text/javascript"
            src="https://connect.ekomi.de/integration_1690100331/5D80CE1F83B240A.js"
            async
        /> */}
        <Script src="https://www.paypal.com/sdk/js?client-id=Adb_leRAqSPIwT39TI6BlmJ-5H_0m-26jC70w6HH6o0YQnxzz6zPC1BOgzjqOeRijKb6Pvller95zwN9&currency=GBP" />
        <Script
          type="text/javascript"
          src="https://x.klarnacdn.net/kp/lib/v1/api.js"
        ></Script>
        <Script
          type="text/javascript"
          src="https://js.afterpay.com/afterpay-1.x.js"
        ></Script>
        {/* <Script type="text/javascript" src="https://portal.afterpay.com/afterpay.js"></Script> */}
        <Script
          type="text/javascript"
          src="https://osm.klarnaservices.com/lib.js"
          async
          data-environment="production"
          data-client-id="402ec898-b30e-58d6-add4-ee58d1f4cf8c"
        ></Script>
        <Script
          type="text/javascript"
          src="https://js.stripe.com/v3/"
          async
        ></Script>
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KH8RQ3L"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
