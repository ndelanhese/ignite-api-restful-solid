import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    console.log('setup prisma')

    return {
      teardown() {
        console.log('teardown prisma')
      },
    }
  },
}
