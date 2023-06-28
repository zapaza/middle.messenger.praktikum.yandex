export const collectingFormFields = (target: Record<string, any>) => {
  const formData: Record<string, any> = {};
  if (target) {
    target.forEach((item: HTMLInputElement) => {
      if (['INPUT', 'TEXTAREA'].includes(item.nodeName)) {
        if (item.name && formData) {
          formData[item.name] = item.value;
        }
      }
    });
  }
  return formData;
};
