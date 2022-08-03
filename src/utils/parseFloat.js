// USD Format
export const usdMoneyFormat = (stringValue) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stringValue)
}

export const addressFormat = (stringValue) =>{
  const firstPart = stringValue.slice(0, 5)
  const finalPart = stringValue.slice(-3)
  const addressAbbreviation = firstPart + '...' + finalPart
  return addressAbbreviation
}
