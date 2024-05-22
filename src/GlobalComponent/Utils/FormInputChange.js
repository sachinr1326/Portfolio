const FormInputChange = (e, formData, setFormData, errors, setErrors) => {
    const { name, value, type, checked } = e.target;
  
    // For checkboxes, handle checked state
    const newValue = type === "checkbox" ? checked : value;
  
    setFormData({
      ...formData,
      [name]: newValue,
    });
  
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  export default FormInputChange;
  