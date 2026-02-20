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

    const response = await fetch(`${API_BASE_URL}/consultation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify(payload),
    });

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
