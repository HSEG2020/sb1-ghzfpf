export const formatUF = (uf: number): string => {
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(uf);
};

export const formatCLP = (clp: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(clp);
};

export const convertUFtoCLP = (uf: number, valorUF: number): number => {
  return uf * valorUF;
};