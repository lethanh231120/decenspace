// USD Format
export const usdMoneyFormat = (stringValue) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stringValue)
}
