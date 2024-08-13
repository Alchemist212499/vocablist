<template>
  <div class="vh-100 overflow-hidden">
    <div class="h-25">
      <Navbar></Navbar>
      <div class="h-100"></div>
    </div>
    <div class="d-flex h-75">
      <div class="col-12">
        <div class="h-50 justify-content-center d-flex flex-column">
          <Vocab></Vocab>
        </div>
        <div class="h-50"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Vocab from "./components/Vocab.vue";
import Navbar from "./components/Navbar.vue";

import { inject, ref } from "vue";
import emitter from "@/utils/Events";
const $vocabs = inject("$vocabs");

function getPrevVocab() {
  let { curChp, curVocab } = $vocabs.getPrevVocab();
  emitter.emit("prev-vocab", { curChp, curVocab });
}
function getNextVocab() {
  let { curChp, curVocab } = $vocabs.getNextVocab();
  emitter.emit("next-vocab", { curChp, curVocab });
}

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    getPrevVocab();
  } else if (e.code === "ArrowRight") {
    getNextVocab();
  }
});

/* function handleWheelEvent(e) {
  // wheel down
  if (e.deltaY > 0) {
    getNextVocab();
  } else if (e.deltaY < 0) {
    getPrevVocab();
  }
} */
</script>
