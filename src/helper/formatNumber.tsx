export const formatRupiah = (value: any) => {
  return `Rp. ${new Intl.NumberFormat('id').format(value)}`;
};
