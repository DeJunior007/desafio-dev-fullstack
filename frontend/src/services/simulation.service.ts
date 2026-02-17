import { api } from "./api";

export const simulationService = {
  // Registrar nova simulação
  create: async (formData: FormData) => {
    const { data } = await api.post('/simulations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Garante o envio do PDF
      },
    });
    return data;
  },

  // Listar com paginação e busca
  index: async (page: number, search: string) => {
    const { data } = await api.get('/simulations', {
      params: { 
        page, 
        perPage: 10, 
        search 
      },
    });
    return data;
  },

  // Ver detalhes de uma
  show: async (id: string) => {
    const { data } = await api.get(`/simulations/${id}`);
    return data;
  },
};