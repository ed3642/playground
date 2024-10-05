import { loadSlim } from '@tsparticles/slim'

export let isInitialized = false

export const initializeParticleEngineSingleton = async (engine: any) => {
  if (!isInitialized) {
    await loadSlim(engine)
    isInitialized = true
  }
}
