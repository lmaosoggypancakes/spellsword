<template>
  <ClientOnly>
    <TresCanvas clear-color="#0E0F19" shadows alpha>
      <TresPerspectiveCamera :position="[1, 1, 1]" />
      <OrbitControls />
      <Suspense> <GLTFModel path="/book f.glb" /> </Suspense>
      <TresAmbientLight :intensity="15" :position="[-100, 25, 90]" />
    </TresCanvas>
  </ClientOnly>
</template>

<script setup lang="ts">
import { OrbitControls, GLTFModel } from "@tresjs/cientos";
</script>
