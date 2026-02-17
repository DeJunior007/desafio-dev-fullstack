export interface MagicPdfResponse {
  unit_key: string;
  phaseModel: 'monofasico' | 'bifasico' | 'trifasico';
  chargingModel: 'AX' | 'B1' | 'B2' | 'B3';
  valor: number;
  barcode: string;
  // Ajustado de 'data' para 'invoice' conforme seu JSON
  invoice: Array<{
    consumo_fp: number;
    consumo_date: string; 
    consumo_p: number;
  }>;
  energy_company_id: string;
}