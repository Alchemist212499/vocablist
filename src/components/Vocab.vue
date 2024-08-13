<template>
  <div
    :class="[
      'text-center',
      'vocab',
      { unveil: visibility === true },
      { veil: visibility === false },
    ]"
    @click.prevent="toggleDef"
  >
    <h1>{{ vocabNewWord }}</h1>
  </div>
  <div
    :class="[
      'text-center',
      'vocab',
      { show: visibility === true },
      { hide: visibility === false },
    ]"
    @click.prevent="toggleDef"
  >
    <h2>{{ vocabDef }}</h2>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import emitter from "@/utils/Events";

let vocabNewWord = ref("vocabNewWord");
let vocabDef = ref("vocabDef");
let vocabNotes = ref("vocabNotes");

let visibility = ref(false);
let presence = ref(null);

let vocab = computed({
  get() {
    return { vocabNewWord, vocabDef, vocabNotes };
  },
  set(curVocab) {
    vocabNewWord.value = curVocab.newWord;
    vocabDef.value = curVocab.def;
    vocabNotes.value = curVocab.notes;
  },
});

function toggleDef() {
  visibility.value === true
    ? (visibility.value = false)
    : (visibility.value = true);
}

emitter.on("next-vocab", ({ curVocab }) => {
  vocab.value = curVocab;
});

emitter.on("prev-vocab", ({ curVocab }) => {
  vocab.value = curVocab;
});

emitter.on("relocate-chapter", ({ curVocab }) => {
  vocab.value = curVocab;
});

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    visibility.value = true;
  } else if (e.code === "ArrowDown") {
    visibility.value = false;
  }
});
</script>

<style scoped>
.veil,
.unveil {
  transition: all 0.2s ease-in-out;
}

.veil {
  transform: translateY(3rem);
}

.unveil {
  transform: translateY(-0.05rem);
}

.show {
  opacity: 1;
  transition: all 0.2s ease-in;
}

.hide {
  opacity: 0;
  transition: all 0.01s linear;
}

.vocab {
  cursor: pointer;
}
</style>
