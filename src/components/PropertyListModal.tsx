import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { fetchProperties } from '../api/property/fetch'; // Fetch function for properties
import { Property } from '../api/property/types'; // Define types for properties
import CreateProperty from './CreateProperty'; // Add a component to create a property
import DeleteProperty from './DeleteProperty'; // Add a component to delete a property
import UpdateProperty from './UpdateProperty'; // Add a component to update a property

interface PropertyListProps {
  portfolioId: number;
  open: boolean;
  onClose: () => void;
}

const PropertyListModal: React.FC<PropertyListProps> = ({ portfolioId, open, onClose }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      const fetchedProperties = await fetchProperties(portfolioId);
      if (fetchedProperties) {
        setProperties(fetchedProperties);
      } else {
        setError('Failed to fetch properties');
      }
      setLoading(false);
    };

    if (open) {
      loadProperties();  // Load properties only when modal is opened
    }
  }, [portfolioId, open]);

  const reloadProperties = async () => {
    const fetchedProperties = await fetchProperties(portfolioId);
    if (fetchedProperties) {
      setProperties(fetchedProperties);
    } else {
      setError('Failed to fetch properties');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Properties in Portfolio</DialogTitle>
      <DialogContent>
        <CreateProperty portfolioId={portfolioId} onPropertyCreated={reloadProperties} />
        {loading ? (
          <Typography>Loading properties...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card className="shadow-lg transition-transform transform hover:scale-105">
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-blue-500">
                      {property.address}
                    </Typography>
                    <Typography variant="body2">Value: ${property.estimated_value}</Typography>
                    <Typography variant="body2">Square Footage: {property.square_footage} sq ft</Typography>
                    <div className="flex justify-between mt-4">
                      <UpdateProperty property={property} onPropertyUpdated={reloadProperties} />
                      <DeleteProperty propertyId={property.id} onPropertyDeleted={reloadProperties} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyListModal;
