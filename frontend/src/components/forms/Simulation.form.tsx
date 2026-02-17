'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@heroui/react";
import { User, Mail, Phone, Zap, ChevronRight, FileText } from 'lucide-react';
import { Input } from '../ui/Input';
import { FileDropzone } from '../ui/FileDropZone';
import { simulationSchema, type SimulationFormData } from '@/lib/validations/simulation';

interface UcSimulationFormProps {
  onSubmit: (data: SimulationFormData) => Promise<void>;
  isLoading: boolean;
}

export function UcSimulationForm({ onSubmit, isLoading }: UcSimulationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields }
  } = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    defaultValues: { files: [] }
  });

  const files = watch('files');
  const completedPersonalFields = ['nome', 'email', 'telefone'].filter(
    (f) => dirtyFields[f as keyof SimulationFormData]
  ).length;

  return (
    <div className="relative">
      {/* Ambient glow behind the card */}
      <div className="absolute -inset-4 bg-orange-100/60 rounded-[2.5rem] blur-2xl pointer-events-none" />

      {/* Card shell */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-orange-100 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] overflow-hidden">

        {/* Thin orange accent line at top */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-200">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
              Simulador de Energia
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Realize sua Simulação
          </h2>
          <p className="text-gray-500 text-sm mt-1.5">
            Descubra quanto você pode economizar na conta de energia.
          </p>
        </div>

        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

            {/* ── Section 1: Personal data ── */}
            <div>
              <SectionLabel
                step={1}
                title="Seus dados"
                completed={completedPersonalFields}
                total={3}
              />

              <div className="space-y-4 mt-4">
                <Input
                  {...register('nome')}
                  label="Nome Completo"
                  placeholder="Digite seu nome completo"
                  icon={User}
                  isInvalid={!!errors.nome}
                  errorMessage={errors.nome?.message}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    {...register('email')}
                    type="email"
                    label="E-mail"
                    placeholder="seu@email.com"
                    icon={Mail}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                  <Input
                    {...register('telefone')}
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    icon={Phone}
                    isInvalid={!!errors.telefone}
                    errorMessage={errors.telefone?.message}
                  />
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">
                e
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* ── Section 2: File upload ── */}
            <div>
              <SectionLabel
                step={2}
                title="Faturas de energia"
                subtitle="Últimos 12 meses em PDF"
                icon={<FileText size={12} />}
              />

              <div className="mt-4">
                <FileDropzone
                  files={files || []}
                  onFilesSelected={(newFiles) =>
                    setValue('files', newFiles, { shouldValidate: true })
                  }
                  error={errors.files?.message as string}
                />
              </div>

              {/* File count hint */}
              {files && files.length > 0 && (
                <p className="mt-2 text-xs text-gray-400 flex items-center gap-1.5">
                  <span className="inline-flex w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center text-[10px] font-bold">
                    {files.length}
                  </span>
                  {files.length === 1
                    ? '1 arquivo selecionado'
                    : `${files.length} arquivos selecionados`}
                </p>
              )}
            </div>

            {/* ── CTA ── */}
            <Button
              type="submit"
              className="w-full font-semibold text-base text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200 transition-all duration-200 rounded-xl h-14"
              size="lg"
              isLoading={isLoading}
              startContent={
                !isLoading && <Zap size={17} className="fill-white" />
              }
              endContent={
                !isLoading && (
                  <ChevronRight
                    size={17}
                    className="opacity-60 -mr-1 transition-transform group-hover:translate-x-0.5"
                  />
                )
              }
            >
              {isLoading ? 'Analisando arquivos...' : 'Realizar Simulação'}
            </Button>

            {/* Trust line */}
            <p className="text-center text-[11px] text-gray-400">
              Seus dados são protegidos e não serão compartilhados.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Internal helpers ── */

function SectionLabel({
  step,
  title,
  subtitle,
  completed,
  total,
  icon,
}: {
  step: number;
  title: string;
  subtitle?: string;
  completed?: number;
  total?: number;
  icon?: React.ReactNode;
}) {
  const allDone = completed !== undefined && total !== undefined && completed === total;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        {/* Step circle */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
            allDone
              ? 'bg-emerald-500 text-white'
              : 'bg-orange-100 text-orange-600'
          }`}
        >
          {allDone ? '✓' : step}
        </div>

        <div>
          <span className="text-sm font-semibold text-gray-800">{title}</span>
          {subtitle && (
            <span className="ml-2 text-xs text-gray-400">{subtitle}</span>
          )}
        </div>
      </div>

      {/* Progress dots */}
      {total !== undefined && completed !== undefined && (
        <div className="flex items-center gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i < completed ? 'bg-orange-400' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}