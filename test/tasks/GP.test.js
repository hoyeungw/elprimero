import { GP } from '../../dist/index.esm'
import { Fun } from 'veho'

export class GPTest {
  static testAllGP () {
    let funcNames = Fun.getStaticMethodNames(GP)
    funcNames.forEach(funcName => {
      const func = GP[funcName]
      funcName.tag(func.call()).wL()
    })
  }

  static testAllGP2 () {
    GP.roughlyNow().wL()
    GP.now().wL()
    GP.present().wL()
    GP.today().wL()
  }
}

// export {
//   GPTest
// }