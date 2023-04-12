<template>
  <ClientOnly>
    <TresCanvas clear-color="#0E0F19" shadows alpha>
      <TresPerspectiveCamera :position="[15, 15, 15]" />
      <OrbitControls />
      <Suspense>
        <GLTFModel path="/scene.gltf" cast-shadow ref="bookRef" />
      </Suspense>
      <TresPointLight :intensity="15" :position="[25, 25, 25]" />
    </TresCanvas>
  </ClientOnly>
</template>

<script setup lang="ts">
import { OrbitControls, GLTFModel } from "@tresjs/cientos";
</script>
