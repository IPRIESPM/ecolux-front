import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('sections', () => {
  const sections = ref([]);
  const sectionSelected = ref(null);
  const addSection = (section) => {
    sections.value.push(section);
  };
  const deleteSection = (section) => {
    const index = sections.value.findIndex((sec) => sec.id === section.id);
    sections.value.splice(index, 1);
  };
  const updateSection = (section) => {
    const index = sections.value.findIndex((sec) => sec.id === section.id);
    sections.value[index] = section;
  };
  return {
    sections, sectionSelected, addSection, deleteSection, updateSection,
  };
});
