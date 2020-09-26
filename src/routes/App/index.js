import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
const getModResources = (modName: String)  => {
  if (process.env.NODE_ENV === 'development') {
    // 开发环境用 es6 模块加载方式，方便调试
    return import(/* webpackChunkName: "${modName}"*/`./children/Home/index.js`)
  } else {
    return new Promise((resolve, reject) => {
      window.requirejs(['/modules/mod-a/mod-a.js'], (mod: any) => {
        resolve(mod)
      })
    })
  }
}
// const Home = lazy(() => import('./children/Home/index'))
const Home = lazy(() => getModResources('Home'))

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </Suspense>
  </BrowserRouter>
)
export default App


