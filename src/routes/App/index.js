import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
const getModResources = (modName: String)  => {
  if (process.env.NODE_ENV === 'development') {
    // 开发环境用 es6 模块加载方式，方便调试
    return import(/* webpackChunkName: "${modName}"*/`./children/${modName}/index.js`)
  } else {
    return new Promise((resolve, reject) => {
      debugger
      window.requirejs([`/modules/${modName}.js`], (mod: any) => {
        debugger
        resolve(mod)
      })
    })
  }
}
// const Home = lazy(() => import('./children/Home/index'))
const ModuleA = lazy(() => getModResources('ModuleA'))
const ModuleB = lazy(() => getModResources('ModuleB'))

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route  path="/a" component={ModuleA}/>
        <Route  path="/b" component={ModuleB}/>
      </Switch>
    </Suspense>
  </BrowserRouter>
)
export default App


