import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { fetchProperties } from '../../api/property/fetch';
import { Property } from '../../api/property/types';
import CreateProperty from './CreateProperty';
import DeleteProperty from './DeleteProperty';
import UpdateProperty from './UpdateProperty';
import CustomButton from '../CustomButton';

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
      loadProperties();
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
      <DialogTitle style={{ color: '#29a745' }}>Properties in Portfolio</DialogTitle>
      <DialogContent style={{ backgroundColor: '#2d2d2d' }}>
        <CreateProperty portfolioId={portfolioId} onPropertyCreated={reloadProperties} />
        {loading ? (
          <Typography style={{ color: '#fff' }}>Loading properties...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3} style={{ marginTop: '1rem' }}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card
                  style={{
                    backgroundColor: '#1c1c1c',
                    borderTop: '4px solid #29a745',
                    transition: 'transform 0.3s',
                  }}
                  className="hover:scale-105 shadow-lg"
                >
                  <CardContent className="p-4">
                    <Typography variant="h6" style={{ color: '#29a745', fontWeight: 'bold' }}>
                      {property.address}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#fff', marginTop: '0.5rem' }}>
                      Value: ${property.estimated_value}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#fff', marginTop: '0.5rem' }}>
                      Square Footage: {property.square_footage} sq ft
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
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
        <CustomButton onClick={onClose} label="Close" colorType="secondary" />
      </DialogActions>
    </Dialog>
  );
};

export default PropertyListModal;
