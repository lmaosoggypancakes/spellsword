<template>
  <ClientOnly>
    <TresCanvas clear-color="#0E0F19" shadows alpha>
      <OrbitControls />
      <TresScene>
        <TresPerspectiveCamera
          :position="[1, 2, 5]"
          :fov="45"
          :aspect="1"
          :near="0.1"
          :far="1000"
        />
        <TresMesh ref="boxRef" :scale="1" cast-shadow>
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresScene>
    </TresCanvas>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ShallowRef, shallowRef } from "vue";

import { useRenderLoop, TresInstance } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);

const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta;
    boxRef.value.rotation.z = elapsed * 0.2;
  }
});
</script>
