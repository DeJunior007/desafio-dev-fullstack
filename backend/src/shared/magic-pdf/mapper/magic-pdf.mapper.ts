import { MagicPdfResponse } from '../interfaces/magic-pdf-response.interface';

export class MagicPdfMapper {
  static toDomain(raw: MagicPdfResponse) {
    return {
      codigoDaUnidadeConsumidora: raw.unit_key,
      modeloFasico: raw.phaseModel,
      enquadramento: raw.chargingModel,
      historicoDeConsumoEmKWH: raw.invoice.slice(0, 12).map(item => ({
        consumoForaPontaEmKWH: item.consumo_fp,
        mesDoConsumo: new Date(item.consumo_date)
      }))
    };
  }
}