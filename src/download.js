import JSZip from "jszip";

import FileSaver from "file-saver";
import api from "./api";

export const downloadSTL = async (model) => {
  const stlBlob = await api.createSTL(model);
  FileSaver.saveAs(stlBlob, "hsw.stl");
};

export const downloadSTEP = async (model) => {
  const stepBlob = await api.createSTEP(model);
  FileSaver.saveAs(stepBlob, "hsw.step");
};

export default async (model) => {
  const waitToBeDone = [];
  const zip = new JSZip();

  zip.file("model.stl", await api.createSTL(model));
  zip.file("model.step", await api.createSTEP(model));

  return Promise.all(waitToBeDone)
    .then(() => zip.generateAsync({ type: "blob" }))
    .then((blob) => FileSaver.saveAs(blob, `hsw.zip`));
};
