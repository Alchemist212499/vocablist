<template>
  <button
    class="btn btn-outline-light border-0 pe-5 ps-5"
    type="button "
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasWithBothOptions"
    aria-controls="offcanvasWithBothOptions"
  >
    {{ chpSeq }} : {{ chpTitle }}
  </button>

  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
        Vocab Menu
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="list-group">
        <button
          type="button"
          :class="[
            'list-group-item',
            'list-group-item-action',
            { active: index === chpIndex },
          ]"
          @click.prevent="relocateChapter(index)"
          v-for="(chapter, index) in chapters"
          :key="index"
        >
          {{ chapter.seq }} : {{ chapter.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import emitter from "@/utils/Events";
import { computed, ref, inject } from "vue";

let chpSeq = ref("chpSeq");
let chpTitle = ref("chpTitle");
let chpIndex = ref(0);

let chapters = ref([]);

const $vocabs = inject("$vocabs");

let chp = computed({
  get() {
    return { chpSeq, chpTitle };
  },
  set(curChp) {
    chpSeq.value = curChp.seq;
    chpTitle.value = curChp.title;
  },
});

function relocateChapter(index) {
  emitter.emit("relocate-chapter", $vocabs.goToChapter(index));
}

emitter.on("next-vocab", ({ curChp, curChpIndex }) => {
  chp.value = curChp;
  chpIndex.value = curChpIndex;
});

emitter.on("prev-vocab", ({ curChp, curChpIndex }) => {
  chp.value = curChp;
  chpIndex.value = curChpIndex;
});

emitter.on("file-loaded", (chaptersArray) => {
  chapters.value = chaptersArray;
});

emitter.on("relocate-chapter", ({ curChp, curChpIndex }) => {
  chp.value = curChp;
  chpIndex.value = curChpIndex;
});
</script>

<style scoped>
.offcanvas-body::-webkit-scrollbar {
  display: none;
}

.list-group-item,
.list-group-item.active {
  border-radius: 0px;
}

.list-group-item {
  background-color: black;
  color: white;
  border-width: 0 0 1px 0;
  border-color: white;
}

.list-group-item.active {
  background-color: white;
  color: black;
  text-decoration: underline;
  border-width: 1px 0;
  border-color: black;
}

.list-group-item:last-child {
  border-bottom: none;
}

.list-group-item:hover {
  background-color: white;
  color: black;
}
</style>
