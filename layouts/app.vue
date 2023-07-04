<template>
  <div
    class="max-h-screen md:grid grid-flow-row grid-rows-12 md:grid-flow-col md:grid-cols-12 relative grow-0 overflow-y-scroll bg-base-100"
  >
    <Navbar class="row-span-2 sticky left-0 top-0" />
    <div class="md:col-span-10 w-full h-screen overflow-y-hidden"><slot /></div>
  </div>
</template>
