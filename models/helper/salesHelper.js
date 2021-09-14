const updateFromPreviousValues = (newValues, foundEl) => {
  const foundValues = foundEl.itensSold;

  const updatedValues = newValues.map(({ productId, quantity }) => {
    const found = foundValues.find(({ productId: id }) => productId === id);
    return { productId, quantity: quantity - found.quantity };
  });
  return updatedValues;
};

const updateValuesFromDelete = (sales) => {
  const foundValues = sales.itensSold;
  return foundValues.map(({ productId, quantity }) => (
    {
      productId,
      quantity: quantity * -1,
    }
  ));
};

module.exports = {
  updateFromPreviousValues,
  updateValuesFromDelete,
};