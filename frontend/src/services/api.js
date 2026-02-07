// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const API_KEY = import.meta.env.VITE_API_KEY

export const submitConsultation = async (formData) => {
  try {
    const payload = {
      nama: formData.fullName,
      email: formData.email,
      kontak: formData.phone,
      proyek: formData.projectType,
      budget: formData.budget,
      timeline_proyek: formData.timeline,
      deskripsi: formData.description,
    };

    console.log("API URL:", API_BASE_URL);
    console.log("API Key:", API_KEY);

    const response = await fetch(`${API_BASE_URL}/konsultasi/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log('Raw response:', text);
    
    let data = {};
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      console.warn('Response was not valid JSON');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting consultation:', error);
    throw error;
  }
};
