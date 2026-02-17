'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { simulationService } from '@/services/simulation.service';

export const useCreateSimulation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => simulationService.create(data),
    onSuccess: () => {
      // Atualiza a lista automaticamente ao criar um novo lead
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
};

export const useSimulations = (page: number, search: string) => {
  return useQuery({
    queryKey: ['simulations', page, search],
    queryFn: () => simulationService.index(page, search),
    // Evita que a tela dê "flicker" (pisque) ao trocar de página
    placeholderData: (previousData) => previousData,
    staleTime: 5000, // Mantém os dados "frescos" por 5 segundos
  });
};

export const useSimulationDetails = (id: string) => {
  return useQuery({
    queryKey: ['simulations', id],
    queryFn: () => simulationService.show(id),
    enabled: !!id, // Só executa se tiver um ID
  });
};