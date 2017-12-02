import * as path        from "path";
import * as Koa         from "koa";
import * as staticFiles from "koa-static";
import * as React       from "react";
import * as ReactDOM    from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Helmet }       from "react-helmet";
import Application      from "./components/Application";

const app = new Koa();

// クライアント用のjsを配信する
app.use(staticFiles(path.resolve(__dirname, "../public")));

// StaticRouterにKoaのコンテキストからURLを渡し、
// レンダリングするべきコンポーネントを割り出して
// SSRしたマークアップを埋め込んで返す
app.use(ctx => {
  const context: { url?: string, status?: string } = {};
  const markup = ReactDOM.renderToString(
    <StaticRouter location={ctx.url} context={context}>
      <Application/>
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  // contextにurlがセットされていた場合はリダイレクトする
  // これによって<Redirect>コンポーネントがサーバ側でも機能する
  if (context.url) {
    ctx.redirect(context.url);
  } else {
    ctx.body = `
      <!DOCTYPE html>
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          ${helmet.title.toString()}
        </head>
        <body>
          <!-- ブラウザ側でSSRされたコンポーネントを見つけるためにidを設定しておく -->
          <div id="react-root">${markup}</div>
          <script type="text/javascript" src="/javascripts/application.js"></script>
        </body>
      </html>
    `;
  }
});

app.listen(process.env.PORT || 3000);
