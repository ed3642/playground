import { loadSlim } from '@tsparticles/slim'

let isInitialized = false

export const initializeParticleEngine = async (engine: any) => {
  if (!isInitialized) {
    await loadSlim(engine)
    isInitialized = true
  }
}
