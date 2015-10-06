// TODO use async when available!

module Util {

  interface Loader {
    (callback: any): void
  }

  interface Asset {
    (path: string, id: string): Loader
  }

  export function Image(path:string, id: string): Loader {
    return function(callback) {
      const img = document.createElement('img')
      img.src = path
      img.onload = function() {
        Assets.bank[id] = img
        callback(this)
      }
    }
  }
/*
  export function Json(path, id) {
    return function() {
      const req = new XMLHttpRequest()
      req.open('get', path, true);
      req.onload = function getMapRequest() {
        Assets.bank[id] = JSON.parse(this.responseText)
        console.log(id, Assets.bank[id])
      }
      req.send();
    }
  }
*/
  class Loading {
    loaders: Loader[]

    constructor(loaders: Loader[], public callback?: any) {
      this.loaders = loaders.slice(0)
      this.loaders.forEach((l) => l(this.done.bind(this)))
    }

    done(loader: Loader) {
      this.loaders.splice(this.loaders.indexOf(loader), 1)

      if (this.loaders.length === 0) {
        this.callback()
        // TODO remove loading from assets when finished
      }
    }
  }

  export class Assets {
    static bank: Asset[]
    static loadings: Loading[]

    static load(loaders: Loader[], callback?: any) { // TODO func type
      if (!this.loadings)
        this.loadings = []
      if (!this.bank)
        this.bank = []

      this.loadings.push(new Loading(loaders, callback))
    }

    static get(id: string) { // TODO check if it exists
      if (!this.bank)
        return null

      return Assets.bank[id]
    }
  }

}