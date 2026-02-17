'use client';

import toast from 'react-hot-toast';
import { useCreateSimulation } from '@/app/hooks/use-simulations';
import { SimulationBackground } from '@/components/background/Simulation.background';
import { SimulationHeader } from '@/components/headers/Simulation.header';
import { SimulationFeatures } from '@/components/features/Simulation.feature';
import { UcSimulationForm } from '@/components/forms/Simulation.form';
import { type SimulationFormData } from '@/lib/validations/simulation';

export default function SimularPage() {
  const { mutateAsync: createSimulation, isPending } = useCreateSimulation();

  const handleFormSubmit = async (data: SimulationFormData) => {
    const formData = new FormData();
    formData.append('nomeCompleto', data.nome);
    formData.append('email', data.email);
    formData.append('telefone', data.telefone);
    
    data.files.forEach((file: File) => {
      formData.append('files', file); 
    });

    const toastId = toast.loading('Processando suas faturas...', { icon: '⚡' });

    try {
      await createSimulation(formData);
      toast.success('Simulações registradas com sucesso!', { id: toastId });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao processar solicitação.', { id: toastId });
    }
  };

  return (
    <main className="relative overflow-hidden">
      <SimulationBackground />

      <div className="relative p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
        <SimulationHeader />
            <div className="max-w-2xl mx-auto">
          <UcSimulationForm 
            onSubmit={handleFormSubmit} 
            isLoading={isPending} 
          />
        </div>
        <SimulationFeatures /> 

    

        <div className="text-center space-y-2 relative z-10">
          <p className="text-sm font-medium text-default-700">🔒 Seus dados estão seguros e protegidos</p>
        </div>
      </div>
    </main>
  );
}