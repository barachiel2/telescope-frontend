export const deleteProperty = async (propertyId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/delete_property/${propertyId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error while deleting property:', error);
    return false;
  }
};
