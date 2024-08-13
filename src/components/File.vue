<template>
  <button class="btn btn-outline-light border-0" @click.prevent="handleClick">
    Select File
  </button>
  <input
    type="file"
    accept=".csv, .xlsx"
    class="d-none"
    ref="fileInput"
    @change="handleChange"
  />
</template>

<script setup>
import { inject, ref } from "vue";
// package for XLSX files
import { read, utils } from "xlsx";
// package for CSV files
import { parse } from "papaparse";
import emitter from "@/utils/Events";

const $vocabs = inject("$vocabs");

let fileInput = ref(null);
let fileTitle = ref("");

const XLSX_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const CSV_TYPE = "text/csv";

function handleClick() {
  fileInput.value.click();
}

async function handleChange(e) {
  let data;

  const file = e.target.files[0];
  const fileType = file.type;

  fileTitle.value = file.name;
  console.log(`${fileTitle.value} loaded`);

  switch (fileType) {
    case XLSX_TYPE:
      data = await readXLSX(file);
      break;

    case CSV_TYPE:
      data = await readCSV(file);
      break;

    default:
      console.error("file process error");
      break;
  }

  console.log(data);

  const vocabVault = $vocabs.createVocabVault(data);
  console.log(vocabVault);

  emitter.emit("file-loaded", $vocabs.getAllChapters());
  emitter.emit("relocate-chapter", $vocabs.goToChapter(0));
}

async function readCSV(csvFile) {
  return new Promise((resolve) => {
    parse(csvFile, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function (results) {
        resolve(results.data);
      },
    });
  });
}

async function readXLSX(xlsxFile) {
  const file = await xlsxFile.arrayBuffer();
  const workbook = read(file);
  const worksheet = workbook.Sheets[workbook.SheetNames[1]];
  const data = utils.sheet_to_json(worksheet);
  return data;
}
</script>
