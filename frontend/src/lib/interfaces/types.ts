export interface Consumo {
  id: string;
  mesDoConsumo: string;
  consumoForaPontaEmKWH: number;
}

export interface Unidade {
  id: string;
  codigoDaUnidadeConsumidora: string;
  enquadramento: string;
  modeloFasico: string;
  historicoDeConsumoEmKWH: Consumo[];
}

export interface SimulationHistory {
  id: string;
  createdAt: string;
}

export interface LeadDetails {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: Unidade[];
  history: SimulationHistory[];
}


export interface UnidadeResumo {
  id: string;
  codigoDaUnidadeConsumidora: string;
  enquadramento: string;
}

export interface SimulationListItem {
  id: string;
  nomeCompleto: string;
  email: string;
  createdAt: string;
  unidades: UnidadeResumo[];
}

export interface SimulationListResponse {
  data: SimulationListItem[];
  meta: {
    lastPage: number;
  };
}
