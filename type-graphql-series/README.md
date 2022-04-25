# TypeGraphQL 유투브 강좌 따라하기

Ben Awad 의 3년전 GraphQL 강좌 

좀 철지나서, 사용된 기술들의 업데이트된 공식문서를 잘 찾아보면서 따라해야 한다. 

[TypeGraphQL Youtube Course - Ben Awad](https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)


# 주요 메모 

## Apollo Client 관련 

동영상에서 사용한 도구는 이전버전의 Apollo 이다. 최신 Apollo 에서는 Apollo Studio 라고 
하는 도구가 사용되는 것 같다. 이 버전이 이쁘기는 하는데, 동영상과 같은 이전 버전의 Apollo Client 를 쓸 
수 있는 방법을 찾아서 적용했다. 

```ts
import {ApolloServer} from "apollo-server-express";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";

// ... 중략 

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: context => {
      const { req } = context;
      return { req };
    }
  });
  await apolloServer.start();
```

위에서 `ApolloServerPluginLandingPageGraphQLPlayground` 플러그인이 이전버전의 Apollo Client 를 대신 사용할 수 있게 해준다. 
얼듯 사용해 봐도 훨씬 가볍다. 

## Session Cookie 관련 

`ApolloServerPluginLandingPageGraphQLPlayground` 을 통해 session 인증시 cookie가 저장안되는 문제와 관련하여 추가 설명을 들었다. 

Ben 은 Apollo Client의 설정을 몇개 바꾸어야 한다고 했다. 

```json
{
  "editor.cursorShape": "line",
  "editor.fontFamily": "'D2Coding', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
  "editor.fontSize": 14,
  "editor.reuseHeaders": true,
  "editor.theme": "dark",
  "general.betaUpdates": false,
  "prettier.printWidth": 80,
  "prettier.tabWidth": 2,
  "prettier.useTabs": false,
  "request.credentials": "include",
  "schema.disableComments": true,
  "schema.polling.enable": false,
  "schema.polling.endpointFilter": "*localhost*",
  "schema.polling.interval": 5000,
  "tracing.hideTracingResponse": true,
  "queryPlan.hideQueryPlanResponse": true
}
```

위에서 내가 기본값으로 부터 바꾼것은  

- `"request.credentials": "include",` : Ben 이 지적한 바로 그 부분.
- `"schema.polling.enable": false,` : 내가 찾은거. 이걸 false 로 하면 브라우저 네트워크 탭이 지저분해 지지 않더라. 다만, 스키마가 바뀌면 종종 Apollo Client 화면내의 주소 창 옆쪽에 Refresh 버튼을 가끔 눌러줘야 할때가 생긴다.

또, Ben 과는 달리, 나는 

cookie 에서 

```ts

  const app = Express();
  
  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));
  app.use(
    session({
      secret: "asdfasdfasdfasdf",
      cookie: {
        httpOnly: true, 
        secure: false, // https 를 사용할 때만 true ?!
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax", // secure= true 인 경우에는 "None"
      },
      resave: false,
      saveUninitialized: false,
      name: "qid",
      store: CreateSessionStore(session),
    })
  );
  apolloServer.applyMiddleware({
    app,
  });

```

와 같이 `sameSite` 는 `"lax"` 로 `secure` 는 `false` 로 해야만 http 접근시 cookie가 저장되는 것 같았다. 
